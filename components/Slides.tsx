import React, { useState, useEffect } from 'react';
import { SlideData } from '../constants';
import { 
  Users, Calendar, GraduationCap, FileText, Flag, Heart, 
  BrainCircuit, Zap, ClipboardCheck, PencilRuler, Search, FileSignature, 
  Rocket, BarChart3, Compass, Target, Layers, Sparkles, DollarSign, Briefcase,
  RotateCcw, Clock, Lightbulb, Quote, AlertCircle, Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface SlideProps {
  data: SlideData;
  onPrint?: () => void;
  onJumpToSlide?: (index: number) => void;
}

const IconMap: Record<string, any> = {
  Compass, Target, BrainCircuit, Layers, Zap, ClipboardCheck, Heart, Sparkles,
  Users, DollarSign, Briefcase, Calendar, GraduationCap, FileText, Flag,
  PencilRuler, Search, FileSignature, Rocket, BarChart3, Clock, Lightbulb
};

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 120, damping: 20 } }
};

// --- Reusable Premium Components ---
const OrganicShape: React.FC<{ children: React.ReactNode, bg: string, color: string, className?: string }> = ({ children, bg, color, className = "" }) => (
    <div className={`relative flex items-center justify-center ${bg} ${color} p-5 shadow-sm border border-white/40 transition-all duration-700 rounded-[2rem] md:rounded-[2.5rem] ${className} group-hover:scale-110 group-hover:rotate-3`}>
        <div className={`absolute inset-0 ${bg} blur-2xl opacity-10 rounded-full -z-10 animate-pulse`} />
        <div className="absolute inset-0 glass-border rounded-[inherit] pointer-events-none" />
        {children}
    </div>
);

const GlowIcon: React.FC<{ icon: any, color: string, bg: string, size?: number }> = ({ icon: Icon, color, bg, size = 24 }) => (
    <OrganicShape bg={bg} color={color}>
        <div className="relative">
            <Icon size={size} strokeWidth={2} className="relative z-10" />
            <Icon size={size} strokeWidth={2} className="absolute inset-0 blur-sm opacity-50" />
        </div>
    </OrganicShape>
);

const GlassCard: React.FC<{ children?: React.ReactNode, className?: string, hover?: boolean, theme?: 'light' | 'dark' | 'brand' }> = ({ children, className = "", hover = false, theme = 'light' }) => {
    const themeClasses = {
        light: 'bg-white/90 border-white/80 shadow-xl glass-border',
        dark: 'bg-slate-900/98 border-slate-700/50 shadow-2xl text-white glass-border',
        brand: 'bg-indigo-600/15 border-indigo-500/20 shadow-lg glass-border'
    };

    return (
        <div className={`
            backdrop-blur-2xl 
            rounded-[2.5rem] md:rounded-[3rem]
            relative overflow-hidden
            ${themeClasses[theme]}
            ${hover ? 'transition-all duration-700 hover:bg-white/95 hover:shadow-2xl hover:-translate-y-2' : ''}
            ${className}
        `}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            {children}
        </div>
    );
};

