import React, { useState, useEffect, useMemo } from 'react';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import Hero from './components/Hero';

// Dynamically import all images from src/image directory
const imageModules = import.meta.glob('/src/image/**/*.{png,jpg,jpeg,webp}', { eager: true });

function App() {
  const [currentCategory, setCategory] = useState('oru');

  // Process images into a usable format
  const allImages = useMemo(() => {
    return Object.entries(imageModules).map(([path, module]) => {
      // Extract category from path (e.g., /src/image/oru/file.png -> oru)
      const parts = path.split('/');
      // Assuming structure: /src/image/<category>/<filename>
      // parts might be ['', 'src', 'image', 'oru', 'file.png']
      const category = parts[parts.length - 2];
      return {
        path,
        src: module.default,
        category: category.toLowerCase()
      };
    });
  }, []);

  // Filter images based on current category
  const displayedImages = useMemo(() => {
    return allImages.filter(img => img.category === currentCategory);
  }, [allImages, currentCategory]);

  // Update body class for theming
  useEffect(() => {
    document.body.className = `theme-${currentCategory}`;
  }, [currentCategory]);

  const categories = [
    { id: 'oru', label: 'Oru' },
    { id: 'echo', label: 'Echo' },
    { id: 'etc', label: 'Etc' }
  ];

  return (
    <div className="container">
      <Hero />

      <Navigation
        categories={categories}
        currentCategory={currentCategory}
        setCategory={setCategory}
      />

      <Gallery images={displayedImages} />

      <footer style={{ marginTop: '4rem', padding: '2rem', opacity: 0.6, fontSize: '0.9em' }}>
        &copy; {new Date().getFullYear()} Oruga. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
