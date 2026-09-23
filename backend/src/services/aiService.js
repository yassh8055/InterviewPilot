const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidates profile match the job description",
    ),
  technicalQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A role-specific technical interview question based on the candidate's resume and the job requirements.",
          ),
        intention: z
          .string()
          .describe(
            "What competency, skill, or depth of understanding the interviewer is evaluating with this question.",
          ),
        answer: z
          .string()
          .describe(
            "A concise answer framework tailored to the candidate: key concepts to mention, a relevant experience or project example, and a practical implementation or trade-off.",
          ),
      }),
    )
    .describe(
      "Exactly 8 technical questions covering the most important required skills, including both strengths to validate and skill gaps to prepare for.",
    ),
  behavioralQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A behavioral interview question relevant to the role, preferably answerable using the candidate's listed experience or projects.",
          ),
        intention: z
          .string()
          .describe(
            "The workplace behavior or competency being assessed, such as collaboration, ownership, communication, prioritization, or problem solving.",
          ),
        answer: z
          .string()
          .describe(
            "A tailored STAR-method answer outline: situation, task, actions, measurable result, and the lesson or value demonstrated.",
          ),
      }),
    )
    .describe(
      "Exactly 5 behavioral questions that assess the role's most relevant non-technical competencies.",
    ),
  skillGap: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "A specific job requirement that is missing from, weakly evidenced by, or less developed in the candidate's resume and self-description.",
          ),
        severity: z
          .string()
          .describe(
            "How strongly this gap affects job readiness. Return only one of: low, Medium, or high.",
          ),
      }),
    )
    .describe(
      "A prioritized list of real skill gaps only. Do not list skills clearly demonstrated by the candidate.",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The preparation day number as a string, starting at 1 and increasing sequentially.",
          ),
        focus: z
          .string()
          .describe(
            "The primary interview topic, skill gap, or practice objective for that day.",
          ),
        tasks: z
          .string()
          .describe(
            "Concrete, achievable preparation tasks for the day, including what to study, build, practice, or review.",
          ),
      }),
    )
    .describe(
      "A practical 7-day preparation plan that prioritizes high-severity gaps, role requirements, interview practice, and final review.",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

const generateInterviewReport = async (
  resume,
  selfDescription,
  jobDescription,
) => {
  const prompt = `Generate a interview report for a condidate with the following details:
                  resume : ${resume}
                  Self description : ${selfDescription}
                  job description : ${jobDescription}`;

  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(interviewReportSchema),
    },
  });
  const result = interviewReportSchema.parse(JSON.parse(response.output_text));
  return result;
};


module.exports = generateInterviewReport;
