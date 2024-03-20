import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = "";
const writeAction = async (req, res) => {
  // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'gpt-3.5-turbo-instruct',
    prompt: `Write me an overview of a study below, the study process tailored to the status below, and the job opportunities to help develop an interest and start learning the study. Write them in the section:\n1. Overview = A long paragraph about the study, \n2. Study Process = Divide it into Early Education, High School, College, Young Adult, and Working Adult. Only start from the status below then continue until Working Adult. Make sure to add a lot of real-world examples and suggestions for college and internships. \n3. Job Opportunity = Organize the jobs as points with explanations about the jobs. \n\nStudy:${req.body.studyInput} \nStatus:${req.body.statusInput} `,
    temperature: 0.9,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default writeAction;