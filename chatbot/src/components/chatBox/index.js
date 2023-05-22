import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./index.css";

function ChatBox() {
  const config = new Configuration({
    organization: "org-PkdEIY2TP25MB5UfQlPr9dgx",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [consoleError, setConsoleError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false); // Added a new state for handling visibility of the chatbox

  useEffect(() => {
    const errorHandler = (error) => {
      setConsoleError(error.message);
    };

    window.addEventListener("error", errorHandler);
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  useEffect(() => {
    if (consoleError) {
      setPrompt(`How can I fix this error: ${consoleError}`);
    }
  }, [consoleError]);

  const handleChange = async () => {
    setLoading(true);
    try {
      // add a 3 second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await openai.createCompletion({
        // model: "babbage-code-search-code", // code writing model
        model: "text-davinci-001", // text writing model
        prompt: prompt,
        temperature: 0.2,
        max_tokens: 350,
      });
      setResults([response.data.choices[0].text, ...results]);
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

  const handleChatToggle = () => {
    setChatVisible(!chatVisible); // Toggle the visibility of the chatbox
  };

  function simulateError() {
    try {
      let obj;
      console.log(obj.property); // obj is undefined, so this will throw an error
    } catch (error) {
      setConsoleError(`Error at line 68, column 12: ${error.message}`);
    }
  }

  return (
    <>
      <button className="chat-simulate-error" onClick={simulateError}>
        Simulate Error
      </button>
      {!chatVisible && (
        <button className="chat-toggle" onClick={handleChatToggle}>
          +
        </button>
      )}
      {chatVisible && (
        <div className="chat-container">
          <button className="chat-toggle" onClick={handleChatToggle}>
            -
          </button>
          <h2 className="chat-header">Personal ChatGPT</h2>
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

          {results.length > 0 ? (
            <textarea
              value={results.join("\n")}
              className="chat-result"
              readOnly
            />
          ) : error ? (
            <div className="chat-error">
              <p>Request exceed {error.message}</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default ChatBox;
