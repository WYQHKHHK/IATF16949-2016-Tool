import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { flatIatfData, Clause } from '../data/iatfData';
import { motion, AnimatePresence } from 'motion/react';
import { useProgress } from '../ProgressContext';

export default function FlashcardMode() {
  const [cards, setCards] = useState<Clause[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { addFlashcardsReviewed } = useProgress();

  useEffect(() => {
    // Shuffle and pick 15 random cards for a session
    const shuffled = [...flatIatfData].sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 15));
  }, []);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    } else {
      addFlashcardsReviewed(cards.length);
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...flatIatfData].sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 15));
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
  };

  if (cards.length === 0) return <div className="text-center font-serif text-lg py-20 opacity-50">加载中...</div>;

  if (completed) {
    return (
      <div className="bg-white p-12 shadow-sm border border-black/5 flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-5xl font-serif italic font-light tracking-tight mb-4">学习完成</h2>
        <p className="text-stone-600 font-serif text-lg mb-10 max-w-md">干得好！反复复习是掌握标准的关键。</p>
        <button
          onClick={handleRestart}
          className="px-8 py-3 border border-black text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          开始新一轮
        </button>
      </div>
    );
  }

  const card = cards[currentIndex];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center min-h-[600px]">
      <div className="w-full flex justify-between items-center mb-8 px-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">第 {currentIndex + 1} 张 / 共 {cards.length} 张</span>
        <div className="flex gap-1 h-1 flex-1 mx-6 bg-stone-200">
          <div 
            className="h-full bg-red-700 transition-all duration-300"
            style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <div 
        className="relative w-full h-96 [perspective:1000px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-white flex flex-col items-center justify-center p-12 text-center border border-black/5 shadow-sm" style={{ backfaceVisibility: 'hidden' }}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-6">条款编号</span>
            <span className="text-7xl font-light font-sans tracking-tighter text-black">{card.id}</span>
            <p className="mt-12 text-stone-400 text-xs italic font-serif flex items-center"><RefreshCcw className="w-3 h-3 mr-2" /> 点击翻面</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-stone-50 flex flex-col items-center justify-center p-8 md:p-12 text-center border border-black/5 shadow-sm" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="absolute top-8 md:top-12 bg-red-700 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              标题
            </div>
            <p className="text-3xl md:text-4xl font-serif text-black leading-snug mt-8">{card.title}</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center"
          >
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="flex-1 w-full sm:max-w-[240px] px-8 py-4 border border-black text-[10px] uppercase font-bold tracking-widest hover:bg-stone-100 transition-colors text-center"
            >
              需要复习
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="flex-1 w-full sm:max-w-[240px] px-8 py-4 bg-black text-white text-[10px] uppercase font-bold tracking-widest hover:bg-stone-800 transition-colors text-center"
            >
              已经掌握
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
