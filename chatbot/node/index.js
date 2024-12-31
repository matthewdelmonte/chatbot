import { config } from "dotenv";
import OpenAI from "openai";
import readline from "readline";
config();

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.data.choices[0].message.content);
});
userInterface.prompt();
