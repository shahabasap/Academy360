import React, { useState } from "react";


interface OtpProps {
  onSubmit: (otp: string) => Promise<void>;
}

const OtpPage: React.FC<OtpProps> = ({ onSubmit }) => {

  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(otp);
      // Redirect to the respective dashboard or home
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            OTP Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the OTP sent to your email to verify your account.
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
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                className="text-green-600 hover:underline font-medium"
                onClick={() => {
                  // Resend OTP logic (e.g., calling an API to resend OTP)
                }}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
