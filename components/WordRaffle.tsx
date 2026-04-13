import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WORDS = [
    { text: "Messi", cat: "sports" }, { text: "Maradona", cat: "sports" }, { text: "Mundial", cat: "sports" },
    { text: "Mate", cat: "misc" }, { text: "Viaje", cat: "travel" }, { text: "Estados Unidos", cat: "travel" },
    { text: "Política", cat: "politics" }, { text: "Argentina", cat: "travel" }, { text: "Sueño", cat: "emotions" },
    { text: "Meta", cat: "business" }, { text: "Camino", cat: "emotions" }, { text: "Cambio", cat: "emotions" },
    { text: "Decisión", cat: "emotions" }, { text: "Oportunidad", cat: "business" }, { text: "Desafío", cat: "emotions" },
    { text: "Logro", cat: "business" }, { text: "Intento", cat: "emotions" }, { text: "Error", cat: "emotions" },
    { text: "Equipo", cat: "emotions" }, { text: "Amigo", cat: "emotions" }, { text: "Grupo", cat: "emotions" },
    { text: "Ayuda", cat: "emotions" }, { text: "Apoyo", cat: "emotions" }, { text: "Confianza", cat: "emotions" },
    { text: "Charla", cat: "emotions" }, { text: "Encuentro", cat: "emotions" }, { text: "Risa", cat: "emotions" },
    { text: "Abrazo", cat: "emotions" }, { text: "Trump", cat: "politics" }, { text: "Irán", cat: "politics" },
    { text: "Tini", cat: "music" }, { text: "Cacho Castaña", cat: "music" }, { text: "Mercedes Sosa", cat: "music" },
    { text: "Francia", cat: "travel" }, { text: "Mbappé", cat: "sports" }, { text: "Icardi", cat: "sports" },
    { text: "Moria Casán", cat: "music" }, { text: "Ricardo Fort", cat: "music" }, { text: "Franco Colapinto", cat: "sports" },
    { text: "Fórmula 1", cat: "sports" }, { text: "Ferrari", cat: "sports" }, { text: "Café", cat: "misc" },
    { text: "Fogata", cat: "misc" }, { text: "Guitarra", cat: "music" }, { text: "Piano", cat: "music" },
    { text: "Tenis", cat: "sports" }, { text: "León", cat: "misc" }, { text: "Perro", cat: "misc" },
    { text: "Gato", cat: "misc" }, { text: "Shakira", cat: "music" }, { text: "Bizarrap", cat: "music" },
    { text: "Duki", cat: "music" }, { text: "Nicki Nicole", cat: "music" }, { text: "Coldplay", cat: "music" },
    { text: "Elon Musk", cat: "politics" }, { text: "Jeff Bezos", cat: "politics" }, { text: "Netflix", cat: "politics" },
    { text: "TikTok", cat: "politics" }, { text: "Instagram", cat: "politics" }, { text: "Miami", cat: "travel" },
    { text: "Dubái", cat: "travel" }, { text: "Europa", cat: "travel" }, { text: "Avión", cat: "travel" },
    { text: "Hotel", cat: "travel" }, { text: "Startup", cat: "business" }, { text: "Dinero", cat: "business" },
    { text: "Éxito", cat: "business" }, { text: "Marca", cat: "business" }, { text: "Influencia", cat: "business" },
    { text: "Cliente", cat: "business" }, { text: "Negocio", cat: "business" }, { text: "Venta", cat: "business" },
    { text: "Cierre", cat: "business" }, { text: "Propuesta", cat: "business" }, { text: "Resultado", cat: "business" }
];

const COLORS = [
    '#94a3b8', // Slate
    '#a8a29e', // Stone
    '#9ca3af', // Gray
    '#a1a1aa', // Zinc
];

