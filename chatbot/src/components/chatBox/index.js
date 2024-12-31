import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import "./index.css";

function ChatBox() {
  const openai = new OpenAI({
    organization: process.env.REACT_APP_OPENAI_ORG_KEY,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [consoleError, setConsoleError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [model, setModel] = useState("text-davinci-001");

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
        model: model,
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
      console.log(obj.property); // Obj is undefined, so this will throw an error
    } catch (error) {
      setConsoleError(`Error at line 68, column 12: ${error.message}`);
    }
  }

  return (
    <>
      <button className="chat-simulate-error" onClick={simulateError}>
        Simulate Javascript Error
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
          <div className="chat-header">
            <h2>Chatbot powered by OpenAI</h2>
            <div>
              <span>Select Model:</span>
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                className="chat-switch"
              >
                <option value="text-davinci-001">Davinci 001 (General)</option>
                <option value="text-davinci-002">Davinci 002 (Code)</option>
              </select>
            </div>
          </div>
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
              placeholder="Hello there! How may I assist you today?"
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
