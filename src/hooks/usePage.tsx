import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return Number.parseInt(searchParams.get("page") || "0");
};

export default usePage;

