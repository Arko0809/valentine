import { motion } from 'framer-motion';

const LoveMessage = () => {
  // Styles object
  const styles = {
    container: {
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #ffe8e8 0%, #fff6f6 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(255, 182, 193, 0.2)',
      position: 'relative',
      minHeight: '200px'
    },
    loveText: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.8rem',
      lineHeight: 1.6,
      color: '#4a4a4a',
      margin: '20px 0'
    },
    name: {
      fontFamily: '"Dancing Script", cursive',
      fontSize: '2.5rem',
      color: '#ff6b6b',
      textShadow: '2px 2px 4px rgba(255, 107, 107, 0.2)',
      display: 'inline-block',
      padding: '0 10px',
      background: 'linear-gradient(120deg, rgba(255, 229, 229, 0.8) 0%, rgba(255, 229, 229, 0) 100%)',
      borderRadius: '8px',
      transformOrigin: 'center'
    },
    revolutionText: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.5rem',
      color: '#ff8a8a',
      marginTop: '1rem',
      fontStyle: 'italic'
    },
    heart: {
      position: 'absolute',
      fontSize: '1.5rem',
      opacity: 0.6,
      userSelect: 'none',
      pointerEvents: 'none'
    }
  };

  // Create floating hearts at random positions
  const hearts = Array(6).fill('❤').map((heart, i) => ({
    id: i,
    style: {
      ...styles.heart,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
      animation: `float-${i} 3s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`
    }
  }));

  return (
    <motion.div
      style={styles.container}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Inject required fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@600&display=swap');
          
          ${hearts.map((heart, i) => `
            @keyframes float-${i} {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          `).join('\n')}
        `}
      </style>

      {hearts.map(heart => (
        <span
          key={heart.id}
          style={heart.style}
        >
          ❤
        </span>
      ))}
      
      <motion.p
        style={styles.loveText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.span
          style={styles.name}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Sayani Bagchi
        </motion.span>
        , you are the most beautiful person in the world
      </motion.p>
      
      <motion.p
        style={styles.revolutionText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Thank you for being in my life!
        <br />
        Long Live Revolution of Love!
      </motion.p>
    </motion.div>
  );
};

export default LoveMessage;