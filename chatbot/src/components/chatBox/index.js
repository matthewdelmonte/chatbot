import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./index.css";

function ChatBox() {
  const config = new Configuration({
    organization: "org-PkdEIY2TP25MB5UfQlPr9dgx",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    try {
      // add a 3 second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await openai.createCompletion({
        model: "text-davinci-001",
        prompt: prompt,
        temperature: 0.2, //2
        max_tokens: 350, //7
      });
      setResult(response.data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  const handleClick = async () => {
    // add a 3 second delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    handleChange();
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Personal chat-GPT</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="chat-input"
        cols="30"
        rows="10"
        placeholder="Hello there! How may I assist you today?"
      />

      <button className="chat-button" onClick={handleClick}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result ? (
        <div className="chat-result">{result}</div>
      ) : error ? (
        <div className="chat-error">
          <p>Request exceed {error.message}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ChatBox;
