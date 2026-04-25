import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { flatIatfData } from './data/iatfData';
import { useAuth } from './lib/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './lib/firebase';

interface ProgressContextType {
  viewedClauses: string[];
  markViewed: (id: string) => void;
  quizStats: { attempts: number; correct: number; total: number };
  addQuizResult: (correct: number, total: number) => void;
  flashcardsReviewed: number;
  addFlashcardsReviewed: (count: number) => void;
  quickLearnStats: { attempts: number; correct: number; total: number };
  addQuickLearnResult: (correct: number, total: number) => void;
  masteryPercentage: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const latestMasteryRef = useRef(0);

  const [viewedClauses, setViewedClauses] = useState<string[]>(() => {
    const saved = localStorage.getItem('iatf-viewed');
    return saved ? JSON.parse(saved) : [];
  });
  const [quizStats, setQuizStats] = useState(() => {
    const saved = localStorage.getItem('iatf-quiz');
    return saved ? JSON.parse(saved) : { attempts: 0, correct: 0, total: 0 };
  });
  const [quickLearnStats, setQuickLearnStats] = useState(() => {
    const saved = localStorage.getItem('iatf-quick-learn');
    return saved ? JSON.parse(saved) : { attempts: 0, correct: 0, total: 0 };
  });
  const [flashcardsReviewed, setFlashcardsReviewed] = useState<number>(() => {
    const saved = localStorage.getItem('iatf-flashcards');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('iatf-viewed', JSON.stringify(viewedClauses));
  }, [viewedClauses]);

  useEffect(() => {
    localStorage.setItem('iatf-quiz', JSON.stringify(quizStats));
  }, [quizStats]);

  useEffect(() => {
    localStorage.setItem('iatf-quick-learn', JSON.stringify(quickLearnStats));
  }, [quickLearnStats]);

  useEffect(() => {
    localStorage.setItem('iatf-flashcards', JSON.stringify(flashcardsReviewed));
  }, [flashcardsReviewed]);

  const markViewed = (id: string) => {
    setViewedClauses(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const addQuizResult = (correct: number, total: number) => {
    setQuizStats(prev => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + correct,
      total: prev.total + total
    }));
  };

  const addQuickLearnResult = (correct: number, total: number) => {
    setQuickLearnStats(prev => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + correct,
      total: prev.total + total
    }));
  };

  const addFlashcardsReviewed = (count: number) => {
    setFlashcardsReviewed(prev => prev + count);
  };

  // Calculate mastery based on reading, flashcards, quizzes, and quick learn.
  // Weight: reading 40%, quizzes 25%, quick learn 25%, flashcards 10%.
  const totalClauses = flatIatfData.length;
  let mastery = 0;
  if (totalClauses > 0) {
    mastery += (viewedClauses.length / totalClauses) * 40;
    mastery += Math.min(flashcardsReviewed / (totalClauses * 2), 1) * 10;
    if (quizStats.total > 0) {
      mastery += (quizStats.correct / quizStats.total) * 25;
    }
    if (quickLearnStats.total > 0) {
      mastery += (quickLearnStats.correct / quickLearnStats.total) * 25;
    }
  }

  const masteryPercentage = Math.round(mastery);

  useEffect(() => {
    if (user && masteryPercentage !== latestMasteryRef.current) {
      latestMasteryRef.current = masteryPercentage;
      const updateFirebase = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            masteryPercentage,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
        }
      };
      
      const timeoutId = setTimeout(updateFirebase, 2000); // Debounce to prevent spam
      return () => clearTimeout(timeoutId);
    }
  }, [masteryPercentage, user]);

  return (
    <ProgressContext.Provider value={{
      viewedClauses, markViewed,
      quizStats, addQuizResult,
      quickLearnStats, addQuickLearnResult,
      flashcardsReviewed, addFlashcardsReviewed,
      masteryPercentage
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
