const mongoose = require("mongoose");

/**
 * - job description schema : String
 * - resume text: String
 * - self description: String
 *
 * - matchScore: number
 *
 * - Technical ques:
 *          [{
 *          question: "",
 *          intention: "",
 *          answer: "",
 *          }]
 * - Behavioural ques:
 *          [{
 *          question: "",
 *          intention: "",
 *          answer: "",
 *          }]
 * - Skill gaps:
 *          [{
 *          skill: "",
 *          severity: {
 *          type: String,
 *          enum: ["low", "medium", "high"]
 *          }
 *          }]
 * - Preparation plan:
 *          [{
 *          day: Number,
 *          focus: String,
 *          tasks: [String]
 *          }]
 */

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required"],
    },
  },
  {
    _id: false,
  },
);

const behaviouralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "task is required"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = new mongoose.model(
  "interviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
