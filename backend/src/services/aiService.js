const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateWithGemini = async (prompt) => {
  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(interviewReportSchema),
    },
  });
  return response.output_text;
}

const generateWithGroq = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    max_completion_tokens: 8192,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "interview_report",
        strict: true,
        schema: z.toJSONSchema(interviewReportSchema),
      },
    },
  });

  return response.choices[0].message.content;
};

const generateAIResponse = async (prompt) => {
  try {
    return await generateWithGroq(prompt);
  } catch (error) {
    console.error("Groq failed:", error.message);
    return await generateWithGemini(prompt);
  }
};

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
            "A concise interview answer framework in 3 to 5 sentences. Include the key concept, one relevant candidate experience or project example when applicable, and an important implementation detail or trade-off.",
          ),
      }),
    )
    .length(8)
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
            "A concise STAR-method answer outline in 3 to 5 sentences covering situation, task, action, result, and lesson. Use only information supported by the candidate's experience.",
          ),
      }),
    )
    .length(5)
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
          .enum(["low", "medium", "high"])
          .describe(
            "How strongly this gap affects job readiness. Return only one of: low, medium, or high.",
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
            "The preparation day number, starting at 1 and increasing sequentially.",
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
    .length(7)
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

  const responseText = await generateAIResponse(prompt);

  const result = interviewReportSchema.parse(
    JSON.parse(responseText)
  );

  return result;
};


//HTML generation for pdf 

const genertePdf = async (htmlContent) => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "12mm",
      bottom: "12mm",
      left: "14mm",
      right: "14mm",
    },
  });

  await browser.close();
  return pdfBuffer;
};


const resumePdfSchema = z.object({
  html: z
    .string()
    .describe(
      "The HTML content of resume which can be converted to pdf using any library like puppeteer",
    ),
});

const generateResumeHtmlWithGroq = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    max_completion_tokens: 8192,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resume_pdf",
        strict: true,
        schema: z.toJSONSchema(resumePdfSchema),
      },
    },
  });

  return response.choices[0].message.content;
};

const generateResumeHtmlWithGemini = async (prompt) => {
  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(resumePdfSchema),
    },
  });

  return response.output_text;
};


const generateResumeHtml = async (prompt) => {
  try {
    console.log("PDF AI Provider: Groq");

    return await generateResumeHtmlWithGroq(prompt);
  } catch (error) {
    console.error("Groq PDF generation failed:", error.message);
    console.log("Falling back to Gemini...");

    return await generateResumeHtmlWithGemini(prompt);
  }
};

const generateReumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {

  const cleanResume = resume.replace(/\\n/g, "\n");
  const cleanSelfDescription = selfDescription.replace(/\\n/g, "\n");
  const cleanJobDescription = jobDescription.replace(/\\n/g, "\n");


  const prompt = `
You are an expert resume strategist, recruiter, ATS optimization specialist,
and professional resume designer.

Your task has TWO responsibilities:

1. Analyze the candidate against the target job description and create a
   genuinely job-targeted resume.
2. Render that tailored resume as polished, professional HTML/CSS.

Do NOT simply reformat or copy the candidate's existing resume.
Before generating the HTML, internally compare the original resume and
target job description and determine what should be emphasized, rewritten,
condensed, or removed. Do not expose this analysis in the final output.

====================
CANDIDATE RESUME
====================
${resume}

====================
SELF DESCRIPTION
====================
${selfDescription}

====================
TARGET JOB DESCRIPTION
====================
${jobDescription}

====================
TAILORING PROCESS
====================

First analyze the target job requirements against the candidate's actual
skills, projects, education, and experience.

Identify:
- The most relevant skills the candidate already possesses.
- The candidate's projects or experience that best demonstrate those skills.
- Skills mentioned in the job description that the candidate does NOT
  demonstrate.
- Information in the existing resume that is less relevant to this role.

Then rewrite the resume specifically for this job.

IMPORTANT TRUTHFULNESS RULES:

- Never invent experience.
- Never invent employers.
- Never invent job titles.
- Never invent certifications.
- Never invent technologies.
- Never invent achievements.
- Never invent metrics.
- Never claim the candidate has a skill simply because it appears
  in the job description.
- Only use information supported by the candidate's resume or
  self-description.

RELEVANCE RULES:

- Rewrite the professional summary specifically for the target role.
- Prioritize skills relevant to the target job.
- Reorder skills based on relevance.
- Rewrite project descriptions to emphasize genuinely relevant
  functionality and technologies.
- Rewrite bullet points instead of blindly copying them.
- Condense irrelevant information.
- Remove redundant information.
- Use terminology from the job description only when it accurately
  describes the candidate's existing experience.
- Do not turn unrelated experience into relevant experience.
- Preserve the candidate's actual experience level.

For example, if the job description requires cybersecurity but the candidate
only demonstrates authentication, JWT, protected routes, and API security,
you may emphasize those existing security-related experiences.

You must NOT add SIEM, penetration testing, incident response, vulnerability
assessment, or other cybersecurity technologies unless they are actually
supported by the candidate's information.

====================
RESUME STRUCTURE
====================

Use the sections that are supported by the candidate's information:

- Header
- Professional Summary
- Technical Skills
- Experience
- Projects
- Education
- Certifications
- Achievements

Do not create empty sections.

====================
DESIGN
====================

Create a professional modern single-column resume.

Requirements:

- 1 page when the relevant information naturally fits.
- Maximum 2 pages when necessary.
- Never create a third page.
- Strong visual hierarchy.
- Clear section headings.
- Compact professional spacing.
- Readable typography.
- Good use of whitespace.
- Consistent alignment.
- Professional bullet points.
- ATS-friendly structure.
- No unnecessary decorative elements.
- No tables for layout.
- No sidebar.
- No excessive colors.
- No images.
- No SVG.
- No external assets.
- No external fonts.
- No JavaScript.

Use semantic HTML5.

Put all CSS inside a single <style> element.

The HTML must be completely self-contained and directly usable with:

page.setContent()

Do not output Markdown.

Do not output explanations.

Do not output anything outside the required JSON response.

The final result must look like a professionally designed resume,
not like raw text converted into HTML.

Return the result using the provided JSON schema.
`;
  // const response = await ai.interactions.create({
  //   model: "gemini-3.6-flash",
  //   input: prompt,
  //   response_format: {
  //     type: "text",
  //     mime_type: "application/json",
  //     schema: z.toJSONSchema(resumePdfSchema),
  //   },
  // });
  // const jsonContent = JSON.parse(response.output_text);
  // const pdfBuffer = await genertePdf(jsonContent.html);

  // return pdfBuffer;

  const responseText = await generateResumeHtml(prompt);

  const jsonContent = resumePdfSchema.parse(
    JSON.parse(responseText)
  );

  const pdfBuffer = await genertePdf(jsonContent.html);

  return pdfBuffer;
};
module.exports = { generateInterviewReport, generateReumePdf };