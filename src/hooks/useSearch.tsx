import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to get and set the search param in the URL
 * return a tuple with the search value and a function to set it
 * @param param - the name of the search param : default "search"
 */
const useSearch = (
  args?: {
    param?: string;
    onChange?: (value: string) => void;
    ref?: React.RefObject<HTMLInputElement>;
  }
): [string, (value: string) => void] => {
  const { param = "search" } = args ?? {};
  const onChange = (value: string) => {
    if (args?.ref?.current) {
      args.ref.current.value = value;
    }
    if (args?.onChange) {
      args.onChange(value);
    }
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const get = () => searchParams.get(param) || "";
  const set = (value: string) => {
    if (value === "") {
      searchParams.delete(param);

    } else {
      searchParams.set(param, value);
    }
    window.history.replaceState({}, "", searchParams.toString().length > 0 ? `?${searchParams}` : location.pathname);

    onChange(value);
  };
  onChange(get());
  return [get(), set];
}

export default useSearch;
