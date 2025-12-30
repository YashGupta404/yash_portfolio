import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Skill {
    name: string;
    level: number;
}

interface SkillFrame {
    category: string;
    description: string;
    skills: Skill[];
    frameNumber: number;
}

// All skills from resume
const skillFrames: SkillFrame[] = [
    {
        category: "LANGUAGES",
        description: "The Foundation",
        frameNumber: 1,
        skills: [
            { name: "Python", level: 92 },
            { name: "TypeScript", level: 90 },
            { name: "JavaScript", level: 95 },
            { name: "SQL", level: 85 },
            { name: "HTML/CSS", level: 95 },
        ]
    },
    {
        category: "FRONTEND",
        description: "The Cinematography",
        frameNumber: 2,
        skills: [
            { name: "React.js", level: 95 },
            { name: "Next.js", level: 90 },
            { name: "Vite", level: 88 },
            { name: "TailwindCSS", level: 92 },
            { name: "shadcn/ui & Radix UI", level: 85 },
            { name: "TanStack Query", level: 80 },
        ]
    },
    {
        category: "BACKEND",
        description: "Behind the Scenes",
        frameNumber: 3,
        skills: [
            { name: "Node.js", level: 90 },
            { name: "Express.js", level: 88 },
            { name: "FastAPI", level: 85 },
            { name: "Flask", level: 82 },
            { name: "REST APIs", level: 92 },
            { name: "SSE / WebSockets", level: 78 },
        ]
    },
    {
        category: "AI / ML",
        description: "The Magic",
        frameNumber: 4,
        skills: [
            { name: "Google Gemini", level: 88 },
            { name: "LangChain", level: 85 },
            { name: "Groq (Llama 3.3)", level: 82 },
            { name: "Scikit-Learn", level: 80 },
            { name: "TensorFlow", level: 75 },
            { name: "NLP / NLTK", level: 78 },
        ]
    },
    {
        category: "3D & ANIMATION",
        description: "Visual Effects",
        frameNumber: 5,
        skills: [
            { name: "Three.js", level: 85 },
            { name: "React Three Fiber", level: 82 },
            { name: "React Three Drei", level: 80 },
            { name: "GSAP", level: 88 },
            { name: "Framer Motion", level: 90 },
        ]
    },
    {
        category: "CLOUD & DEVOPS",
        description: "The Production",
        frameNumber: 6,
        skills: [
            { name: "AWS", level: 80 },
            { name: "Google Cloud Run", level: 78 },
            { name: "Vercel", level: 90 },
            { name: "Railway", level: 85 },
            { name: "Docker", level: 75 },
            { name: "Firebase", level: 82 },
        ]
    },
    {
        category: "DATABASES",
        description: "Data Vaults",
        frameNumber: 7,
        skills: [
            { name: "MongoDB", level: 88 },
            { name: "PostgreSQL", level: 85 },
            { name: "Supabase", level: 82 },
            { name: "Firestore", level: 80 },
        ]
    },
    {
        category: "TOOLS",
        description: "The Toolkit",
        frameNumber: 8,
        skills: [
            { name: "Git & GitHub", level: 95 },
            { name: "Playwright", level: 78 },
            { name: "BeautifulSoup", level: 80 },
            { name: "Pydantic", level: 75 },
            { name: "ESLint", level: 85 },
        ]
    },
];

// Individual Film Frame Component
const FilmFrame = ({ frame, index }: { frame: SkillFrame; index: number }) => {
    return (
        <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            style={{ width: '260px' }}
        >
            {/* Film frame container */}
            <div
                className="relative mx-2 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, hsl(35, 20%, 18%) 0%, hsl(30, 18%, 12%) 100%)',
                    border: '3px solid hsl(35, 15%, 25%)',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 8px 25px rgba(0,0,0,0.4)',
                }}
            >
                {/* Frame number */}
                <div
                    className="absolute top-2 right-2 px-2 py-0.5 z-10"
                    style={{
                        background: 'hsl(45, 70%, 50%)',
                        fontFamily: '"Courier New", monospace',
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        color: '#000',
                    }}
                >
                    FR{String(frame.frameNumber).padStart(3, '0')}
                </div>

                {/* Header */}
                <div
                    className="px-3 pt-3 pb-2 text-center"
                    style={{ borderBottom: '1px solid hsl(35, 15%, 20%)' }}
                >
                    <h3
                        style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'hsl(45, 60%, 70%)',
                            letterSpacing: '0.12em',
                        }}
                    >
                        {frame.category}
                    </h3>
                    <p
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: '0.7rem',
                            fontStyle: 'italic',
                            color: 'hsl(35, 20%, 55%)',
                        }}
                    >
                        {frame.description}
                    </p>
                </div>

                {/* Skills */}
                <div className="p-3 space-y-2">
                    {frame.skills.map((skill, skillIndex) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
                        >
                            <div className="flex items-center justify-between mb-0.5">
                                <span
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: '0.75rem',
                                        color: 'hsl(40, 30%, 85%)',
                                    }}
                                >
                                    {skill.name}
                                </span>
                                <span
                                    style={{
                                        fontFamily: '"Playfair Display", serif',
                                        fontSize: '0.55rem',
                                        color: 'hsl(45, 50%, 60%)',
                                    }}
                                >
                                    {skill.level}%
                                </span>
                            </div>

                            {/* Skill bar */}
                            <div
                                className="relative h-2 overflow-hidden"
                                style={{
                                    background: 'hsl(30, 10%, 15%)',
                                    border: '1px solid hsl(35, 15%, 25%)',
                                }}
                            >
                                <motion.div
                                    className="h-full"
                                    style={{
                                        background: `linear-gradient(90deg, hsl(45, 70%, 45%) 0%, hsl(40, 60%, 55%) 100%)`,
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ delay: 0.5 + index * 0.1 + skillIndex * 0.05, duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Film grain texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay',
                    }}
                />
            </div>
        </motion.div>
    );
};

