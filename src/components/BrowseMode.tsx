import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown, Loader2, Search, X, Bookmark, CheckCircle2, GitCommit } from 'lucide-react';
import { iatfData, flatIatfData, Clause } from '../data/iatfData';
import { historyData } from '../data/revisionHistory';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { useProgress } from '../ProgressContext';

// Initialize Gemini API outside component to reuse
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !highlight.trim()) return <>{text}</>;
  
  const escapeRegex = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapeRegex(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-red-200/60 text-red-900 rounded-[2px]">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const ClauseItem = ({ 
  clause, 
  level = 0, 
  defaultOpen = false, 
  isSearchResult = false,
  bookmarks = [],
  onToggleBookmark,
  onSearch,
  highlightQuery
}: { 
  clause: Clause; 
  level?: number; 
  key?: React.Key; 
  defaultOpen?: boolean; 
  isSearchResult?: boolean;
  bookmarks?: string[];
  onToggleBookmark?: (id: string) => void;
  onSearch?: (query: string) => void;
  highlightQuery?: string;
}) => {
  const { viewedClauses, markViewed } = useProgress();
  const isViewed = viewedClauses.includes(clause.id);
  const [isOpen, setIsOpen] = useState(level === 0 || defaultOpen);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [relatedClauses, setRelatedClauses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasChildren = clause.subClauses && clause.subClauses.length > 0;
  const isBookmarked = bookmarks.includes(clause.id);
  
  const relatedHistoryEvents = useMemo(() => {
    return historyData.filter(event => event.relatedClauses?.includes(clause.id));
  }, [clause.id]);

  // Skip rendering "(仅章节号)" as it's just a placeholder, render its children directly
  if (!isSearchResult && clause.title === "（仅章节号）" && hasChildren) {
    return (
      <>
        {clause.subClauses!.map((subClause) => (
          <ClauseItem key={subClause.id} clause={subClause} level={level} defaultOpen={defaultOpen} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} onSearch={onSearch} highlightQuery={highlightQuery} />
        ))}
      </>
    );
  }

  const handleClick = async () => {
    if (hasChildren && !isSearchResult) {
      setIsOpen(!isOpen);
    } else {
      const nextState = !isExplaining;
      setIsExplaining(nextState);
      
      if (nextState && !explanation && !isLoading) {
        setIsLoading(true);
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Please provide a concise explanation of IATF 16949 clause ${clause.id} "${clause.title}". 
            Focus heavily on practical application and what it means in the automotive manufacturing context. 
            Use Chinese language for the response. Keep it under 2 to 3 short paragraphs.
            
            Return ONLY a valid JSON object without any markdown formatting. The JSON must have the following structure:
            {
              "explanation": "Your explanation here in markdown formatting...",
              "relatedClauses": ["8.5.1.1", "9.2.2"] // array of highly relevant cross-referenced IATF 16949 clause IDs (only the numbers). ONLY include IDs that actually exist in the standard.
            }`,
          });
          
          let resultText = response.text || '{}';
          if (resultText.startsWith('```json')) {
            resultText = resultText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (resultText.startsWith('```')) {
            resultText = resultText.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }

          const parsed = JSON.parse(resultText);
          
          setExplanation(parsed.explanation || '无法生成解释。');
          setRelatedClauses(parsed.relatedClauses || []);
          markViewed(clause.id);
        } catch (err) {
          console.error(err);
          setExplanation('获取解释失败，请稍后重试。');
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="font-sans border-b border-black/5 last:border-0 hover:bg-stone-100/50 transition-colors relative group">
      <div 
        className={`flex items-center py-4 px-4 cursor-pointer`}
        style={{ paddingLeft: `${isSearchResult ? '1rem' : Math.max(1, level * 2 + 1) + 'rem'}` }}
        onClick={handleClick}
      >
        <span className="w-5 h-5 flex items-center justify-center mr-2 text-stone-400 shrink-0">
          {(hasChildren && !isSearchResult) ? (
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
          )}
        </span>
        <span className="text-stone-500 font-mono text-xs mr-4 shrink-0 whitespace-nowrap">
          <HighlightText text={clause.id} highlight={highlightQuery} />
        </span>
        <span className={`font-serif text-lg flex items-center flex-wrap gap-3 ${!isSearchResult && level === 0 ? 'text-2xl font-light' : 'text-stone-800'} flex-1`}>
          <HighlightText text={clause.title} highlight={highlightQuery} />
          {relatedHistoryEvents.length > 0 && (
             <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest leading-none border border-red-200">
               <GitCommit className="w-3 h-3" /> SI 更新
             </span>
          )}
          {isViewed && (!hasChildren || isSearchResult) && (
            <CheckCircle2 className="w-4 h-4 text-green-600/70" />
          )}
        </span>
        
        {(!hasChildren || isSearchResult) && onToggleBookmark && (
          <button 
            className={`p-2 opacity-0 group-hover:opacity-100 transition-opacity ${isBookmarked ? 'opacity-100 text-red-600' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(clause.id);
            }}
            title={isBookmarked ? "移除书签" : "将此条款加入书签"}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      <AnimatePresence initial={false}>
        {(hasChildren && !isSearchResult) && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {clause.subClauses!.map((subClause) => (
              <ClauseItem key={subClause.id} clause={subClause} level={level + 1} defaultOpen={defaultOpen} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} onSearch={onSearch} highlightQuery={highlightQuery} />
            ))}
          </motion.div>
        )}
        
        {(!hasChildren || isSearchResult) && isExplaining && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
              className="bg-stone-50 p-6 border border-black/5 mt-2 mb-6 mx-4 relative shadow-inner"
              style={{ marginLeft: `${isSearchResult ? '1rem' : Math.max(1, level * 2 + 1) + 'rem'}` }}
            >
              <span className="absolute -top-3 left-4 bg-red-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                实际应用
              </span>
              
              {relatedHistoryEvents.length > 0 && (
                <div className="mb-6 pb-4 border-b border-black/5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-700 flex items-center mb-2">
                    <GitCommit className="w-3 h-3 mr-1" /> 修订说明
                  </span>
                  {relatedHistoryEvents.map(event => (
                    <div key={event.id} className="text-sm font-serif text-stone-600 mb-2 last:mb-0">
                      <strong>{event.title} ({event.date}):</strong> {event.description}
                    </div>
                  ))}
                </div>
              )}

              {isLoading ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center text-stone-500 font-serif italic text-sm py-2"
                >
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-red-600" /> 正在生成实际应用解读...
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3 }}
                  className="text-sm font-serif leading-relaxed text-stone-700 space-y-4 pt-1"
                >
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-3" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-stone-900" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 mt-4 text-stone-900" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-4 text-stone-900" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2 mt-4 text-stone-900" {...props} />,
                      a: ({node, href, children, ...props}) => {
                        if (href && href.startsWith('#')) {
                          const targetId = href.substring(1);
                          return (
                            <button 
                              className="text-red-700 hover:text-red-900 border-b border-red-200 hover:border-red-500 font-mono text-xs transition-colors px-1"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (onSearch) {
                                  onSearch(targetId);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
                            >
                              {children}
                            </button>
                          );
                        }
                        return <a className="text-red-700 hover:underline" href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
                      },
                    }}
                  >
                    {explanation || ''}
                  </ReactMarkdown>

                  {/* Render related clauses explicitly */}
                  {relatedClauses.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-black/5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-3">相关/交叉引用条款</span>
                      <div className="flex flex-wrap gap-2">
                        {relatedClauses.map(id => {
                          const relatedClause = flatIatfData.find(c => c.id === id);
                          if (!relatedClause) return null;
                          return (
                            <button
                              key={id}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Close this explanation? Not strictly necessary.
                                if (onSearch) {
                                  onSearch(id);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
                              className="bg-white border border-stone-200 hover:border-red-300 hover:text-red-700 px-3 py-1.5 text-xs text-stone-600 rounded-[2px] transition-colors text-left flex items-start gap-2 shadow-sm"
                            >
                              <span className="font-mono font-bold mt-0.5">{id}</span> 
                              <span className="font-serif">{relatedClause.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BrowseMode() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks'>('all');

  // Load bookmarks from local storage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('iatf-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
  }, []);

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('iatf-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const filteredClauses = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return flatIatfData.filter((clause) => 
      clause.id.toLowerCase().includes(query) || clause.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const bookmarkedClauses = useMemo(() => {
    return flatIatfData.filter(clause => bookmarks.includes(clause.id));
  }, [bookmarks]);

  return (
    <div className="bg-white p-6 md:p-12 shadow-sm border border-black/5 relative w-full flex flex-col min-h-[600px]">
      <div className="absolute -left-4 top-12 bg-red-700 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest hidden md:block">
        目录
      </div>
      <header className="mb-0">
        <span className="text-xs font-mono text-stone-400">索引</span>
        <h3 className="text-4xl font-serif mt-2 leading-tight">标准条款</h3>
        <p className="text-sm font-serif italic text-stone-500 mt-2">浏览并点击特定的条款以查看其实际应用解读。</p>
        
        <div className="mt-8 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border border-black/10 focus:border-black/30 focus:ring-0 text-sm font-serif bg-stone-50 placeholder-stone-400 outline-none transition-colors"
            placeholder="按编号或标题搜索 (例如 '8.5' 或 '领导作用')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4 text-stone-400 hover:text-stone-600 cursor-pointer" />
            </button>
          )}
        </div>

        <div className="flex border-b border-black/5 mt-8">
          <button 
            className={`pb-3 px-4 font-serif text-sm transition-colors relative ${activeTab === 'all' ? 'text-stone-900 pointer-events-none' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('all')}
          >
            所有条款
            {activeTab === 'all' && (
              <motion.div layoutId="browseTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-700" />
            )}
          </button>
          <button 
            className={`pb-3 px-4 font-serif text-sm transition-colors relative ${activeTab === 'bookmarks' ? 'text-stone-900 pointer-events-none' : 'text-stone-400 hover:text-stone-600'}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            书签 ({bookmarks.length})
            {activeTab === 'bookmarks' && (
              <motion.div layoutId="browseTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-700" />
            )}
          </button>
        </div>
      </header>
      
      <div className="divide-y divide-black/5">
        {activeTab === 'bookmarks' ? (
          bookmarkedClauses.length > 0 ? (
            bookmarkedClauses.map((clause) => (
              <ClauseItem key={clause.id} clause={clause} isSearchResult={true} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onSearch={setSearchQuery} />
            ))
          ) : (
            <div className="py-12 text-center font-serif text-stone-500 italic">
              暂无书签。点击条款右侧的书签图标将其保存在这里。
            </div>
          )
        ) : searchQuery.trim() ? (
          filteredClauses.length > 0 ? (
            filteredClauses.map((clause) => (
              <ClauseItem key={clause.id} clause={clause} isSearchResult={true} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onSearch={setSearchQuery} highlightQuery={searchQuery} />
            ))
          ) : (
            <div className="py-12 text-center font-serif text-stone-500 italic">
              找不到包含 "{searchQuery}" 的条款
            </div>
          )
        ) : (
          iatfData.map((clause) => (
            <ClauseItem key={clause.id} clause={clause} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onSearch={setSearchQuery} />
          ))
        )}
      </div>
    </div>
  );
}
