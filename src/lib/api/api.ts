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
  params?: { [key: string]: string[] | string | number | boolean };
}): Promise<T | null> {
  try {
    let uri = url;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        if (params[key] !== undefined)
          searchParams.append(key, params[key].toString());
      }
      if (searchParams.toString()) uri += `?${searchParams.toString()}`;
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
          console.error(error);
          return Promise.reject(error as ErrorMessage);
        });
      }
      if (res.status === 204) {
        return null;
      }
      const result = res.json();
      return result as Promise<T>;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