const SkillsScene = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [, setScrollX] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleScroll = () => setScrollX(el.scrollLeft);
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="w-full h-full flex flex-col p-4 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                background: 'radial-gradient(ellipse at center, hsl(42, 30%, 88%) 0%, hsl(38, 25%, 82%) 100%)',
            }}
        >
            {/* Film jitter */}
            <motion.div
                className="h-full flex flex-col"
                animate={{ x: [0, -0.2, 0.2, 0], y: [0, 0.2, -0.2, 0] }}
                transition={{ duration: 0.35, repeat: Infinity, repeatType: "mirror" }}
            >
                {/* Title */}
                <motion.div className="text-center mb-4 flex-shrink-0" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                        <span style={{ color: 'hsl(30, 20%, 40%)', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT VI ✦</span>
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                    </div>
                    <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, fontStyle: 'italic', color: 'hsl(25, 25%, 15%)', textShadow: '2px 2px 0 hsl(35, 20%, 70%)' }}>
                        Technical Skills
                    </h1>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.85rem', fontStyle: 'italic', color: 'hsl(30, 15%, 40%)' }}>
                        Scroll the film strip to explore →
                    </p>
                </motion.div>

                {/* Film Strip Container */}
                <div className="flex-1 relative min-h-0">
                    {/* Sprocket holes - Top */}
                    <div className="absolute top-0 left-0 right-0 h-5 flex justify-around items-center z-10" style={{ background: 'hsl(25, 15%, 15%)' }}>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`top-${i}`} className="w-3 h-2 rounded-sm" style={{ background: 'hsl(35, 20%, 85%)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }} />
                        ))}
                    </div>

                    {/* Scrollable Film Strip */}
                    <div
                        ref={scrollRef}
                        className="absolute left-0 right-0 overflow-x-auto overflow-y-hidden flex items-center"
                        style={{ top: '20px', bottom: '20px', background: 'hsl(30, 12%, 20%)', scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                    >
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        <div className="flex items-center py-3 px-3">
                            {/* Leader */}
                            <div className="flex-shrink-0 w-16 flex items-center justify-center" style={{ color: 'hsl(35, 20%, 40%)' }}>
                                <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem' }}>◄ START</span>
                            </div>

                            {/* Skill Frames */}
                            {skillFrames.map((frame, index) => (
                                <FilmFrame key={frame.category} frame={frame} index={index} />
                            ))}

                            {/* Tail */}
                            <div className="flex-shrink-0 w-16 flex items-center justify-center" style={{ color: 'hsl(35, 20%, 40%)' }}>
                                <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem' }}>END ►</span>
                            </div>
                        </div>
                    </div>

                    {/* Sprocket holes - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-5 flex justify-around items-center z-10" style={{ background: 'hsl(25, 15%, 15%)' }}>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`bottom-${i}`} className="w-3 h-2 rounded-sm" style={{ background: 'hsl(35, 20%, 85%)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }} />
                        ))}
                    </div>

                    {/* Fade edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-16 pointer-events-none z-20" style={{ background: 'linear-gradient(90deg, hsla(42, 30%, 88%, 0.9) 0%, transparent 100%)' }} />
                    <div className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none z-20" style={{ background: 'linear-gradient(270deg, hsla(42, 30%, 88%, 0.9) 0%, transparent 100%)' }} />
                </div>

                {/* Also Featuring section */}
                <motion.div className="mt-3 text-center flex-shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    <p className="mb-2" style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(30, 18%, 40%)' }}>
                        ★ ALSO FEATURING ★
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                        {['Pandas', 'Deep Learning', 'OCR', 'Gunicorn', 'Uvicorn', 'Cloudinary', 'React Router', 'Zod'].map((tool) => (
                            <span key={tool} className="px-2 py-0.5" style={{
                                fontFamily: '"Cormorant Garamond", serif', fontSize: '0.7rem',
                                border: '1px solid hsl(35, 20%, 55%)', color: 'hsl(25, 18%, 30%)', background: 'hsla(40, 25%, 92%, 0.6)'
                            }}>
                                {tool}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SkillsScene;
