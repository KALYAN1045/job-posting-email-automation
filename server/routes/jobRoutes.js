const express = require("express");
const nodemailer = require("nodemailer");
const Job = require("../models/JobModel");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/jobs", async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

  try {
    const candidateEmails = Array.isArray(candidates) ? candidates : [candidates];
    const job = new Job({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates: candidateEmails,
      endDate,
    });

    await job.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: candidateEmails.join(", "),
      subject: `Exciting New Career Opportunity: ${jobTitle}`,
      text: `Dear Candidate,

    We are pleased to inform you about a new career opportunity for the position of ${jobTitle} at our organization. We believe your skills and experience could be a valuable addition to our team.

    Position Details:
    - Job Title: ${jobTitle}
    - Description: ${jobDescription}
    - Experience Level Required: ${experienceLevel}
    - Application Deadline: ${endDate}

    If you're looking for a new challenge and an opportunity to grow your career, we would love to hear from you. Please review the job description and submit your application by the deadline.

    We look forward to potentially welcoming you to our team.

    Best regards,
    Cuvette Team`,
  };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Job created and emails sent!" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;