// 1. Cover Slide
export const CoverSlide: React.FC<SlideProps> = ({ data }) => {
  const isAssessment = data.id === 'assessment-cover';
  const isBreak = data.id === 'break-cover';

  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full text-center relative z-10 overflow-hidden"
        initial="hidden" animate="show" variants={containerVariants}
    >
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 -z-20 bg-gradient-to-br ${isAssessment ? 'from-indigo-900 via-slate-900 to-blue-900' : isBreak ? 'from-amber-50 via-white to-orange-50' : 'from-indigo-50 via-white to-cyan-50'} animate-gradient-xy`} />
      
      <motion.div variants={itemVariants} className="mb-4 relative w-full max-w-4xl px-6">
        {/* Universe Effect Background */}
        <div className="absolute inset-0 -z-10">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isAssessment ? 'bg-blue-500/20' : isBreak ? 'bg-amber-500/10' : 'bg-indigo-500/10'} rounded-full blur-[120px] animate-pulse`} />
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        rotate: { repeat: Infinity, duration: 20 + i * 10, ease: "linear" },
                        scale: { repeat: Infinity, duration: 5 + i, ease: "easeInOut" },
                        opacity: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div 
                        className={`w-1.5 h-1.5 ${isAssessment ? 'bg-blue-400/60' : isBreak ? 'bg-amber-400/40' : 'bg-indigo-400/40'} rounded-full absolute`}
                        style={{ 
                            top: `${10 + i * 15}%`, 
                            left: `${5 + i * 15}%`,
                            boxShadow: `0 0 15px ${isAssessment ? '#60a5fa' : isBreak ? '#d97706' : '#4f46e5'}`
                        }}
                    />
                </motion.div>
            ))}
        </div>

        <GlassCard theme={isAssessment ? 'dark' : data.theme} className={`p-8 md:p-20 flex flex-col items-center border-white/20 shadow-2xl relative overflow-visible ${isAssessment ? 'bg-slate-900/40 border-blue-500/30' : 'bg-white/30'} backdrop-blur-2xl rounded-[3rem]`}>
            {isAssessment && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-50 animate-pulse" />
            )}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-40 h-1.5 bg-gradient-to-r from-transparent via-${isAssessment ? 'blue' : isBreak ? 'amber' : 'indigo'}-500 to-transparent rounded-b-full`} />
            
            <motion.div 
                layoutId="brand-tag"
                variants={itemVariants} 
                className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full border ${isAssessment ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-slate-100/50 bg-white/80 text-slate-400'} shadow-md text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase mb-6 md:mb-10`}
            >
                <div className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full ${isAssessment ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : isBreak ? 'bg-amber-500' : 'bg-indigo-500'} animate-pulse`} />
                {isAssessment ? 'Assessment Center' : isBreak ? 'Descanso' : 'fyo'}
            </motion.div>
            
            <motion.h1 
                layoutId="slide-title"
                variants={{
                  hidden: { opacity: 0, y: 50, filter: 'blur(20px)', scale: 0.9 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)', 
                    scale: 1,
                    transition: { 
                      type: 'spring', 
                      stiffness: 100, 
                      damping: 15,
                      delay: 0.3
                    } 
                  }
                }}
                className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter ${isAssessment ? 'text-white' : 'text-slate-900'} mb-8 md:mb-12 leading-[0.8] font-display uppercase drop-shadow-2xl`}
            >
                {(data.title || '').split(' ').map((word, i) => {
                    const isSpecial = word.toUpperCase().includes('JP') || word.toUpperCase().includes('FYO') || word.toUpperCase().includes('ASSESSMENT');
                    const hasEmoji = /\p{Emoji}/u.test(word);
                    const colorClass = isAssessment ? 'text-blue-400' : isBreak ? 'text-amber-600' : 'text-indigo-600';
                    return (
                        <span key={i} className={i % 2 === 1 && !isSpecial && !hasEmoji ? `italic ${colorClass} font-serif lowercase` : ''}>
                            {word}{' '}
                        </span>
                    );
                })}
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className={`text-base md:text-xl ${isAssessment ? 'text-blue-100/60' : 'text-slate-500'} font-bold tracking-[0.3em] mb-12 max-w-3xl leading-relaxed uppercase opacity-90`}
            >
              {data.subtitle}
            </motion.p>

            {data.content?.tags && (
              <motion.div 
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="flex flex-wrap justify-center gap-4"
              >
                  {data.content.tags.map((tag: string, idx: number) => {
                    const colorHex = isAssessment ? '#3b82f6' : isBreak ? '#d97706' : '#4f46e5';
                    const colorShadow = isAssessment ? 'rgb(59 130 246 / 0.2)' : isBreak ? 'rgb(217 119 6 / 0.1)' : 'rgb(79 70 229 / 0.1)';
                    return (
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, y: 20 },
                          show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
                        }} 
                        key={idx} 
                        whileHover={{ y: -10, scale: 1.1, borderColor: colorHex, color: isAssessment ? '#fff' : colorHex, backgroundColor: isAssessment ? colorHex : '#fff', boxShadow: `0 25px 30px -5px ${colorShadow}` }}
                        className={`px-6 py-3 ${isAssessment ? 'bg-white/5 text-white border-white/10' : 'bg-white text-slate-900 border-slate-100'} text-[10px] font-black tracking-[0.2em] uppercase rounded-2xl border shadow-xl transition-all cursor-default`}
                      >
                          {tag}
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 2. Image Slide
export const ImageSlide: React.FC<SlideProps> = ({ data }) => {
  const [error, setError] = React.useState(false);
  
  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full relative z-10"
        initial="hidden" animate="show" variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full h-full flex flex-col items-center justify-center p-4">
        <GlassCard theme={data.theme} className="w-full max-w-6xl aspect-video overflow-hidden border-white/40 shadow-2xl relative flex items-center justify-center bg-slate-50 group">
          {!error ? (
            <img 
              src={data.content.imageUrl} 
              alt={data.content.alt || data.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-6 text-slate-300">
              <OrganicShape bg="bg-slate-100" color="text-slate-200" className="w-24 h-24">
                <Layers size={48} />
              </OrganicShape>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Ecosistema fyo</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {data.title && (
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <motion.h2 
                layoutId="slide-title"
                className="text-white text-xl md:text-2xl font-black tracking-tighter font-display"
              >
                {data.title}
              </motion.h2>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 3. Agenda Slide (Table)
export const TableCapitalSlide: React.FC<SlideProps> = ({ data }) => {
    const { headers, rows } = data.content;
    const colCount = headers.length;
    
    return (
        <motion.div className="w-full flex flex-col items-center justify-center py-4" initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={itemVariants} className="w-full max-w-4xl">
                <GlassCard className="overflow-hidden shadow-2xl relative bg-white/60 backdrop-blur-2xl rounded-[2rem]">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 animate-gradient-x" />
                    <div 
                        className="grid border-b border-slate-100/50 text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] font-display bg-slate-50/80"
                        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                    >
                        {headers.map((header: string, i: number) => (
                            <div key={i} className="p-2 md:p-5 text-center text-slate-400">{header}</div>
                        ))}
                    </div>
                    {rows.map((row: string[], idx: number) => (
                        <div 
                            key={idx} 
                            className="grid border-b border-slate-50/50 hover:bg-white/80 transition-all duration-500 text-[9px] md:text-xs group"
                            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                        >
                            <div className="p-2 md:p-5 font-mono flex items-center justify-center font-black text-indigo-600 bg-indigo-50/40 group-hover:bg-indigo-100/60 transition-colors border-r border-slate-50/50">{row[0]}</div>
                            {row.slice(1).map((cell, i) => (
                                <div key={i} className="p-2 md:p-5 flex items-center justify-center border-l border-slate-50/50 text-center font-bold tracking-tight text-slate-600 group-hover:text-slate-900">
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </GlassCard>
            </motion.div>
        </motion.div>
    );
};

// 4. Info Slide (Nuestra Empresa)
export const InfoSlide: React.FC<SlideProps> = ({ data }) => {
  const { mainText, description, highlight } = data.content;
  
  // Split mainText into blocks if it contains newlines
  const textBlocks = mainText.split('\n\n');
  const icons = [Compass, Zap, Rocket];

  return (
    <motion.div className="flex flex-col justify-center items-center h-full max-w-6xl mx-auto px-6 py-8" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
        {/* Left Column: 3 Blocks */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {textBlocks.map((block: string, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div key={i} variants={itemVariants} className="h-full">
                <GlassCard className="h-full p-8 bg-white/90 border-white shadow-xl flex flex-col hover:-translate-y-2 transition-all duration-500">
                  <div className="mb-6">
                    <OrganicShape bg="bg-indigo-50" color="text-indigo-600" className="w-12 h-12">
                      <Icon size={24} />
                    </OrganicShape>
                  </div>
                  <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed tracking-tight">
                    {block.replace(/"/g, '')}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
          
          {/* Description Footer */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <GlassCard className="p-6 bg-indigo-600 text-white shadow-xl flex items-center gap-6">
              <div className="h-1 w-16 bg-white/30 rounded-full" />
              <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                {description}
              </p>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* Right Column: Highlight */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="h-full relative p-10 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                
                <Sparkles className="text-indigo-400 mb-10 animate-pulse relative z-10" size={48} />
                
                <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-black text-white leading-[1] tracking-tighter font-display uppercase mb-12">
                        {highlight}
                    </p>
                    
                    <div className="flex items-center gap-5 pt-10 border-t border-white/10">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg">fyo</div>
                        <div>
                            <span className="block text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-1">Compromiso</span>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Soluciones a medida</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 5. Culture Slide
export const TutorContentSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-8 max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-7">
          <motion.div variants={itemVariants}>
            <GlassCard className="p-1 bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 rounded-[2.5rem] shadow-2xl overflow-visible">
                <div className="bg-white rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <OrganicShape bg="bg-indigo-600" color="text-white" className="w-12 h-12">
                                <Compass size={24} />
                            </OrganicShape>
                            <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] font-display">Nuestra Cultura</h3>
                        </div>
                        <div className="text-base md:text-lg text-slate-700 font-bold leading-relaxed tracking-tight mb-8 italic border-l-4 border-indigo-100 pl-8 whitespace-pre-line">
                            {data.content.description}
                        </div>
                        
                        <div className="h-px w-full bg-slate-100 mb-8" />
                        
                        <div className="flex items-center gap-4 mb-4">
                            <OrganicShape bg="bg-emerald-500" color="text-white" className="w-8 h-8">
                                <Target size={16} />
                            </OrganicShape>
                            <h3 className="text-slate-900 font-black text-[9px] uppercase tracking-[0.4em] font-display">Visión de Futuro</h3>
                        </div>
                        <div className="relative">
                            <Quote size={40} className="absolute -top-4 -left-2 text-indigo-50 opacity-10" fill="currentColor" />
                            <p className="text-lg md:text-xl font-black text-slate-900 leading-[1.1] tracking-tighter font-display uppercase relative z-10">
                                {data.content.vision}
                            </p>
                        </div>
                    </div>
                </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <motion.div variants={itemVariants} className="mb-6 pl-6 border-l-4 border-indigo-600">
            <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-1">ADN Organizacional</h4>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase font-display leading-none">Valores fyo</h2>
          </motion.div>
          {data.content.valores.map((valor: any, i: number) => {
            const Icon = IconMap[valor.icon] || Sparkles;
            const bubbleBg = valor.color || 'bg-indigo-50';
            const bubbleText = valor.color ? 'text-white' : 'text-indigo-600';
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="p-6 flex items-center gap-8 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-xl hover:-translate-x-4 transition-all duration-700 group cursor-default border border-white/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <GlowIcon icon={Icon} color={bubbleText} bg={bubbleBg} size={28} />
                  </div>
                  <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase font-display relative z-10">
                    {valor.title}
                  </span>
                  <div className="absolute right-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <Icon size={80} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
;

// 6. Grid Slide (Companies)
export const GridSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 py-8 h-full items-stretch max-w-7xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      {data.content.items.map((item: any, idx: number) => {
        const Icon = IconMap[item.icon] || Users;
        const colors = [
          { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', glow: 'shadow-indigo-500/20' },
          { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'shadow-emerald-500/20' },
          { text: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200', glow: 'shadow-slate-500/20' }
        ];
        const style = colors[idx % colors.length];

        const titleParts = item.title.split(' ');
        const emoji = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';
        const cleanTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(' ') : item.title;

        return (
          <motion.div variants={itemVariants} key={idx} className="h-full">
            <GlassCard className={`p-10 flex flex-col h-full bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl group hover:-translate-y-4 transition-all duration-700 border border-white relative overflow-hidden`}>
              <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${style.bg}`} />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <GlowIcon icon={Icon} color={style.text} bg={style.bg} size={32} />
                <motion.span 
                    animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                    className="text-4xl drop-shadow-md"
                >
                    {emoji}
                </motion.span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 tracking-tighter font-display group-hover:text-indigo-600 transition-colors uppercase leading-[0.85]">
                {cleanTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed mb-10 flex-grow tracking-tight opacity-80">
                {item.desc}
              </p>
              
              <div className="pt-8 border-t border-slate-100 flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${style.text} opacity-30 group-hover:opacity-100 transition-opacity`}>{item.link}</span>
                </div>
                <motion.a 
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center gap-3 font-black text-[10px] tracking-[0.2em] uppercase shadow-lg border border-white transition-all group-hover:bg-indigo-600 group-hover:text-white`}
                >
                    Visitar Web
                    <Rocket size={16} />
                </motion.a>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// 9. Ecosystem Circles Slide
export const EcosystemCirclesSlide: React.FC<SlideProps> = ({ data }) => {
    const { items } = data.content;
    const [radius, setRadius] = useState(180);
    
    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;
            if (width > 1280) setRadius(220);
            else if (width > 768) setRadius(180);
            else setRadius(120);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <motion.div className="flex flex-col justify-center items-center h-full py-8 max-w-7xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
                <div className="lg:col-span-4 space-y-6">
                    <motion.div variants={itemVariants}>
                        <div className="relative p-8 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />
                            
                            <div className="relative z-10">
                                <Quote className="text-indigo-600/20 mb-4" size={32} fill="currentColor" />
                                <div className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed tracking-tight italic whitespace-pre-line">
                                    {data.subtitle}
                                </div>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-1.5 w-10 bg-indigo-600 rounded-full" />
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Propuesta de Valor</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-8 relative min-h-[450px] md:min-h-[550px] flex items-center justify-center overflow-visible">
                    {/* Background Decorative Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                            className="w-[85%] h-[85%] border border-indigo-200/40 rounded-full border-dashed" 
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                            className="w-[60%] h-[60%] border border-indigo-100/30 rounded-full border-dashed" 
                        />
                    </div>

                    {/* Central Hub */}
                    <motion.div 
                        variants={itemVariants}
                        className="relative z-20"
                    >
                        {/* Pulse Effect */}
                        <motion.div 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl" 
                        />
                        
                        <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-sm md:text-3xl shadow-[0_0_50px_rgba(79,70,229,0.5)] border-2 md:border-8 border-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.span
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                fyo
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Static Nodes with Connecting Lines */}
                    {items.map((item: any, i: number) => {
                        const angle = (i * (360 / items.length) - 90) * (Math.PI / 180);
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <React.Fragment key={i}>
                                {/* Connecting Line - Organic Style */}
                                <motion.div 
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 0.4 }}
                                    transition={{ delay: 0.8 + (i * 0.1), duration: 1.5, ease: "circOut" }}
                                    style={{ 
                                        width: radius,
                                        left: '50%',
                                        top: '50%',
                                        transformOrigin: 'left center',
                                        rotate: `${(i * (360 / items.length) - 90)}deg`
                                    }}
                                    className="absolute h-[1px] bg-gradient-to-r from-indigo-600 via-indigo-400 to-transparent z-0"
                                >
                                    <motion.div 
                                        animate={{ x: [0, radius, 0], opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-400/30 rounded-full blur-sm"
                                    />
                                </motion.div>
                                
                                {/* Node */}
                                <motion.div
                                    variants={itemVariants}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x, y }}
                                    whileHover={{ scale: 1.15, y: y - 10, zIndex: 50 }}
                                    className="absolute z-30"
                                >
                                    <div className={`px-6 py-3 md:px-10 md:py-5 rounded-full ${item.color} text-white font-black text-[11px] md:text-[14px] shadow-2xl border-4 border-white glass-border whitespace-nowrap uppercase tracking-tighter transition-all duration-500 hover:shadow-indigo-500/40`}>
                                        {item.name}
                                    </div>
                                </motion.div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

// 7. Activity Slide (Objectives Type)
export const ObjectivesSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-8 max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex-grow">
            <GlassCard className="h-full p-8 md:p-10 bg-white/40 border-white/60 shadow-xl rounded-[2.5rem] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                    <OrganicShape bg="bg-slate-900" color="text-white" className="w-10 h-10">
                        <Target size={20} />
                    </OrganicShape>
                    <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] font-display">Objetivo Principal</h3>
                </div>
                <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed tracking-tight font-display italic">
                {data.content.objective}
                </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard theme={data.theme} className="p-8 md:p-10 border-indigo-100 bg-indigo-600 text-white shadow-2xl rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-white/60 font-black text-[10px] mb-6 flex items-center gap-3 uppercase tracking-[0.3em] relative z-10">
                <Lightbulb className="text-white" size={18} />
                Consigna de Trabajo
              </h3>
              <p className="text-white font-bold leading-relaxed text-base md:text-lg tracking-tight relative z-10">
                {data.content.consigna}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div variants={itemVariants} className="h-full">
            <GlassCard theme={data.theme} className="h-full p-8 md:p-10 border-slate-100 bg-white shadow-2xl rounded-[2.5rem] flex flex-col">
              <h3 className="text-slate-400 font-black text-[10px] mb-8 uppercase tracking-[0.3em] flex items-center gap-4">
                <ClipboardCheck className="text-indigo-600" size={20} />
                Competencias a Evaluar
              </h3>
              <div className="space-y-3 flex-grow flex flex-col justify-center">
                {data.content.competencies.map((comp: string, i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10, backgroundColor: '#f8fafc' }}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                    <span className="font-black text-slate-700 uppercase text-[10px] tracking-widest">{comp}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs">fyo</div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Assessment Center</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// 8. Closing Slide
export const ClosingSlide: React.FC<SlideProps> = ({ data, onJumpToSlide }) => {
    const { description } = data.content;

    return (
        <motion.div 
            className="flex flex-col justify-center items-center h-full text-center relative max-w-4xl mx-auto px-6 py-4 overflow-hidden" 
            initial="hidden" 
            animate="show" 
            variants={containerVariants}
        >
            {/* Celebratory Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        x: Math.random() * 1200 - 600, 
                        y: 400,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{ 
                        y: -600,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                        rotate: [0, 360]
                    }}
                    transition={{ 
                        duration: 6 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-indigo-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-amber-400'} blur-[1px]`}
                />
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] -z-10" />

            <motion.div variants={itemVariants} className="mb-12 relative z-10">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="relative w-24 h-24 md:w-32 md:h-32 bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-white font-black text-2xl md:text-4xl shadow-2xl mx-auto border-4 border-white overflow-hidden group"
                >
                    <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    fyo
                </motion.div>
            </motion.div>

            <motion.h1 
                layoutId="slide-title"
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.8] drop-shadow-sm font-display uppercase"
            >
                {data.title}
            </motion.h1>

            <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-500 font-bold tracking-[0.3em] uppercase mb-12 opacity-70"
            >
                {data.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="max-w-2xl mb-16">
                <p className="text-xl md:text-2xl text-slate-600 font-bold leading-relaxed tracking-tight">
                    {description}
                </p>
            </motion.div>

            <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onJumpToSlide && onJumpToSlide(0)}
                className="px-12 py-5 bg-indigo-600 text-white rounded-full font-black text-sm md:text-base uppercase tracking-[0.3em] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-4 group"
            >
                <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                Reiniciar Presentación
            </motion.button>
        </motion.div>
    );
};

// 9. Interactive Dynamic Slide
const FlipCard = ({ color, frontText, backText, icon: Icon = Zap }: { color: string, frontText: string, backText: string, icon?: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-40 md:h-44 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 rounded-2xl ${color} flex flex-col items-center justify-center p-4 shadow-md border border-white/10 transition-all group-hover:brightness-105`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 backdrop-blur-md border border-white/10">
            <Icon className="text-white" size={24} />
          </div>
          <span className="text-white font-black text-xs tracking-[0.2em] uppercase text-center leading-tight opacity-60">Descubrir</span>
          <div className="mt-4 px-3 py-1 bg-black/5 rounded-full text-[8px] text-white/40 font-bold tracking-[0.1em] uppercase border border-white/5">Click para girar</div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white flex flex-col items-center justify-center p-5 shadow-md border border-slate-100 overflow-y-auto custom-scrollbar"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h4 className="text-slate-900 font-black text-[10px] uppercase tracking-widest mb-3 border-b border-slate-100 pb-2 w-full text-center">{frontText}</h4>
          <p className="text-slate-600 font-bold text-center text-[10px] md:text-[11px] leading-relaxed relative z-10">
            {backText}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const InteractiveDynamicSlide: React.FC<SlideProps> = ({ data }) => {
  const { phase, consigna, alertText, cards, roles, rolesIntro } = data.content;

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-y-auto custom-scrollbar"
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      {phase === 1 ? (
        <div className="w-full max-w-7xl flex flex-col items-center gap-8 md:gap-10">
          {/* Top Section: Consigna, Roles and Tips in a compact grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Consigna */}
            <GlassCard className="lg:col-span-5 p-8 bg-white/90 border-white/60 shadow-xl rounded-[3rem] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                    <ClipboardCheck size={24} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em]">Consigna de trabajo</h3>
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-bold whitespace-pre-line border-l-4 border-indigo-100 pl-6">
                {consigna}
              </p>
            </GlassCard>

            {/* Roles */}
            <div className="lg:col-span-7 bg-white/90 backdrop-blur-3xl rounded-[3rem] p-10 border border-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.5em] mb-10 text-center relative z-10">{rolesIntro}</p>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {roles?.map((role: any, idx: number) => {
                  const Icon = IconMap[role.icon] || Users;
                  const roleColors = [
                    'bg-indigo-600 text-white border-indigo-400',
                    'bg-emerald-600 text-white border-emerald-400',
                    'bg-amber-600 text-white border-amber-400',
                    'bg-rose-600 text-white border-rose-400'
                  ];
                  const colorClass = roleColors[idx % roleColors.length];
                  const [showInfo, setShowInfo] = useState(false);
                  
                  return (
                    <motion.div 
                      key={role.title} 
                      layout
                      onClick={() => setShowInfo(!showInfo)}
                      className={`flex flex-col gap-4 p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group/role shadow-lg ${showInfo ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl'}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 shrink-0 rounded-[1.5rem] flex items-center justify-center ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} group-hover/role:scale-110 transition-transform shadow-xl`}>
                          <Icon size={32} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-slate-900 font-black text-sm md:text-base uppercase tracking-tight leading-tight mb-1">{role.title}</span>
                          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest opacity-60">{role.name}</span>
                        </div>
                        <div className={`ml-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${showInfo ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                          <span className="text-lg font-black leading-none">{showInfo ? '−' : '+'}</span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {showInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 10 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="pt-4 border-t border-indigo-100"
                          >
                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-bold">
                              {role.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Row (Products) - Moved to bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl">
            {cards.map((card: any) => (
              <FlipCard key={card.id} {...card} icon={Briefcase} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl flex flex-col items-center gap-10">
          {/* News Header - Top */}
          <motion.div 
            variants={itemVariants}
            className="w-full bg-red-600 text-white py-8 px-12 rounded-[3rem] flex items-center justify-between shadow-2xl border-b-8 border-red-800 overflow-hidden relative gap-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
            <div className="flex items-center gap-8 relative z-10">
              <div className="bg-white text-red-600 p-4 rounded-2xl shadow-xl animate-pulse">
                <AlertCircle size={40} />
              </div>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase italic drop-shadow-2xl">{alertText}</h2>
            </div>
            <div className="flex flex-col items-end gap-2 relative z-10">
              <div className="flex items-center gap-3 bg-black/20 px-6 py-2 rounded-full border border-white/10">
                <Newspaper size={20} />
                <span className="text-xs font-black tracking-[0.3em] uppercase">Flash Informativo</span>
              </div>
            </div>
          </motion.div>

          {/* News Cards Row - Bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl">
            {cards.map((card: any) => (
              <FlipCard key={card.id} {...card} icon={AlertCircle} />
            ))}
          </div>
        </div>
     )}
    </motion.div>
  );
};

// 10. Evaluator Mindset Slide
export const EvaluatorMindsetSlide: React.FC<SlideProps> = ({ data }) => {
  const { evaluating, mindset } = data.content;
  return (
    <motion.div className="flex flex-col justify-center h-full py-8 max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <motion.div variants={itemVariants}>
          <GlassCard className="h-full p-8 md:p-10 bg-white border-white/80 shadow-2xl rounded-[2.5rem]">
            <div className="flex items-center gap-4 mb-8">
              <OrganicShape bg="bg-indigo-600" color="text-white" className="w-12 h-12">
                <Target size={24} />
              </OrganicShape>
              <h3 className="text-slate-900 font-black text-[11px] uppercase tracking-[0.4em] font-display">¿Qué evaluamos realmente?</h3>
            </div>
            <div className="space-y-5">
              {evaluating.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
                  <span className="text-sm md:text-base font-bold text-slate-800 tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="h-full p-8 md:p-10 bg-slate-900 text-white shadow-2xl rounded-[2.5rem] relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <OrganicShape bg="bg-indigo-500" color="text-white" className="w-12 h-12">
                <BrainCircuit size={24} />
              </OrganicShape>
              <h3 className="text-indigo-300 font-black text-[11px] uppercase tracking-[0.4em] font-display">Mindset del evaluador</h3>
            </div>
            
            <div className="space-y-7 relative z-10">
              <div className="space-y-3">
                {mindset.donts.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-red-400 text-xs md:text-sm font-bold bg-red-400/5 p-2 rounded-xl border border-red-400/10">
                    <span className="text-lg">❌</span> <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="space-y-3">
                {mindset.dos.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-emerald-400 text-xs md:text-sm font-bold bg-emerald-400/5 p-2 rounded-xl border border-emerald-400/10">
                    <span className="text-lg">✅</span> <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">Regla de oro</p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-2xl md:text-3xl font-serif italic tracking-tight leading-tight text-white drop-shadow-md"
                >
                  {mindset.goldenRule}
                </motion.p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 11. Observation Tips Slide
export const ObservationTipsSlide: React.FC<SlideProps> = ({ data }) => {
  const { sections, triggerQuestions } = data.content;
  const [activeSection, setActiveSection] = useState<number | null>(null);

  return (
    <motion.div 
      className="flex flex-col h-full py-4 max-w-7xl mx-auto px-6 overflow-hidden" 
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
        {/* Left Column: Sections List */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar pb-4">
            {sections.map((section: any, i: number) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                onClick={() => setActiveSection(activeSection === i ? null : i)}
                className="cursor-pointer"
              >
                <GlassCard className={`p-4 transition-all duration-500 rounded-[1.5rem] border-2 ${activeSection === i ? 'bg-indigo-600 border-indigo-400 shadow-indigo-200/50' : 'bg-white/90 border-white/80 hover:border-indigo-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${activeSection === i ? 'bg-white animate-pulse' : 'bg-indigo-600'}`} />
                      <h4 className={`font-black text-[11px] uppercase tracking-tight ${activeSection === i ? 'text-white' : 'text-slate-900'}`}>
                        {section.title}
                      </h4>
                    </div>
                    <span className={`text-xs font-black ${activeSection === i ? 'text-white/60' : 'text-indigo-600'}`}>
                      {activeSection === i ? '−' : '+'}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {activeSection === i && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2 pt-4 border-t border-white/20"
                      >
                        {section.tips.map((tip: string, idx: number) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <div className="text-white/60 font-black text-[10px] mt-0.5">•</div>
                            <p className="text-[11px] font-bold leading-tight text-white/90">{tip}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Trigger Questions */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <motion.div variants={itemVariants} className="h-full">
            <GlassCard className="h-full p-8 bg-slate-900 text-white shadow-2xl rounded-[3rem] relative overflow-hidden border border-slate-800 flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
                  >
                    <span className="text-2xl">💣</span>
                  </motion.div>
                  <div>
                    <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-tight">
                      {triggerQuestions.title}
                    </h3>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1 opacity-70">
                      {triggerQuestions.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 flex-grow">
                {triggerQuestions.questions.map((q: string, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group cursor-default"
                  >
                    <p className="text-sm md:text-base font-bold leading-relaxed text-slate-200 group-hover:text-white transition-colors">
                      {q}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Recurso para facilitadores</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
