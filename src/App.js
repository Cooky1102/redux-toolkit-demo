import React from "react";
import { useSelector } from "react-redux";
import Todos from "./components/todos";
import "./App.css";

function App() {
  const status = useSelector(state => state.app.status);

  return (
    <div>
      <Todos />
      {status === "loading" && (
        <div className="loading">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default App;
