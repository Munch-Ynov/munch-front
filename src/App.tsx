import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [responseApi, setResponseApi] = useState("");

  const onClick = () => {
    // fetch(`http://localhost:3000/health`)
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponseApi(data.status);
      })
      .catch((err) => {
        setResponseApi(err);
      });
  };

  return (
    <>
      <div>
        <button onClick={onClick}>Check API Health</button>
      </div>
      {responseApi && <code>{responseApi}</code>}
    </>
  );
}

export default App;
