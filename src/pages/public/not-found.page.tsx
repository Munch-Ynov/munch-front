import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link to="/" className="px-4 py-2 rounded">
          Go back home
        </Link>
      </Button>
    </div>
  );
};
