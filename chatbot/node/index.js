import { config } from "dotenv";
import OpenAI from "openai";
import rl from "readline";
import { stdin as input, stdout as output } from "node:process";
config();

const userInterface = rl.createInterface({ input, output });

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
  console.log(res.choices[0].message.content);
});
userInterface.prompt();
