import React, { useState } from "react";
import "../styles/Landing.scss";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";

const cards = [
  {
    title: "Match Score",
    value: "94%",
  },
  {
    title: "Resume Analysis",
    value: "Completed",
  },
  {
    title: "Technical Questions",
    value: "Generated",
  },
  {
    title: "Behavioral Questions",
    value: "Ready",
  },
  {
    title: "Skill Gap Analysis",
    value: "Completed",
  },
  {
    title: "Roadmap",
    value: "7 Days Plan",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  return (
    <div
      className="landing"
      onMouseMove={(e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div
        className="mouse-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      <div className="landing-container">
        {/* LEFT */}

        <motion.div
          className="left"
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <motion.div
            className="logo"
            animate={{
              rotate: [0, 4, -4, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Sparkles />

            <span>PrepAI</span>
          </motion.div>

          <h1>
            <Typewriter
              words={["Hello! 👋", "Welcome to PrepAI."]}
              loop={1}
              cursor
            />
          </h1>

          <p>
            Your AI-powered interview companion.
            <br />
            <br />
            Upload your resume. Paste your job description. Let AI build your
            personalized interview strategy in seconds.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Account
            </button>

            <button
              className="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <div className="right">
          {cards.map((card, index) => (
            <motion.div
              className="card"
              key={card.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
            >
              <h3>{card.title}</h3>

              <span>{card.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
