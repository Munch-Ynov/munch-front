import { useState } from "react";

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
          setResponseApi("err : ", err);
        });
    } catch (err) {
      setResponseApi("error while fetching data");
    }
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
