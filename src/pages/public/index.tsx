import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PublicPage() {
  const [responseApi, setResponseApi] = useState("");

  const onClick = () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/health`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setResponseApi(`status : ${data.status}`);
        })
        .catch((err) => {
          setResponseApi(`${err}`);
        });
    } catch (err) {
      setResponseApi("failed to fetch data");
    }
  };

  return (
    <>
      <div>
        <Button onClick={onClick}>Check API Health</Button>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </div>
      {responseApi && <code>{responseApi}</code>}
    </>
  );
}
