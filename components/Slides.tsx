import React, { useState, useEffect } from 'react';
import { SLIDES, SlideData } from '../constants';
import { 
  Users, Calendar, GraduationCap, FileText, Flag, Heart, 
  BrainCircuit, Zap, ClipboardCheck, PencilRuler, Search, FileSignature, 
  Rocket, BarChart3, Compass, Target, Layers, Sparkles, DollarSign, Briefcase,
  Mail, RotateCcw, Clock, Lightbulb, Quote, AlertCircle, Newspaper, Printer
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { WordRaffle } from './WordRaffle';

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
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 200, damping: 20 } }
};

// --- Reusable Premium Components ---
const OrganicShape: React.FC<{ children: React.ReactNode, bg: string, color: string, className?: string }> = ({ children, bg, color, className = "" }) => (
    <div className={`relative flex items-center justify-center ${bg} ${color} p-5 shadow-sm border border-white/40 transition-all duration-700 rounded-[1.5rem] md:rounded-[2rem] ${className} group-hover:scale-110 group-hover:rotate-3`}>
        <div className={`absolute inset-0 ${bg} blur-2xl opacity-10 rounded-full -z-10 animate-pulse`} />
        <div className="absolute inset-0 glass-border rounded-[inherit] pointer-events-none" />
        {children}
    </div>
);

const GlowIcon: React.FC<{ icon: any, color: string, bg: string, size?: number }> = ({ icon: Icon, color, bg, size = 24 }) => (
    <OrganicShape bg={bg} color={color}>
        <div className="relative">
            <Icon size={size} strokeWidth={2.5} className="relative z-10" />
            <Icon size={size} strokeWidth={2.5} className="absolute inset-0 blur-sm opacity-50" />
        </div>
    </OrganicShape>
);

