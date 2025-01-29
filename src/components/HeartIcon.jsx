import { useState } from 'react';
import { Heart as HeartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const HeartIconComponent = ({ initialState }) => {
  const [isLiked, setIsLiked] = useState(initialState);

  const handleToggle = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <motion.div
      className="heart-icon"
      onClick={handleToggle}
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <HeartIcon
          size={24}
          color={isLiked ? 'red' : 'white'}
          fill={isLiked ? 'red' : 'none'}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeartIconComponent;
