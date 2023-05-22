import "./App.css";
import ChatBox from "./components/chatBox";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        myVIP AI Chatbot POC{" "}
        <span>
          Developer tool for debuging Javascript errors from the console
        </span>
      </h1>
      <ChatBox />
    </div>
  );
}

export default App;
