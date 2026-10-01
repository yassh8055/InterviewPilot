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

const genertePdf = async (htmlContent) => {
 const browser = await puppeteer.launch({
    headless: true
});
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4", margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  });

  await browser.close();
  return pdfBuffer;
};

const generateReumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of resume which can be converted to pdf using any library like puppeteer",
      ),
  });

  const prompt = `You are an expert resume writer, recruiter, and ATS optimization specialist.

Create a polished, truthful, job-targeted resume for the candidate using the information below.
Do not invent employers, job titles, dates, degrees, certifications, technologies, achievements,
metrics, or other facts. When information is missing, omit it rather than adding a placeholder
or making an assumption.

Candidate resume and experience:
${resume}

Candidate self-description:
${selfDescription}

Target job description:
${jobDescription}

Resume requirements:
- Tailor the professional summary, skills, and experience to the target role.
- Prioritize relevant experience and use concise, achievement-focused bullet points.
- Use keywords from the job description naturally and accurately for ATS compatibility.
- Preserve the candidate's actual level of experience; do not exaggerate seniority.
- Use a clean single-column layout that is easy to scan and prints well on A4 pages.
- Include appropriate sections such as name/contact information, summary, skills, experience,
  projects, education, certifications, and achievements when supported by the source data.
- Use semantic HTML5 elements and inline CSS only. Do not use JavaScript, external assets,
  external fonts, images, SVGs, forms, markdown, or explanatory text outside the resume.
- Make the HTML self-contained and suitable for direct use with Puppeteer's page.setContent().
- Ensure readable typography, consistent spacing, strong section hierarchy, and print-friendly
  colors. Use page-break rules where helpful, but do not force unnecessary blank pages.

Return only a valid JSON object with exactly one property named "html". Its value must be a
complete self-contained HTML document beginning with <!DOCTYPE html>. Escape all characters as
needed so the response is valid JSON. Do not wrap the JSON in Markdown code fences.`;

  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(resumePdfSchema),
    },
  });
  const jsonContent = JSON.parse(response.output_text);
  const pdfBuffer = await genertePdf(jsonContent.html);

  return pdfBuffer;
};
module.exports = { generateInterviewReport, generateReumePdf };