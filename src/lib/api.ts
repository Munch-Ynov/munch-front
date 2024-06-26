// define general api call function here

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function api<T>(
  url: string,
  method: Method = "GET",
  body?: any
): Promise<T | null> {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
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
