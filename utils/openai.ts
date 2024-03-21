import { JobSeeker } from "@/server";
import { OpenAI } from "openai";
export const openai = new OpenAI();



const systemContent = `Task: Match Resume to Job Posting

Description:
You will be provided with a resume in HTML string format and a job posting. Your task is to develop a model that can accurately match the resume to the appropriate job posting based on the candidate's qualifications and the requirements outlined in the job posting.

Instructions:
1. Input:
   - Resume: The resume will be provided as an HTML string. It contains information about the candidate's qualifications, skills, work experience, education, and other relevant details.
   - Job Posting: The job posting contains details about the job role, responsibilities, required qualifications, skills, and any other specific requirements.

2. Output:
   - Match Score: Output a match score indicating the degree of similarity between the resume and the job posting. The match score should reflect how well the candidate's qualifications align with the job requirements.
   - Match Confidence: Additionally, provide a match confidence score to indicate the level of confidence in the match score prediction.

3. Evaluation:
   - Evaluate the model's performance using appropriate metrics such as accuracy, precision, recall, and F1 score. Use a labeled dataset with resumes and corresponding job postings for evaluation.

4. Example:
   - Given a resume and a job posting:
     - Resume:
       (HTML string representing the candidate's qualifications)
     - Job Posting:
       (Text describing the job role, responsibilities, and requirements)
   - Model Output:
     - Match Score: 0.82
     - Match Confidence: High

5. Submission:
   - Submit the trained model along with the code used for training and evaluation. Provide clear documentation on how to use the model for matching resumes to job postings.

Note: Consider preprocessing the resume and job posting data to extract relevant information and features before training the model. Explore different machine learning or natural language processing techniques to improve the model's performance.
`

const  promptTemplate = `### Instructions ###` + `\n\n${systemContent}`;

const inputTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
</head>
<body>
    <h1>John Doe</h1>
    <h2>Software Engineer</h2>
    <p>Email: john.doe@example.com</p>
    <p>Phone: 123-456-7890</p>
    <h3>Summary:</h3>
    <p>Highly skilled software engineer with 5+ years of experience in full-stack web development. Proficient in JavaScript, React, Node.js, and SQL. Strong problem-solving abilities and a passion for creating innovative solutions.</p>
    <h3>Education:</h3>
    <p>Bachelor of Science in Computer Science, XYZ University, 2015</p>
    <h3>Experience:</h3>
    <p>Senior Software Engineer, ABC Tech, 2018 - Present</p>
    <p>Software Engineer, XYZ Solutions, 2015 - 2018</p>
    <h3>Skills:</h3>
    <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>SQL</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Git</li>
    </ul>
</body>
</html>
`

const jobListing = [`Title: Full-stack Web Developer

Responsibilities:
- Develop and maintain web applications using modern technologies.
- Collaborate with cross-functional teams to design and implement software solutions.
- Write clean, efficient, and maintainable code following best practices.
- Troubleshoot and debug issues to ensure optimal performance and reliability.
- Stay up-to-date with the latest web development trends and technologies.

Qualifications:
- Bachelor's degree in Computer Science or related field.
- 3+ years of experience in full-stack web development.
- Proficiency in JavaScript, React, Node.js, HTML, and CSS.
- Strong problem-solving and analytical skills.
- Excellent communication and teamwork abilities.
`]

const input = `Your input is resume: ${inputTemplate} and the job listings are ${jobListing}`

export async function getResumeCompiletion() {
    const response = await openai.chat.completions.create({model:"gpt-3.5-turbo", messages: [{role: 'system', content: promptTemplate}]}, {});
  
    if(response){
      console.log(response)
    }
  }
  