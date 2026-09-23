export const data = ()=>{
  return {
  
  jobDescription: 'Job Title: Full-Stack JavaScript Developer\r\nLocation: Bengaluru, India (Hybrid)\r\nExperience: 2-4 years\r\n\r\nAbout the role\r\nWe are looking for a Full-Stack JavaScript Developer to build and maintain web applications used by customers and internal teams. You will work closely with product, design, and engineering to deliver polished frontend experiences and reliable backend services.\r\n\r\nResponsibilities\r\n- Build accessible, responsive user interfaces using React and modern JavaScript or TypeScript.\r\n- Design, implement, document, and maintain RESTful APIs with Node.js and Express.\r\n- Create and optimize MongoDB or PostgreSQL data models and queries.\r\n- Implement authentication, authorization, validation, error handling, and secure API practices.\r\n- Write maintainable tests and participate in code reviews, sprint planning, and technical discussions.\r\n- Debug production issues and improve application performance and observability.\r\n\r\nRequired qualifications\r\n- 2+ years of professional or equivalent project experience with JavaScript.\r\n- Strong knowledge of React, Node.js, Express, HTML, CSS, and REST API design.\r\n- Experience with MongoDB or PostgreSQL and Git-based collaboration.\r\n- Familiarity with JWT authentication and common web security practices.\r\n- Clear written and verbal communication and a willingness to learn.\r\n\r\nNice to have\r\n- TypeScript, Redux Toolkit, Docker, CI/CD, cloud deployment, or automated testing experience.\r\n- Experience integrating AI APIs or building SaaS dashboard products.',
  selfDescription: 'I am a full-stack JavaScript developer with a practical, product-oriented mindset. I enjoy taking a feature from a rough requirement through UI implementation, API design, database modeling, and deployment. My strongest skills are React, Node.js, Express, and MongoDB, and I am actively improving my TypeScript, testing, system-design, and cloud deployment skills.\r\n\r\nI value readable code, thoughtful error handling, and clear communication with teammates. In my recent work, I built protected user flows, REST APIs, and responsive dashboards. I am looking for a role where I can contribute to a collaborative engineering team, learn from code reviews, and grow into owning larger full-stack features.',
  matchScore: '78',
  technicalQuestion: [
    {
      question: 'How would you design and secure an Express.js backend authentication flow using JWTs, including handling token expiration and sensitive route protection?',
      intention: 'Evaluates practical knowledge of backend security, authentication middleware, standard HTTP status codes, and protected API routes.',
      answer: 'Framework: Explain issuing a short-lived access token and a secure HTTP-only refresh token upon login. Mention custom Express authorization middleware that extracts and verifies the bearer token from headers. Highlight returning 401 Unauthenticated vs 403 Forbidden properly, and using libraries like jsonwebtoken and bcrypt for password hashing.'
    },
    {
      question: 'In React, how do you manage state for complex, interactive dashboards to prevent unnecessary re-renders and maintain readable code?',
      intention: 'Assesses React performance optimization, component architecture, and proper state management strategies.',
      answer: 'Framework: Discuss splitting state locally vs globally, using React Context or Redux Toolkit for cross-component data, and leveraging useMemo and useCallback for expensive calculations or callback props. Mention using React Query or SWR for server state caching and optimistic UI updates.'
    },
    {
      question: 'When designing a database schema in MongoDB for a user dashboard with metrics and activity logs, how do you decide between embedding vs referencing documents?',
      intention: 'Tests database modeling intuition, query optimization, and understanding of MongoDB performance trade-offs.',
      answer: 'Framework: Explain embedding documents for 1-to-few relationships with bounded growth (e.g., user profile settings) to minimize lookup operations. Recommend referencing ($lookup or separate queries) for 1-to-many or unbounded datasets (e.g., activity logs) to avoid hit limits on document size (16MB) and prevent poor write performance.'
    },
    {
      question: 'Since you are actively learning TypeScript, how would you define types for an Express API endpoint handling a user update request, including custom middleware props?',
      intention: 'Validates candidate\'s current progress and practical implementation capability with TypeScript in full-stack Node.js development.',
      answer: 'Framework: Describe extending Express Request interface using declaration merging or generic Request handlers (e.g., Request<Params, ResBody, ReqBody, Query>). Mention defining explicit interface/type models for the user payload and attaching typed properties (like `req.user`) in custom middleware.'
    },
    {
      question: 'How do you implement robust, centralized error handling in an Express application to ensure sensitive details aren\'t leaked to clients?',
      intention: 'Evaluates production readiness, code quality, error handling standards, and backend security hygiene.',
      answer: 'Framework: Describe implementing custom Error classes and a global error-handling middleware `(err, req, res, next)`. Mention logging operational errors with severity levels using tools like Winston/Pino, masking internal database stack traces in production, and returning standardized JSON response shapes.'
    },
    {
      question: 'How would you set up automated unit and integration tests for a full-stack feature (e.g., React form submission connected to an Express endpoint)?',
      intention: 'Assesses testing knowledge and practical familiarity with tools like Jest, React Testing Library, and Supertest.',
      answer: 'Framework: For frontend, write component tests with React Testing Library mocking API responses using MSW (Mock Service Worker) to verify UI interactions and validation messages. For backend, write integration tests with Supertest and Jest against Express endpoints, testing success and error scenarios with an isolated test database.'
    },
    {
      question: 'What measures do you take on both the React frontend and Node/Express backend to protect against common web security vulnerabilities like XSS and NoSQL injection?',
      intention: 'Tests fundamental understanding of full-stack web security best practices.',
      answer: 'Framework: For XSS, rely on React\'s automatic JSX escaping, avoid `dangerouslySetInnerHTML`, and set HTTP-only flags on cookies. For NoSQL injection, sanitize request bodies using libraries like `express-mongo-sanitize` or schema validators (Zod/Joi) to prevent passing raw query objects.'
    },
    {
      question: 'Explain how the Node.js event loop handles asynchronous operations (like DB queries or HTTP calls) without blocking execution.',
      intention: 'Evaluates core JavaScript and Node.js runtime mechanics.',
      answer: 'Framework: Detail the event loop phases (Timers, Poll, Check) and libuv worker pool. Explain that non-blocking asynchronous I/O calls offload execution to system threads, returning execution to the main thread via callbacks placed in the Microtask queue (Promises) or Macrotask queue.'
    }
  ],
  behavioralQuestion: [
    {
      question: 'Describe a time you received constructive feedback during a code review. How did you react and what changes did you make?',
      intention: 'Assesses open-mindedness, team collaboration, coachability, and commitment to code quality.',
      answer: 'Framework: (STAR) Situation: Submitted a pull request for an API endpoint that worked but lacked pagination. Task: Address reviewer comments about potential DB performance degradation. Action: Welcomed the feedback, refactored the query to use cursor-based pagination, and added unit tests. Result: Improved endpoint scalability and established a pattern used by the team. Lesson: Prioritize team standards and long-term maintainability over quick code merging.'
    },
    {
      question: 'Can you give an example of a feature you took from an ambiguous requirement through UI, API, database, to deployment?',
      intention: 'Evaluates end-to-end product ownership, task breakdown, and communication skills.',
      answer: 'Framework: (STAR) Situation: Product manager requested an analytics dashboard feature without exact API specs. Task: Take full ownership from UI mockups to backend data pipelines. Action: Defined backend contract endpoints, designed Mongo schemas, built responsive React charts, and coordinated feedback loops with stakeholders. Result: Delivered the feature on time with positive user feedback. Lesson: Early communication and defining clear API contracts save significant refactoring time.'
    },
    {
      question: 'Tell me about a situation where you had to debug a difficult issue in production or a complex bug late in a project.',
      intention: 'Evaluates problem-solving methodology, composure under pressure, and debugging skills.',
      answer: 'Framework: (STAR) Situation: Intermittent 500 errors occurring on user dashboard login. Task: Diagnose and resolve the issue quickly without affecting live users. Action: Checked server logs, identified an unhandled rejection in JWT verification under specific token formatting, added defensive error boundaries and middleware fallbacks. Result: Zero downtime fix deployed and added regression tests. Lesson: Systematic log investigation is crucial for transient bugs.'
    },
    {
      question: 'How do you prioritize trade-offs between delivering a feature quickly versus writing clean, fully-tested code?',
      intention: 'Assesses practical engineering judgment, business awareness, and technical balance.',
      answer: 'Framework: (STAR) Situation: Tight deadline to ship a critical feature for an upcoming release. Task: Decide how to handle edge cases and test coverage within time limits. Action: Built the core MVP path with robust error handling and critical integration tests; documented tech debt and created backlog tickets for lower-priority edge-case refactoring. Result: Met release deadline while maintaining core quality. Lesson: Maintain non-negotiable core quality standards while pragmatically deferring optional features.'
    },
    {
      question: 'Give an example of a new tool or technology (e.g., TypeScript or Docker) you adopted recently. How did you learn it and apply it to your project?',
      intention: 'Evaluates self-directed learning, growth mindset, and practical application of new technologies.',
      answer: 'Framework: (STAR) Situation: Recognized a need to reduce runtime errors and improve codebase self-documentation. Task: Learn TypeScript fundamentals and migrate existing JavaScript modules. Action: Spent time learning type definitions, generics, and migration strategies via tutorials and docs, then converted an isolated utility module first. Result: Reduced runtime type bugs and improved DX in code reviews. Lesson: Incremental adoption makes learning new tech manageable in active codebases.'
    }
  ],
  skillGap: [
    {
      skill: 'Automated Unit & Integration Testing (Jest, React Testing Library, Supertest)',
      severity: 'high'
    },
    {
      skill: 'Production TypeScript Experience (Strict typing, Express & React generics)',
      severity: 'Medium'
    },
    {
      skill: 'Relational Database Concepts & PostgreSQL SQL Querying',
      severity: 'Medium'
    },
    {
      skill: 'Containerization & CI/CD Pipelines (Docker, GitHub Actions, Cloud deployment basics)',
      severity: 'low'
    }
  ],
  preparationPlan: [
    {
      day: ('1'),
      focus: 'React Architecture & Performance Optimization',
      tasks: 'Review React hooks (`useMemo`, `useCallback`, `useReducer`), Context API, state management patterns, and performance tools (React Profiler, memoization).'
    },
    {
      day: ('2'),
      focus: 'Node.js & Express REST API Mastery',
      tasks: 'Practice building modular REST APIs in Express. Implement JWT auth middleware, input validation with Zod/Joi, rate limiting, and standard error handling patterns.'
    },
    {
      day: ('3'),
      focus: 'MongoDB & PostgreSQL Data Modeling',
      tasks: 'Practice MongoDB schema design (embedding vs referencing) and aggregation pipelines. Review basic SQL queries, joins, and indexing concepts in PostgreSQL.'
    },
    {
      day: ('4'),
      focus: 'TypeScript Integration in React & Node',
      tasks: 'Convert a small JS Express API and React component to TypeScript. Define custom types/interfaces for API requests, generic components, and custom hooks.'
    },
    {
      day: ('5'),
      focus: 'Automated Testing Practice',
      tasks: 'Write Jest and React Testing Library tests for React components. Write backend API integration tests using Jest and Supertest for Express endpoints.'
    },
    {
      day: ('6'),
      focus: 'System Design, Web Security & CI/CD Basics',
      tasks: 'Study basic web security (XSS, CSRF, NoSQL injection, CORS). Review Docker containerization basics and CI/CD concepts with GitHub Actions.'
    },
    {
      day: ('7'),
      focus: 'Mock Interview & STAR Behavioral Prep',
      tasks: 'Conduct a timed mock technical interview. Practice delivering concise STAR framework answers for behavioral questions and reviewing full-stack project trade-offs.'
    }
  ],
  user: ('6aa90b87e535df7fe1a48b92'),
  createdAt: ('2026-09-17T12:40:23.689Z'),
  updatedAt: ('2026-09-17T12:40:23.689Z'),
  __v: ('0')
}
}