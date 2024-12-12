import React from "react";
import { Link } from "react-router-dom";
import useRole from "../../hooks/RoleState";

interface RegisterProps {
  onSubmit: (values: { name: string; email: string; password: string }) => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
  const role = useRole();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await onSubmit({ name, email, password });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {role.slice(0).toUpperCase()} Register
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account? {" "}
              <Link
                to={`/${role}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;