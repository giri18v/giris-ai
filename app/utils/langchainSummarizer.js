import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

// Define the output schema using Zod
const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts about the repository")
});

// Create a structured output parser
const parser = StructuredOutputParser.fromZodSchema(outputSchema);

// Create a prompt template
const promptTemplate = PromptTemplate.fromTemplate(
  "Summarize the GitHub repository from this README file content:\n\n{readmeContent}\n\n{format_instructions}"
);

const model = new OpenAI({ temperature: 0.7 });

// Create the chain
const chain = RunnableSequence.from([
  {
    readmeContent: (input) => input.readmeContent,
    format_instructions: () => parser.getFormatInstructions(),
  },
  promptTemplate,
  model,
  parser,
]);

export async function summarizeRepository(readmeContent) {
  // Invoke the chain
  const result = await chain.invoke({ readmeContent });
  return result;
}

export async function summarizeGitHubRepo(githubUrl, apiKey) {
  const model = new OpenAI({
    openAIApiKey: apiKey,
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  try {
    const result = await chain.invoke({
      github_url: githubUrl,
    });
    
    // Add a delay of 1 second (1000 ms) between API calls
    await delay(1000);
    
    return result;
  } catch (error) {
    console.error("Error in summarizeGitHubRepo:", error);
    throw error;
  }
}
