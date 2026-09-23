const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/aiService");
const interviewReportModel = require("../models/interviewReport");

const generateInterviewReportController = async (req, res) => {
  const resumeContent = new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;
  const result = await generateInterviewReport(
    resumeContent.text,
    selfDescription,
    jobDescription,
  );
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription: selfDescription,
    jobDescription: jobDescription,
    ...result,
  });

  res.status(201).json({
    message: "interview report generated successfully",
    interviewReport,
  });
};

const interviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(401).json({
      message: "Interview report not found",
    });
  }

  return res.status(200).json({
    message: "Interview report fetched Successfully",
    interviewReport,
  });
};

const getAllinterviewReportsController = async (req, res) => {
  const interviewReport = await interviewReportModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGaps -preparationPlan ",
    );
  return res.status(200).json({
    message: "Interview report fetched Successfully",
    interviewReport,
  });
};

exports.generateInterviewReportController = generateInterviewReportController;
exports.interviewReportByIdController = interviewReportByIdController;
exports.getAllinterviewReportsController = getAllinterviewReportsController;