const GlassCard: React.FC<{ children?: React.ReactNode, className?: string, hover?: boolean, theme?: 'light' | 'dark' | 'brand' }> = ({ children, className = "", hover = false, theme = 'light' }) => {
    const themeClasses = {
        light: 'bg-white/60 border-white/60 shadow-sm glass-border',
        dark: 'bg-slate-900/80 border-slate-700/50 shadow-lg text-white glass-border',
        brand: 'bg-indigo-600/5 border-indigo-500/20 shadow-sm glass-border'
    };

    return (
        <div className={`
            backdrop-blur-xl 
            rounded-2xl md:rounded-3xl
            relative overflow-hidden
            ${themeClasses[theme]}
            ${hover ? 'transition-all duration-500 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1' : ''}
            ${className}
        `}>
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
      <div className={`absolute inset-0 -z-20 bg-gradient-to-br ${isAssessment ? 'from-rose-50 via-white to-orange-50' : isBreak ? 'from-amber-50 via-white to-orange-50' : 'from-indigo-50 via-white to-cyan-50'} animate-gradient-xy`} />
      
      <motion.div variants={itemVariants} className="mb-4 relative w-full max-w-4xl px-6">
        {/* Universe Effect Background */}
        <div className="absolute inset-0 -z-10">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isAssessment ? 'bg-rose-500/10' : isBreak ? 'bg-amber-500/10' : 'bg-indigo-500/10'} rounded-full blur-[120px] animate-pulse`} />
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        rotate: { repeat: Infinity, duration: 25 + i * 12, ease: "linear" },
                        scale: { repeat: Infinity, duration: 6 + i, ease: "easeInOut" },
                        opacity: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div 
                        className={`w-1.5 h-1.5 ${isAssessment ? 'bg-rose-400/40' : isBreak ? 'bg-amber-400/40' : 'bg-indigo-400/40'} rounded-full absolute`}
                        style={{ 
                            top: `${15 + i * 12}%`, 
                            left: `${5 + i * 18}%`,
                            boxShadow: `0 0 12px ${isAssessment ? '#e11d48' : isBreak ? '#d97706' : '#4f46e5'}`
                        }}
                    />
                </motion.div>
            ))}
        </div>

        <GlassCard theme={data.theme} className="p-6 md:p-16 flex flex-col items-center border-white/20 shadow-lg relative overflow-visible bg-white/30 backdrop-blur-2xl">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-40 h-1 bg-gradient-to-r from-transparent via-${isAssessment ? 'rose' : isBreak ? 'amber' : 'indigo'}-500 to-transparent rounded-b-full`} />
            
            <motion.div 
                layoutId="brand-tag"
                variants={itemVariants} 
                className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-slate-100/50 bg-white/80 shadow-md text-slate-400 text-[7px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-8"
            >
                <div className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${isAssessment ? 'bg-rose-500' : isBreak ? 'bg-amber-500' : 'bg-indigo-500'} animate-pulse`} />
                {isAssessment ? 'Evaluación' : isBreak ? 'Descanso' : 'fyo'}
            </motion.div>
            
            <motion.h1 
                layoutId="slide-title"
                variants={itemVariants} 
                className="text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-4 md:mb-6 leading-[0.85] font-display uppercase drop-shadow-sm"
            >
                {(data.title || '').split(' ').map((word, i) => {
                    const isSpecial = word.toUpperCase().includes('JP') || word.toUpperCase().includes('FYO') || word.toUpperCase().includes('ASSESSMENT');
                    const hasEmoji = /\p{Emoji}/u.test(word);
                    const colorClass = isAssessment ? 'text-rose-600' : isBreak ? 'text-amber-600' : 'text-indigo-600';
                    return (
                        <span key={i} className={i % 2 === 1 && !isSpecial && !hasEmoji ? `italic ${colorClass} font-serif lowercase` : ''}>
                            {word}{' '}
                        </span>
                    );
                })}
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className="text-base md:text-xl text-slate-500 font-bold tracking-widest mb-10 max-w-2xl leading-relaxed uppercase opacity-80"
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
                className="flex flex-wrap justify-center gap-3"
              >
                  {data.content.tags.map((tag: string, idx: number) => {
                    const colorHex = isAssessment ? '#e11d48' : isBreak ? '#d97706' : '#4f46e5';
                    const colorShadow = isAssessment ? 'rgb(225 29 72 / 0.1)' : isBreak ? 'rgb(217 119 6 / 0.1)' : 'rgb(79 70 229 / 0.1)';
                    return (
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, y: 20 },
                          show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
                        }} 
                        key={idx} 
                        whileHover={{ y: -8, scale: 1.05, borderColor: colorHex, color: colorHex, boxShadow: `0 20px 25px -5px ${colorShadow}` }}
                        className="px-6 py-3 bg-white text-slate-900 text-[10px] font-black tracking-[0.2em] uppercase rounded-2xl border border-slate-100 shadow-lg transition-all cursor-default"
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
        <GlassCard theme={data.theme} className="w-full max-w-4xl aspect-video overflow-hidden border-white/40 shadow-2xl relative flex items-center justify-center bg-slate-50 group">
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
  return (
    <motion.div className="flex flex-col justify-center items-center h-full max-w-5xl mx-auto px-6 py-8" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {/* Main Text Block - Bento Style */}
        <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard theme={data.theme} className="h-full p-8 md:p-12 border-white shadow-2xl relative overflow-visible flex flex-col justify-center bg-white/80 backdrop-blur-2xl rounded-[2.5rem]">
                <div className="absolute -top-4 -left-4">
                    <OrganicShape bg="bg-indigo-600" color="text-white" className="w-14 h-14 shadow-2xl">
                        <Quote size={28} fill="currentColor" />
                    </OrganicShape>
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-8 tracking-tight font-display italic whitespace-pre-line">
                    "{mainText}"
                </div>
                <div className="mt-auto flex items-center gap-6">
                    <div className="h-1.5 w-24 bg-indigo-600 rounded-full" />
                    <p className="text-sm md:text-base text-indigo-600 font-black leading-relaxed tracking-[0.2em] uppercase">
                        {description}
                    </p>
                </div>
            </GlassCard>
        </motion.div>
        
        {/* Highlight Block - Bento Style */}
        <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="h-full relative p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                
                <Sparkles className="text-indigo-400 mb-8 animate-pulse relative z-10" size={40} />
                
                <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-black text-white leading-[1.1] tracking-tighter font-display uppercase mb-10">
                        {highlight}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">fyo</div>
                        <div>
                            <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1">Compromiso</span>
                            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Soluciones a medida</span>
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
                        <div className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed tracking-tight mb-8 italic border-l-4 border-indigo-100 pl-8 whitespace-pre-line">
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
                            <p className="text-xl md:text-2xl font-black text-slate-900 leading-[1.1] tracking-tighter font-display uppercase relative z-10">
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
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="p-4 flex items-center gap-5 bg-white/40 backdrop-blur-xl glass-border rounded-[1.5rem] shadow-sm hover:-translate-x-2 transition-all duration-700 group cursor-default border border-white/60">
                  <GlowIcon icon={Icon} color="text-indigo-600" bg="bg-indigo-50" size={20} />
                  <span className="text-lg font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase font-display">
                    {valor.title}
                  </span>
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
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tighter font-display group-hover:text-indigo-600 transition-colors uppercase leading-[0.85]">
                {cleanTitle}
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-bold leading-relaxed mb-10 flex-grow tracking-tight opacity-80">
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
                            className="w-[85%] h-[85%] border border-slate-100/50 rounded-full border-dashed" 
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                            className="w-[60%] h-[60%] border border-slate-50 rounded-full border-dashed" 
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
                                {/* Connecting Line */}
                                <motion.div 
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 0.2 }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                    style={{ 
                                        width: radius,
                                        left: '50%',
                                        top: '50%',
                                        transformOrigin: 'left center',
                                        rotate: `${(i * (360 / items.length) - 90)}deg`
                                    }}
                                    className="absolute h-0.5 bg-gradient-to-r from-slate-900 to-transparent z-0"
                                />
                                
                                {/* Node */}
                                <motion.div
                                    variants={itemVariants}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x, y }}
                                    whileHover={{ scale: 1.2, y: y - 10, zIndex: 50 }}
                                    className="absolute z-30"
                                >
                                    <div className={`px-5 py-2.5 md:px-8 md:py-4 rounded-full ${item.color} text-white font-black text-[10px] md:text-[13px] shadow-2xl border-2 md:border-4 border-white glass-border whitespace-nowrap uppercase tracking-tighter transition-all duration-300`}>
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
                <p className="text-xl md:text-2xl text-slate-700 font-bold leading-relaxed tracking-tight font-display italic">
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
              <p className="text-white font-bold leading-relaxed text-lg md:text-xl tracking-tight relative z-10">
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
    const { contacts, description } = data.content;

    return (
        <motion.div 
            className="flex flex-col justify-center items-center h-full text-center relative max-w-4xl mx-auto px-6 py-4 overflow-hidden print:block print:p-0 print:m-0 print:max-w-none print:h-auto" 
            initial="hidden" 
            animate="show" 
            variants={containerVariants}
        >
            {/* Screen-only content */}
            <div className="w-full h-full flex flex-col items-center justify-center print:hidden">
                {/* Celebratory Particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            x: Math.random() * 1000 - 500, 
                            y: Math.random() * 1000 - 500,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{ 
                            y: [null, Math.random() * -200 - 100],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5],
                            rotate: [0, 180]
                        }}
                        transition={{ 
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-indigo-400' : 'bg-emerald-400'} blur-[1px]`}
                    />
                ))}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

                <motion.div variants={itemVariants} className="mb-8 relative z-10">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl mb-10 shadow-2xl mx-auto border-4 border-white"
                    >
                        fyo
                    </motion.div>
                    <motion.h1 
                        layoutId="slide-title"
                        className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] drop-shadow-sm font-display uppercase"
                    >
                        {data.title}
                    </motion.h1>
                    <div className="flex items-center justify-center gap-6">
                        <div className="h-1 w-12 bg-indigo-600 rounded-full" />
                        <p className="text-lg text-indigo-600 font-black tracking-[0.4em] uppercase font-display">
                            {data.subtitle}
                        </p>
                        <div className="h-1 w-12 bg-indigo-600 rounded-full" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
                    <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed tracking-tight italic">
                        "{description}"
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full max-w-3xl relative z-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contacts.map((contact: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-[2rem] border border-slate-100 shadow-xl group hover:border-indigo-200 hover:bg-slate-50 transition-all duration-500">
                                <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <Mail size={24} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{contact.role}</span>
                                    <span className="block text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{contact.email}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {onJumpToSlide && (
                    <div className="mt-16 flex flex-col md:flex-row items-center gap-6">
                        <motion.button 
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onJumpToSlide(0)}
                            className="flex items-center gap-4 px-10 py-4 bg-slate-900 text-white rounded-full font-black text-[11px] transition-all shadow-2xl active:scale-95 font-display tracking-[0.3em] uppercase group"
                        >
                            <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                            Reiniciar Presentación
                        </motion.button>

                        <motion.button 
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.print()}
                            className="flex items-center gap-4 px-10 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-full font-black text-[11px] transition-all shadow-xl active:scale-95 font-display tracking-[0.3em] uppercase group"
                        >
                            <Printer size={18} className="group-hover:scale-110 transition-transform" />
                            Imprimir Resumen Dinámicas
                        </motion.button>
                    </div>
                )}
            </div>
            
            {/* Hidden Print Layout - Only visible when printing */}
            <PrintSummary />
        </motion.div>
    );
};

