import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ categories, currentCategory, setCategory }) => {
  return (
    <nav style={{ marginBottom: '2rem' }}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={currentCategory === cat.id ? 'active' : ''}
          onClick={() => setCategory(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
