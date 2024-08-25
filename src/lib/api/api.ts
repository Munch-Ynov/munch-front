// define general api call function here

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ErrorMessage {
  message: string;
  error: string;
  statusCode: number;
}

export async function api<T>(
  url: string,
  method: Method = "GET",
  body?: any
): Promise<T | null> {
  return fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error.message || res.statusText);
      });
    }
    return res.json() as Promise<T>;
  });
}