const PrintSummary = () => {
  const slide9 = SLIDES.find(s => s.id === 'dinamica-2');
  const slide10 = SLIDES.find(s => s.id === 'dinamica-2-crisis');

  if (!slide9 || !slide10) return null;

  return (
    <div className="hidden print:block bg-white w-full text-slate-900 font-sans p-0 m-0">
      {/* PAGE 1: Dinámica 2 - Fase 1 */}
      <div className="w-full mx-auto flex flex-col min-h-screen" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
        {/* Header - Candidate Guide Style */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-base">
              fyo
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase leading-none text-slate-900">Guía del Candidato</h1>
              <p className="text-[9px] font-black text-indigo-600 tracking-[0.2em] uppercase mt-0.5">Assessment Center | Dinámica 2: Fase 1</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Página 1 de 2</div>
            <div className="px-2 py-0.5 bg-slate-100 rounded text-[7px] font-black text-slate-500 uppercase">Confidencial</div>
          </div>
        </div>

        {/* Candidate Info Field */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nombre del Candidato:</span>
          <div className="flex-1 border-b border-slate-300 h-4" />
        </div>

        {/* Content Phase 1 */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                <Layers size={14} />
              </div>
              <h2 className="text-base font-black uppercase tracking-tight text-slate-900">Construcción y Logística</h2>
            </div>
          </div>
          
          <div className="space-y-5 text-left">
            {/* Consigna */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Compass size={12} />
                Consigna General
              </h3>
              <p className="text-[11px] font-bold leading-relaxed text-slate-700 italic">
                "{slide9.content.consigna}"
              </p>
            </div>

            {/* Roles */}
            <div className="grid grid-cols-2 gap-3">
              {slide9.content.roles.map((role: any, i: number) => (
                <div key={i} className="border border-slate-200 p-3 rounded-lg flex flex-col justify-between text-left">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase mb-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    {role.title}
                  </h4>
                  <p className="text-[8px] font-bold leading-tight text-slate-500">{role.desc}</p>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-white border-2 border-slate-100 p-4 rounded-xl text-left">
              <h3 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Sparkles size={12} className="text-indigo-600" />
                Recomendaciones para el equipo
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {slide9.content.tips.map((tip: string, i: number) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="text-indigo-600 font-black text-[10px] mt-0.5">•</div>
                    <p className="text-[9px] font-bold leading-tight text-slate-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-8 pt-6 border-t border-dashed border-slate-300 text-left">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <ClipboardCheck size={12} />
                Espacio para anotaciones personales
              </h3>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-b border-slate-100 h-5 w-full" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-left">
          <p className="text-[8px] font-bold text-slate-300 italic">fyo Assessment Center JP 25-26 | No compartir este documento</p>
          <div className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">fyo</div>
        </div>
      </div>

      {/* PAGE 2: Dinámica 2 - Fase 2 */}
      <div className="w-full mx-auto flex flex-col min-h-screen" style={{ breakBefore: 'page', pageBreakBefore: 'always' }}>
        {/* Header Page 2 */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-base">
              fyo
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase leading-none text-slate-900">Guía del Candidato</h1>
              <p className="text-[9px] font-black text-red-600 tracking-[0.2em] uppercase mt-0.5">Assessment Center | Dinámica 2: Fase 2</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Página 2 de 2</div>
            <div className="px-2 py-0.5 bg-red-50 rounded text-[7px] font-black text-red-600 uppercase">Urgente</div>
          </div>
        </div>

        {/* Content Phase 2 */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white">
                <AlertCircle size={14} />
              </div>
              <h2 className="text-base font-black uppercase tracking-tight text-red-600">Gestión de Crisis</h2>
            </div>
          </div>

          <div className="space-y-5 text-left">
            <div className="bg-red-50/30 p-5 rounded-xl border border-red-100">
              <h3 className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Zap size={12} />
                Contexto Crítico
              </h3>
              <p className="text-[10px] font-bold leading-relaxed text-slate-700">
                Durante esta fase, el equipo enfrentará situaciones imprevistas que pondrán a prueba su capacidad de reacción y toma de decisiones estratégica.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {slide10.content.cards.map((card: any, i: number) => (
                <div key={i} className="flex gap-4 items-center border border-slate-200 p-4 rounded-xl text-left">
                  <div className="shrink-0 w-12 text-center">
                    <div className="text-[10px] font-black text-red-600 uppercase mb-1">{i + 1}</div>
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                      <Zap size={14} />
                    </div>
                  </div>
                  <div className="h-10 w-px bg-slate-100" />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 mb-1">{card.frontText}</h4>
                    <p className="text-[9px] font-bold leading-snug text-slate-500 italic">
                      "{card.backText}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Notes Section for Phase 2 */}
            <div className="mt-8 pt-6 border-t border-dashed border-slate-300 text-left">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <ClipboardCheck size={12} />
                Plan de Acción y Resoluciones
              </h3>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border-b border-slate-100 h-5 w-full" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-left">
          <p className="text-[8px] font-bold text-slate-300 italic">fyo Assessment Center JP 25-26 | Confidencial</p>
          <div className="text-[9px] font-black text-red-600 uppercase tracking-widest italic text-right">Crisis Management</div>
        </div>
      </div>
    </div>
  );
};


// 10. Word Raffle Slide
export const WordRaffleSlide: React.FC<SlideProps> = () => {
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center py-4 pb-12"
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full h-full max-w-6xl px-6">
        <GlassCard className="w-full h-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative bg-white rounded-[2.5rem] border-4 border-white group">
          <WordRaffle />
          {/* Decorative Frame Elements */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-slate-100 rounded-full z-20" />
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};// 11. Interactive Dynamic Slide
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
      className="w-full h-full flex flex-col items-center justify-center px-4 py-6 overflow-hidden"
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      {phase === 1 ? (
        <div className="w-full max-w-6xl flex flex-col items-center gap-6">
          {/* Top Section: Consigna, Roles and Tips in a compact grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Consigna */}
            <GlassCard className="lg:col-span-5 p-5 bg-white/80 border-white/60 shadow-sm rounded-3xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <ClipboardCheck size={18} />
                </div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Consigna de trabajo</h3>
              </div>
              <p className="text-slate-600 text-[11px] md:text-[12px] leading-relaxed font-bold whitespace-pre-line">
                {consigna}
              </p>
            </GlassCard>

            {/* Roles */}
            <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl rounded-3xl p-5 border border-white/60 shadow-sm">
              <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.4em] mb-4 text-center">{rolesIntro}</p>
              <div className="grid grid-cols-2 gap-3">
                {roles?.map((role: any, idx: number) => {
                  const Icon = IconMap[role.icon] || Users;
                  const roleColors = [
                    'bg-indigo-50 text-indigo-600 border-indigo-100',
                    'bg-emerald-50 text-emerald-600 border-emerald-100',
                    'bg-amber-50 text-amber-600 border-amber-100',
                    'bg-rose-50 text-rose-600 border-rose-100'
                  ];
                  const colorClass = roleColors[idx % roleColors.length];
                  const [showInfo, setShowInfo] = useState(false);
                  
                  return (
                    <div 
                      key={role.title} 
                      className="flex items-center gap-3 p-3 bg-white/60 rounded-2xl border border-white/80 hover:border-indigo-200 transition-all group/role shadow-sm relative overflow-hidden"
                    >
                      <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all z-20"
                      >
                        <span className="text-xs font-black leading-none">{showInfo ? '−' : '+'}</span>
                      </button>

                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} group-hover/role:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-col min-w-0 pr-4">
                        <span className="text-slate-900 font-black text-[11px] md:text-[12px] uppercase tracking-tight leading-tight mb-0.5">{role.title}</span>
                        <AnimatePresence mode="wait">
                          {showInfo ? (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-slate-500 text-[9px] leading-tight font-bold"
                            >
                              {role.desc}
                            </motion.p>
                          ) : (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-slate-400 text-[9px] font-bold uppercase tracking-widest opacity-60"
                            >
                              Click en + para info
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Row (Products) - Moved to bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
            {cards.map((card: any) => (
              <FlipCard key={card.id} {...card} icon={Briefcase} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col items-center gap-6">
          {/* News Header - Top */}
          <motion.div 
            variants={itemVariants}
            className="w-full bg-red-600 text-white py-4 px-8 rounded-3xl flex items-center justify-between shadow-lg border-b-4 border-red-800 overflow-hidden relative gap-4"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-white text-red-600 p-2 rounded-xl shadow-md animate-pulse">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic drop-shadow-lg">{alertText}</h2>
            </div>
            <div className="flex flex-col items-end gap-0 relative z-10">
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                <Newspaper size={14} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Flash Informativo</span>
              </div>
            </div>
          </motion.div>

          {/* News Cards Row - Bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
            {cards.map((card: any) => (
              <FlipCard key={card.id} {...card} icon={AlertCircle} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
;

// Placeholder for missing types
export const MentoringSplitSlide: React.FC<SlideProps> = ({ data }) => {
  const { mentors, title, subtitle } = data.content;
  
  return (
    <motion.div className="flex flex-col justify-center h-full py-4 max-w-6xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Mentoreo fyo</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase font-display leading-[0.9]">
                {title || 'Acompañamiento Estratégico'}
            </h2>
            <p className="text-xl text-slate-500 font-bold leading-relaxed tracking-tight border-l-4 border-indigo-600 pl-6 italic">
                {subtitle || 'Potenciamos tu talento con la guía de nuestros líderes.'}
            </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
            {mentors?.map((mentor: any, i: number) => (
                <motion.div key={i} variants={itemVariants}>
                    <GlassCard className="p-6 flex items-center gap-6 bg-white/80 backdrop-blur-xl border border-white shadow-xl hover:-translate-x-4 transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-indigo-600 transition-colors">
                            {mentor.name.charAt(0)}
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-xl font-black text-slate-900 tracking-tighter uppercase font-display group-hover:text-indigo-600 transition-colors">{mentor.name}</h4>
                            <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] opacity-60">{mentor.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            <Sparkles size={18} />
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
export const AcademySplitSlide = () => null;
