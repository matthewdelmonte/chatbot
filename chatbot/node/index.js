import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const configuration = new Configuration({
  organization: "org-PkdEIY2TP25MB5UfQlPr9dgx",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello Chat-GPT" }],
  })
  .then((res) => {
    console.log(res.data.choices);
  });
