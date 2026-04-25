import React, { useState, useMemo } from 'react';
import { glossaryData } from '../data/glossaryData';
import { Search, BookA } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlossaryMode() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'core_tool' | 'process' | 'general'>('all');

  const filteredTerms = useMemo(() => {
    return glossaryData.filter((term) => {
      const matchesSearch = 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (term.acronym && term.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filter === 'all' || term.category === filter;
      
      return matchesSearch && matchesFilter;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, filter]);

  return (
    <div className="bg-white p-6 md:p-12 shadow-sm border border-black/5 relative w-full flex flex-col min-h-[600px] max-w-4xl mx-auto">
      <div className="absolute -left-4 top-12 bg-red-700 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest hidden md:block">
        词汇表
      </div>
      
      <header className="mb-12">
        <span className="text-xs font-mono text-stone-400">专业术语</span>
        <h3 className="text-4xl font-serif mt-2 leading-tight">核心术语</h3>
        <p className="text-sm font-serif italic text-stone-500 mt-2">
          理解 IATF 16949 至关重要的首字母缩写词和特定短语的定义。
        </p>
      </header>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="搜索术语、缩写或定义..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-black/10 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 font-serif transition-shadow"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'core_tool', 'process', 'general'].map((f) => {
            const labels: Record<string, string> = {
              'all': '全部',
              'core_tool': '核心工具',
              'process': '过程',
              'general': '通用'
            };
            return (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-3 py-1 text-xs uppercase tracking-widest font-bold border transition-colors ${
                 filter === f 
                   ? 'bg-black text-white border-black' 
                   : 'bg-white text-stone-500 border-stone-200 hover:border-black/30 hover:text-stone-800'
               }`}
             >
               {labels[f]}
             </button>
            )
          })}
        </div>
      </div>

      {/* Glossary List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
           {filteredTerms.map((item) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.2 }}
               layout
               className="p-6 border border-black/5 bg-stone-50 group hover:border-black/20 transition-colors"
             >
               <div className="flex items-start justify-between mb-3">
                 <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors">
                   {item.term}
                 </h4>
                 {item.acronym && (
                   <span className="ml-4 px-2 py-0.5 bg-white border border-stone-200 text-stone-600 text-xs font-mono font-bold shrink-0">
                     {item.acronym}
                   </span>
                 )}
               </div>
               
               <p className="text-sm font-serif text-stone-600 leading-relaxed">
                 {item.definition}
               </p>
               
             </motion.div>
           ))}
        </AnimatePresence>
        
        {filteredTerms.length === 0 && (
          <div className="col-span-1 md:col-span-2 py-16 text-center font-serif text-stone-500 italic opacity-60">
            未找到符合要求的术语。
          </div>
        )}
      </div>
    </div>
  );
}
