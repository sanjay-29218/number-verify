import React, { useState } from "react";
import "./App.css";
import Input from "./component/Input";
import MobileVerificationInput from "./component/Input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1 style={{ color: "blue", textAlign: "center" }}>Verification</h1>

      <Input />
    </div>
  );
}

export default App;
