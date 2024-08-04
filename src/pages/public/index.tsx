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
      <div className="flex flex-row-reverse my-4 h-full gap-8 px-8">
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button onClick={onClick}>Check API Health</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center min-h-screen gap-8 flex-1">
        {responseApi && <span className="text-xl">{responseApi}</span>}
      </div>
    </>
  );
}
