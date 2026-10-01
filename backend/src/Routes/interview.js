const express = require("express");
const { authUser } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileMiddleware");
const {
  getAllinterviewReportsController,
  generateInterviewReportController,
  interviewReportByIdController,
  generateReumePdfController
} = require("../controllers/interviewController");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/generate
 * @description generate new interview report on the basis of user self description, resume Pdf, job description
 * @access private
 */
interviewRouter.post(
  "/generate",
  authUser,
  upload.single("resumeFile"),
  generateInterviewReportController,
);

/**
 * @route POST /api/interview/report/:interviewId
 * @description get interview report by interview Id
 * @access private
 */
interviewRouter.post(
  "/report/:interviewId",
  authUser,
  interviewReportByIdController,
);

/**
 * @route POST /api/interview/
 * @description get all interview report of logged in user
 * @access private
 */
interviewRouter.post("/", authUser, getAllinterviewReportsController);

/**
 * @route POST /api/interview/resume/pdf
 * @description generate new resume pdf on the basis of user self description, resume Pdf, job description
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateReumePdfController)

module.exports = interviewRouter;
