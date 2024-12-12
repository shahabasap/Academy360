import React, { useState } from "react";

interface ResetPasswordProps {
  onSubmit: (data: { password: string }) => Promise<void>;
}

const ResetPasswordPage: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit({ password });
      setSuccess("Your password has been reset successfully.");
    } catch (err) {
      setError("Unable to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter and confirm your new password.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 border border-red-300 rounded-md p-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 border border-green-300 rounded-md p-4">
            {success}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
