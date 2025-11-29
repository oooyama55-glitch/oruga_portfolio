import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import hero images
const heroModules = import.meta.glob('/src/assets/hero/*.{png,jpg,jpeg,webp}', { eager: true });
const heroImages = Object.values(heroModules).map(module => module.default);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-container">
            <AnimatePresence mode='popLayout'>
                <motion.img
                    key={currentIndex}
                    src={heroImages[currentIndex]}
                    alt="Hero Background"
                    className="hero-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                />
            </AnimatePresence>

            <div className="hero-overlay">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="hero-content"
                >
                    <h1 className="hero-title">Oruga Portfolio</h1>
                    <p className="hero-subtitle">AI Illustration Gallery</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
