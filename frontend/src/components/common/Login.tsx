import React from "react";
import {Link } from "react-router-dom";
import useRole from "../../hooks/RoleState";

interface LoginProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const role=useRole()  
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
           {role.slice(0).toUpperCase()} 
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account and get started
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 border border-red-300 rounded-md p-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center">
            <Link
              to={`forgot-password`}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-500 text-sm">Or</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.9 0 7.2 1.6 9.7 4.1l7.3-7.3C37.3 2.4 31 0 24 0 14.6 0 6.4 5.6 2.5 13.7l8.6 6.8C13.5 12 18.2 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.5 0 12.4-2.2 16.9-6.1l-8.2-6.7C29.6 38.5 26.8 39.5 24 39.5c-5.9 0-11.1-3.8-12.9-9.2l-8.7 6.8C6.3 43.9 14.7 48 24 48z"
              />
              <path
                fill="#4A90E2"
                d="M47.9 24c0-1.6-.2-3.3-.6-4.9H24v9.3h13.5C35.9 33.2 32.3 36 28 36v6h16c5.5-5.5 8.9-13.5 8.9-22z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={`/${role}/signUp`}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
