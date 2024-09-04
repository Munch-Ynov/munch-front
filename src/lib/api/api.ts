// define general api call function here

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export interface ErrorMessage {
  message: string;
  error: string;
  statusCode: number;
}

export async function api<T>({
  url,
  method = "GET",
  body,
  params,
}: {
  url: string;
  method: Method;
  body?: unknown;
  params?: { [key: string]: string | number };
}): Promise<T | null> {
  let uri = url;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key].toString());
    }
    uri += `?${searchParams.toString()}`;
  }

  return fetch(`${import.meta.env.VITE_API_URL}/${uri}`, {
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
