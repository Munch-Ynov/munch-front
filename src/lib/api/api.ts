// define general api call function here

type Method = "GET" | "POST" | "PUT" | "DELETE";

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
      throw new Error(res.statusText);
    }
    if (res.status === 204) {
      return null;
    }
    return res.json() as Promise<T>;
  });
}
