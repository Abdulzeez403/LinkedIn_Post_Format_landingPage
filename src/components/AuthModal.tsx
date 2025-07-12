import React, { useState } from "react";
import { X, Mail, Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup" | "reset";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = "signin",
}) => {
  const [mode, setMode] = useState<"signin" | "signup" | "reset">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } =
    useAuth();

  if (!isOpen) return null;

  const EXTENSION_ID = "hieapepikblioagpanimpnnpheicdadf";
  const sendSessionToExtension = async (session: any) => {
    if (!session) return;

    try {
      // Method 1: Try chrome.runtime messaging (for extension context)
      if (chrome?.runtime?.sendMessage) {
        const response = await chrome.runtime.sendMessage(EXTENSION_ID, {
          type: "STORE_SUPABASE_SESSION",
          session: {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          },
        });

        if (response?.success) {
          console.log("✅ Session sent to extension successfully");
          return true;
        }
      }

      // Method 2: Fallback to localStorage for web context
      localStorage.setItem("sb_session", JSON.stringify(session));
      return true;
    } catch (err) {
      console.error("Extension communication failed:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      let result;

      if (mode === "signin") {
        result = await signInWithEmail(email, password);
      } else if (mode === "signup") {
        result = await signUpWithEmail(email, password, fullName);
        setMessage("Check your email for a confirmation link!");
      } else if (mode === "reset") {
        await resetPassword(email);
        setMessage("Password reset email sent!");
        setLoading(false);
        return;
      }

      if (result?.data?.session) {
        await sendSessionToExtension(result.data.session);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await signInWithGoogle();

      if (data?.url) {
        // Store pending auth state before redirect
        localStorage.setItem("sb_pending_auth", "true");
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  // // Check for OAuth callback when component mounts
  // useEffect(() => {
  //   const handleOAuthCallback = async () => {
  //     const isPendingAuth = localStorage.getItem("sb_pending_auth");
  //     if (!isPendingAuth) return;

  //     try {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();
  //       if (session) {
  //         await sendSessionToExtension(session);
  //         localStorage.removeItem("sb_pending_auth");
  //         onClose();
  //       }
  //     } catch (err) {
  //       console.error("OAuth callback error:", err);
  //     }
  //   };

  //   handleOAuthCallback();
  // }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "signin" && "Sign In"}
            {mode === "signup" && "Create Account"}
            {mode === "reset" && "Reset Password"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {mode !== "reset" && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0077B5] hover:bg-[#005885] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {mode === "signin" && "Sign In"}
                {mode === "signup" && "Create Account"}
                {mode === "reset" && "Send Reset Email"}
              </>
            )}
          </button>
        </form>

        {mode !== "reset" && (
          <>
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </>
        )}

        <div className="mt-6 text-center text-sm">
          {mode === "signin" && (
            <>
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#0077B5] hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setMode("reset")}
                className="text-[#0077B5] hover:underline font-medium mt-2 block mx-auto"
              >
                Forgot password?
              </button>
            </>
          )}
          {mode === "signup" && (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-[#0077B5] hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
          {mode === "reset" && (
            <p className="text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-[#0077B5] hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
