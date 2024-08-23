import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
      <div className="flex flex-row-reverse my-4 h-full px-8">
        <div className="flex gap-8">
          <Button onClick={onClick}>Check API Health</Button>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center min-h-screen gap-8 flex-1">
        {responseApi && <span className="text-xl">{responseApi}</span>}
      </div>
    </>
  );
}
