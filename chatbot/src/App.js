import "./App.scss";
import ChatBox from "./components/chatBox";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        openAI API Chatbot POC{" "}
        <span className="App-header__span">
          This React/Node.js project is a proof of concept for utilizing the openAI API to power a chatbot
        </span>
      </h1>
      <ChatBox />
    </div>
  );
}

export default App;
