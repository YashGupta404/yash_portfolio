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

const CertificationsScene = () => {
    const certifications = [
        {
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            description: "Validated expertise in AWS Cloud fundamentals, services, security, architecture, and pricing.",
            badge: "☁️",
            type: "Professional",
            featured: true,
        },
        {
            title: "Complete Data Science, ML, DL, NLP Bootcamp",
            issuer: "Udemy - Krish Naik",
            description: "Comprehensive training in Data Science, Machine Learning, Deep Learning, and NLP.",
            badge: "🤖",
            type: "Technical",
        },
        {
            title: "Generative AI with LangChain & Huggingface",
            issuer: "Udemy - Krish Naik",
            description: "Building Generative AI applications using LangChain and Huggingface models.",
            badge: "✨",
            type: "AI/ML",
        },
        {
            title: "The Complete 2024 Web Development Bootcamp",
            issuer: "Udemy - Dr. Angela Yu",
            description: "Full-stack development: HTML, CSS, JavaScript, React, Node.js, databases.",
            badge: "🌐",
            type: "Development",
        },
        {
            title: "JavaScript: From Zero to Expert",
            issuer: "Udemy - Jonas Schmedtmann",
            description: "JavaScript fundamentals, ES6+, OOP, async programming, and best practices.",
            badge: "⚡",
            type: "Development",
        },
    ];

    return (
        <motion.div
            className="w-full h-full flex flex-col p-5 relative overflow-auto"
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
                className="flex-1 flex flex-col max-w-5xl mx-auto w-full"
                animate={{ x: [0, -0.3, 0.3, 0], y: [0, 0.3, -0.3, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                        <span style={{ color: 'hsl(30, 20%, 40%)', fontSize: '0.9rem', fontFamily: '"Playfair Display", serif', letterSpacing: '0.2em' }}>✦ ACT IV ✦</span>
                        <div className="w-16 h-px" style={{ background: 'hsl(30, 20%, 35%)' }} />
                    </div>
                    <h1 style={{
                        fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700,
                        fontStyle: 'italic', color: 'hsl(25, 25%, 15%)', textShadow: '2px 2px 0 hsl(35, 20%, 70%)'
                    }}>
                        Certifications
                    </h1>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.85rem', fontStyle: 'italic', color: 'hsl(30, 15%, 40%)' }}>
                        Professional Credentials
                    </p>
                </motion.div>

                {/* AWS Highlight Card */}
                <motion.div
                    className="p-4 mb-4 flex items-center gap-4 relative"
                    style={{ background: 'linear-gradient(135deg, #ff9900 0%, #ff6600 100%)', boxShadow: '0 6px 25px rgba(255, 153, 0, 0.3)' }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-4xl">☁️</div>
                    <div className="flex-1">
                        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                            AWS Certified Cloud Practitioner
                        </h3>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                            Amazon Web Services | Cloud fundamentals, services, security & architecture
                        </p>
                    </div>
                    <div className="px-3 py-1 bg-white/20 text-xs font-bold text-white rounded">VERIFIED</div>
                </motion.div>

                {/* Other Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {certifications.slice(1).map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            className="p-4 flex items-start gap-3 relative"
                            style={{ background: 'hsla(40, 25%, 94%, 0.95)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                            initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <TornEdgeTop />
                            <TornEdgeBottom />
                            {/* Left torn edge */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{
                                background: 'linear-gradient(90deg, transparent 0%, hsla(40, 25%, 94%, 0.95) 100%)',
                                clipPath: 'polygon(100% 0, 100% 100%, 0 95%, 30% 85%, 10% 75%, 40% 65%, 20% 55%, 50% 45%, 15% 35%, 35% 25%, 5% 15%, 25% 5%)'
                            }} />
                            {/* Right torn edge */}
                            <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{
                                background: 'linear-gradient(270deg, transparent 0%, hsla(40, 25%, 94%, 0.95) 100%)',
                                clipPath: 'polygon(0 0, 0 100%, 100% 90%, 70% 80%, 90% 70%, 60% 60%, 80% 50%, 50% 40%, 85% 30%, 65% 20%, 95% 10%, 75% 0)'
                            }} />

                            <div className="text-2xl mt-1">{cert.badge}</div>
                            <div className="flex-1">
                                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.9rem', fontWeight: 700, color: 'hsl(25, 25%, 18%)' }}>
                                    {cert.title}
                                </h3>
                                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>
                                    {cert.issuer}
                                </p>
                                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.75rem', fontStyle: 'italic', color: 'hsl(28, 18%, 40%)', marginTop: '3px', lineHeight: 1.4 }}>
                                    {cert.description}
                                </p>
                            </div>
                            <span className="px-2 py-0.5 text-xs" style={{ background: 'hsl(35, 20%, 80%)', color: 'hsl(28, 20%, 35%)' }}>
                                {cert.type}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom ornament */}
                <motion.div className="mt-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    <span style={{ color: 'hsl(30, 20%, 45%)', fontSize: '1.2rem' }}>❧</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default CertificationsScene;
