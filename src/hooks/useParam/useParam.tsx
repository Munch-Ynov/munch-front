import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to get and set a search param in the URL
 * return a tuple with the value and a function to set it
 * @param param - the name of the search param
 */
function useParam<T = string>(
  paramName: string,
  options?: {
    default?: T;
  }
): [T, (value: T | undefined) => void] {

  const location = useLocation();

  function get(): T {
    const search = new URLSearchParams(location.search);
    const value = search.get(paramName);
    return value ? (value as unknown as T) : (options?.default as unknown as T);
  }

  const [value, setValue] = React.useState<T>(get());


  function set(value: T | undefined) {
    const search = new URLSearchParams(location.search);
    if (value) {
      search.set(paramName, `${value}`);
    } else {
      search.delete(paramName);
    }
    setValue(value as T);
    if (search.toString() === '')
      window.history.pushState({}, '', `${location.pathname}`);
    else
      window.history.pushState({}, '', `${location.pathname}?${search.toString()}`);
  }

  return [value, set];

}

export default useParam;
