import React, { useState, useEffect } from "react";
import "./ResumeLoading.scss";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ResumeLoading = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Stop at 95%
        if (prev >= 95) return prev;

        // Distance remaining to 95%
        const remaining = 95 - prev;

        // Increase quickly at first, slower later
        const increment = Math.max(1, Math.ceil(remaining * 0.08));

        return Math.min(prev + increment, 95);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);
  const tasks = [
    "Building HTML",
    "Applying Typography",
    "Rendering PDF",
    "Preparing Download",
  ];
  return (
    <div className="resume-loading">
      <motion.div
        className="sparkle"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Sparkles size={70} />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
        Crafting Your Resume
      </motion.h1>

      <p>Creating a recruiter-ready PDF...</p>

      <div className="progress-wrapper">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>

          <div className="shine"></div>
        </div>
      </div>

      <motion.div
        className="percentage"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        {progress}%
      </motion.div>

      <div className="tasks">
        {tasks.map((task, index) => {
          const current = Math.floor(progress / 25);

          let icon = "○";

          if (index < current) icon = "✓";
          else if (index === current) icon = "⏳";

          return (
            <div key={task}>
              {icon} {task}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeLoading;