interface WordItem {
    text: string;
    cat: string;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

export const WordRaffle: React.FC = () => {
    const [wordItems, setWordItems] = useState<WordItem[]>([]);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [status, setStatus] = useState('');
    const [showCelebration, setShowCelebration] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const init = useCallback(() => {
        const cols = 8;
        const rows = 6;
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;

        const items = WORDS.map((wordObj, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            // Better distribution to avoid overlap
            const x = (col * cellWidth) + (Math.random() * (cellWidth * 0.3) + (cellWidth * 0.35));
            const y = (row * cellHeight) + (Math.random() * (cellHeight * 0.3) + (cellHeight * 0.35));
            
            let baseSize = 0.7;
            if (wordObj.text.length < 5) baseSize = 0.85;
            if (wordObj.text.length > 10) baseSize = 0.6;

            return {
                text: wordObj.text,
                cat: wordObj.cat,
                x,
                y,
                size: baseSize,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                duration: 3 + Math.random() * 4, // Faster for floating
                delay: Math.random() * -5
            };
        });

        setWordItems(items);
        setSelectedIndices([]);
        setStatus('');
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    const handleRaffle = async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (selectedIndices.length > 0) {
            setStatus("Reiniciando...");
            setShowCelebration(false);
            setSelectedIndices([]);
            await new Promise(r => setTimeout(r, 600));
        }

        setStatus("Escaneando nube...");
        
        // Select 5 random indices from different categories
        const newSelected: number[] = [];
        const usedCategories = new Set();
        const availableIndices = Array.from({length: WORDS.length}, (_, i) => i);
        
        // Shuffle
        for (let i = availableIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
        }

        for (let i = 0; i < availableIndices.length && newSelected.length < 5; i++) {
            const idx = availableIndices[i];
            const cat = WORDS[idx].cat;
            if (!usedCategories.has(cat)) {
                newSelected.push(idx);
                usedCategories.add(cat);
            }
        }

        // Fallback
        if (newSelected.length < 5) {
            for (let i = 0; i < availableIndices.length && newSelected.length < 5; i++) {
                const idx = availableIndices[i];
                if (!newSelected.includes(idx)) {
                    newSelected.push(idx);
                }
            }
        }

        // Staggered selection with a "searching" feel
        for (let i = 1; i <= newSelected.length; i++) {
            setStatus(i === 5 ? "¡Sorteo completo!" : `Buscando palabra ${i}...`);
            await new Promise(r => setTimeout(r, 450));
            setSelectedIndices(newSelected.slice(0, i));
            if (i === 5) setShowCelebration(true);
        }

        setStatus("");
        setIsAnimating(false);
    };

    const positions = [
        { x: 50, y: 20 }, // Top Center
        { x: 20, y: 45 }, // Middle Left
        { x: 80, y: 45 }, // Middle Right
        { x: 30, y: 75 }, // Bottom Left-ish
        { x: 70, y: 75 }  // Bottom Right-ish
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 relative overflow-hidden bg-[#fcfdfe]">
            {/* Mesh Background */}
            <div className="absolute inset-0 -z-10 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.1)_0%,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(241,245,249,1)_0%,transparent_100%)] blur-[40px]" />
            </div>

            <div 
                ref={containerRef}
                className="w-full max-w-6xl flex-1 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] relative overflow-hidden flex items-center justify-center mb-6"
            >
                {/* Celebration Sparkles */}
                {showCelebration && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                                initial={{ 
                                    x: '50%', 
                                    y: '50%', 
                                    scale: 0,
                                    opacity: 1 
                                }}
                                animate={{ 
                                    x: `${Math.random() * 100}%`, 
                                    y: `${Math.random() * 100}%`,
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="absolute top-10 right-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] z-10 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isAnimating ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`} />
                    {selectedIndices.length > 0 ? `${selectedIndices.length} / 5` : 'Nube Dinámica'}
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    {wordItems.map((item, idx) => {
                        const isSelected = selectedIndices.includes(idx);
                        const selectionIdx = selectedIndices.indexOf(idx);
                        const isDimmed = selectedIndices.length > 0 && !isSelected;

                        return (
                            <motion.div
                                key={idx}
                                className={`absolute whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-full font-black transition-all duration-700 flex items-center justify-center ${
                                    isSelected 
                                    ? 'z-50 text-white shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] border border-white/40 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-800 font-display' 
                                    : 'text-slate-400 bg-white/5 backdrop-blur-sm border border-white/5'
                                }`}
                                initial={false}
                                animate={{
                                    left: isSelected ? `${positions[selectionIdx].x}%` : `${item.x}%`,
                                    top: isSelected ? `${positions[selectionIdx].y}%` : `${item.y}%`,
                                    x: isSelected ? '-50%' : [0, 15, -15, 0],
                                    y: isSelected ? '-50%' : [0, -15, 15, 0],
                                    scale: isSelected ? 1.05 : isDimmed ? 0.6 : 0.8,
                                    opacity: isDimmed ? 0.2 : isSelected ? 1 : 0.55,
                                    filter: isDimmed ? 'blur(12px)' : isSelected ? 'blur(0px)' : 'blur(6px)',
                                    fontSize: isSelected ? 'clamp(0.75rem, 4vw, 1.2rem)' : `clamp(0.5rem, 2vw, ${item.size}rem)`,
                                    letterSpacing: isSelected ? '0.01em' : '0em',
                                }}
                                whileHover={isSelected ? { 
                                    scale: 1.1, 
                                    rotate: 1,
                                    transition: { type: 'spring', stiffness: 500, damping: 15 }
                                } : !isAnimating && !isDimmed ? { 
                                    scale: 0.9, 
                                    opacity: 0.3,
                                    filter: 'blur(5px)',
                                    zIndex: 20
                                } : {}}
                                transition={{
                                    x: isSelected ? { type: 'spring', stiffness: 200, damping: 20 } : { repeat: Infinity, duration: item.duration, ease: "easeInOut", delay: item.delay },
                                    y: isSelected ? { type: 'spring', stiffness: 200, damping: 20 } : { repeat: Infinity, duration: item.duration + 1.5, ease: "easeInOut", delay: item.delay },
                                    scale: { type: 'spring', stiffness: 400, damping: 25 },
                                    opacity: { duration: 0.4 },
                                    filter: { duration: 0.4 },
                                    left: { type: 'spring', stiffness: 120, damping: 20 },
                                    top: { type: 'spring', stiffness: 120, damping: 20 },
                                }}
                                style={{
                                    pointerEvents: isAnimating || isDimmed ? 'none' : 'auto'
                                }}
                            >
                                {item.text}
                                {isSelected && (
                                    <>
                                        {/* Premium Glossy Reflection */}
                                        <div className="absolute top-0.5 left-4 right-4 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none" />
                                        
                                        {/* Refined Shine Effect */}
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                            animate={{ x: ['-150%', '250%'] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', repeatDelay: 1 }}
                                        />
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 pb-2">
                <div className={`text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] h-4 transition-all duration-500 ${status || showCelebration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {showCelebration ? "¡Dinámica lista para comenzar!" : status}
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRaffle}
                    disabled={isAnimating}
                    className="px-12 py-4 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                    <Sparkles size={16} className={isAnimating ? 'animate-spin' : ''} />
                    {selectedIndices.length > 0 ? 'Sortear de nuevo' : 'Sortear palabras'}
                </motion.button>
            </div>
        </div>
    );
};
