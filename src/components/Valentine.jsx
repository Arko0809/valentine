import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import HeartIconComponent from "./HeartIcon";
import LoveMessage from "./LoveMessage";
import img1 from "../assets/mem1.jpg";
import img2 from "../assets/mem2.jpg";
import img3 from "../assets/mem3.jpg";
import img4 from "../assets/mem4.jpg";
import img5 from "../assets/mem5.jpg";
import img6 from "../assets/mem6.jpg";
import img7 from "../assets/mem7.jpg";
import "./ValentineApp.css";
import TaylorScene from "./Taylor";
import AudioToggleButton from "./Audio";

const ValentineApp = () => {
  const [activeSection, setActiveSection] = useState("home");
  const images = [img1, img2, img3, img4, img5, img6, img7];

  const pageVariants = {
    initial: { opacity: 0, x: "-100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100%" },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const sections = {
    home: (
      <motion.div
        key="home"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="home-section"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LoveMessage />
        </motion.p>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TaylorScene />
        </motion.div>
      </motion.div>
    ),
    memories: (
      <motion.div
        key="memories"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="memories-section"
      >
        <div className="memories-grid-container">
          <div className="memories-grid">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <motion.div key={num} style={{ position: "relative" }}>
                <motion.img
                  whileHover={{
                    scale: 1.1, // Slightly increase size
                    rotate: -3, // Small rotation on hover
                    opacity: 0.9, // Slight fade out effect
                    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)", // Soft shadow to give depth
                    transition: {
                      scale: { type: "spring", stiffness: 200, damping: 25 },
                      rotate: { type: "spring", stiffness: 100, damping: 20 },
                      opacity: { duration: 0.3 },
                      boxShadow: {
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.9 }}
                  src={images[num - 1]}
                  alt={`Memory ${num}`}
                />
                <HeartIconComponent initialState={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    ),
  };

  return (
    <div>
      <div className="valentine-app">
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}>

          {Object.keys(sections).map((section) => (
            <motion.button
              key={section}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={activeSection === section ? "active" : ""}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </motion.nav>
        <AnimatePresence mode="wait">{sections[activeSection]}</AnimatePresence>
      </div>
      <AudioToggleButton />
    </div>
  );
};

export default ValentineApp;
