import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <motion.div
                className="gallery-grid"
                layout
            >
                <AnimatePresence>
                    {images.map((img) => (
                        <motion.div
                            key={img.path}
                            className="gallery-item"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img src={img.src} alt="Portfolio Item" loading="lazy" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage.src}
                            alt="Full Size"
                            className="lightbox-content"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
