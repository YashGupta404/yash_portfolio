import { motion } from 'framer-motion';

// Torn paper edge components
const TornEdgeTop = () => (
    <svg className="absolute -top-2 left-0 right-0 w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0,10 L0,5 Q5,8 10,4 Q15,7 20,3 Q25,6 30,5 Q35,8 40,4 Q45,6 50,5 Q55,7 60,4 Q65,8 70,5 Q75,6 80,4 Q85,7 90,5 Q95,8 100,4 L100,10 Z"
            fill="hsla(40, 25%, 94%, 0.95)" />
    </svg>
);

const TornEdgeBottom = () => (
    <svg className="absolute -bottom-2 left-0 right-0 w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0,0 L0,5 Q5,2 10,6 Q15,3 20,7 Q25,4 30,5 Q35,2 40,6 Q45,4 50,5 Q55,3 60,6 Q65,2 70,5 Q75,4 80,6 Q85,3 90,5 Q95,2 100,6 L100,0 Z"
            fill="hsla(40, 25%, 94%, 0.95)" />
    </svg>
);

const AchievementsScene = () => {
    const achievements = [
        {
            title: "Rank 1 - First Year",
            subtitle: "CSE Department, IEM Kolkata",
            description: "Secured highest rank among all first-year CSE students with exceptional academic performance.",
            icon: "🥇",
            year: "2024",
        },
        {
            title: "Rank 12 - Second Year",
            subtitle: "CSE Department, IEM Kolkata",
            description: "Maintained top academic standing, ranking among the top 15 students in the department.",
            icon: "🏅",
            year: "2025",
        },
        {
            title: "IELTS Best Sessional Paper",
            subtitle: "\"Anxiety Disorder and Stress Management\"",
            description: "Recognized for best research paper presentation in IELTS sessions on mental health awareness.",
            icon: "🏆",
            year: "2024",
        },
    ];

    return (
        <motion.div
            className="w-full h-full flex flex-col p-6 relative overflow-auto"
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
                className="flex-1 flex flex-col max-w-4xl mx-auto w-full"
                animate={{ x: [0, -0.3, 0.3, 0], y: [0, 0.3, -0.3, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                        <span style={{ color: 'hsl(30, 20%, 40%)', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT III ✦</span>
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                    </div>
                    <h1 style={{
                        fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700,
                        fontStyle: 'italic', color: 'hsl(25, 25%, 15%)', textShadow: '2px 2px 0 hsl(35, 20%, 70%)'
                    }}>
                        Achievements
                    </h1>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', fontStyle: 'italic', color: 'hsl(30, 15%, 30%)' }}>
                        Milestones & Recognition
                    </p>
                </motion.div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.title}
                            className="p-5 text-center relative"
                            style={{ background: 'hsla(40, 25%, 94%, 0.95)', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.15 }}
                        >
                            <TornEdgeTop />
                            <TornEdgeBottom />
                            {/* Left torn edge */}
                            <div className="absolute left-0 top-0 bottom-0 w-2" style={{
                                background: 'linear-gradient(90deg, transparent 0%, hsla(40, 25%, 94%, 0.95) 100%)',
                                clipPath: 'polygon(100% 0, 100% 100%, 0 95%, 30% 85%, 10% 75%, 40% 65%, 20% 55%, 50% 45%, 15% 35%, 35% 25%, 5% 15%, 25% 5%)'
                            }} />
                            {/* Right torn edge */}
                            <div className="absolute right-0 top-0 bottom-0 w-2" style={{
                                background: 'linear-gradient(270deg, transparent 0%, hsla(40, 25%, 94%, 0.95) 100%)',
                                clipPath: 'polygon(0 0, 0 100%, 100% 90%, 70% 80%, 90% 70%, 60% 60%, 80% 50%, 50% 40%, 85% 30%, 65% 20%, 95% 10%, 75% 0)'
                            }} />

                            {/* Year badge */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 z-10" style={{
                                background: '#d97706',
                                color: '#fff', fontFamily: '"Courier New", monospace', fontSize: '0.6rem', fontWeight: 700
                            }}>
                                {achievement.year}
                            </div>

                            {/* Icon */}
                            <motion.div className="text-4xl mb-3 mt-2" initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 300 }}>
                                {achievement.icon}
                            </motion.div>

                            {/* Title */}
                            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 700, color: 'hsl(25, 25%, 18%)', marginBottom: '4px' }}>
                                {achievement.title}
                            </h3>

                            {/* Subtitle */}
                            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.8rem', fontWeight: 600, color: '#d97706', marginBottom: '8px' }}>
                                {achievement.subtitle}
                            </p>

                            {/* Description */}
                            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.8rem', fontStyle: 'italic', color: 'hsl(28, 18%, 30%)', lineHeight: 1.5 }}>
                                {achievement.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom ornament */}
                <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <span style={{ color: 'hsl(30, 20%, 45%)', fontSize: '1.2rem' }}>❧</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AchievementsScene;
