import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
config();

const configuration = new Configuration({
  organization: "org-PkdEIY2TP25MB5UfQlPr9dgx",
  apiKey: process.env.OPENAI_API_KEY,
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAIApi(configuration);

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.data.choices[0].message.content);
});
userInterface.prompt();
