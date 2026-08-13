import React, { useEffect, useState } from "react";
import "./LoadingScreen.scss";
import { motion } from "framer-motion";

const loadingSteps = [
  "📄 Reading your resume...",
  "💼 Understanding the job description...",
  "🧠 Analyzing your skills...",
  "⚙️ Identifying skill gaps...",
  "💻 Generating technical questions...",
  "🗣️ Creating behavioral questions...",
  "📅 Building your preparation roadmap...",
  "📊 Calculating match score...",
  "✨ Finalizing your interview strategy...",
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }

        return prev + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="ai-icon"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🤖
        </motion.div>

        <h1>Generating Your Interview Strategy</h1>

        <p>
          Our AI is analyzing your profile and preparing a personalized
          interview report.
        </p>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        <motion.div
          key={progress}
          className="progress-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {progress}%
        </motion.div>

        <motion.div
          key={loadingSteps[step]}
          className="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {loadingSteps[step]}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
