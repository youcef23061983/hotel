import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "/images/header/login.jpg";
import {
  FaGoogle,
  FaFacebookF,
  FaEnvelope,
  FaLock,
  FaEye,
  FaUmbrellaBeach,
  FaCocktail,
  FaSpa,
} from "react-icons/fa";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AppContext } from "../data managment/AppProvider";
import { Helmet } from "react-helmet-async";
import { auth } from "./Firebase";

const Login = ({ onSubmit, setAuth }) => {
  const navigate = useNavigate();
  const { setFormUser, logout, setFirebaseUser } = useContext(AppContext);
  const [status, setStatus] = useState("idle");
  const [googleError, setGoogleError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [googlestatus, setGooglestatus] = useState("idle");
  const [facebookstatus, setFacebookstatus] = useState("idle");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const url = `${import.meta.env.VITE_PROD_URL_URL}`;

  const handleSubmit = async (e) => {
    const { password, email } = loginFormData;
    e.preventDefault();
    setStatus("submitting");
    setError("");

    if (!loginFormData.email || !loginFormData.password) {
      setError("Please enter both email and password");
      setStatus("idle");
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(loginFormData);
        return;
      }
      const token = sessionStorage.getItem("token");
      const body = { email, password };
      const response = await fetch(`${url}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!response.ok) {
        setError(parseRes.message || "Login failed. Please try again.");
        return;
      }

      if (!parseRes.token) {
        throw new Error("No token received from server");
      }

      if (parseRes.token) {
        sessionStorage.setItem("token", parseRes.token);

        setAuth({
          isAuthenticated: true,
          user_role: parseRes.user?.user_role || "customer",
        });
        setFormUser(parseRes);
      } else {
        setAuth(null);
        sessionStorage.removeItem("token");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setStatus("idle");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };
  const googleLogin = async (e) => {
    const provider = new GoogleAuthProvider();

    e.preventDefault();
    try {
      setGooglestatus("submitting");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      const payload = {
        email: user.email,
        firebase_uid: user.uid,
        username: user.displayName,
        provider: "google",
      };
      const res = await fetch(`${url}/auth/firebaseSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        throw new Error(
          "Failed to login with Google, the email exists with facebook account"
        );
      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        setFirebaseUser({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          user_role: data.user.user_role,
          firebase_uid: data.user.firebase_uid,
        });

        setAuth({
          isAuthenticated: true,
          user_role: data.user?.user_role || "customer",
        });
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      setGoogleError(error.message);
    } finally {
      setGooglestatus("idle");
    }
  };

  const googleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/", { replace: true });

      setFirebaseUser(null);
      setFormUser(null);
      setAuth(null);
      sessionStorage.removeItem("token");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();

    // 1. Initialize provider with required scopes
    const facebookProvider = new FacebookAuthProvider();
    facebookProvider.addScope("email"); // Explicitly request email permission
    facebookProvider.addScope("public_profile");

    try {
      setFacebookstatus("submitting");
      // 2. Sign in with popup
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;

      // 3. Fallback for email if still null
      let userEmail = userCredential.user.email;
      if (!userEmail) {
        // Try to get email from Facebook directly
        const credential =
          FacebookAuthProvider.credentialFromResult(userCredential);
        const accessToken = credential.accessToken;
        const response = await fetch(
          `https://graph.facebook.com/v12.0/me?fields=email&access_token=${accessToken}`
        );
        const data = await response.json();
        userEmail = data.email;
      }

      const token = await user.getIdToken();

      const payload = {
        email: user.email || userEmail, // Use the fetched email if available
        firebase_uid: user.uid,
        username: user.displayName,
        provider: "facebook",
      };

      const res = await fetch(`${url}/auth/firebaseSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        throw new Error(
          "Failed to login with Facebook, the email exists with google account"
        );
      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        setFirebaseUser({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          user_role: data.user.user_role,
          firebase_uid: data.user.firebase_uid,
        });

        setAuth({
          isAuthenticated: true,
          user_role: data.user?.user_role || "customer",
        });
      } else {
        setAuth(null);
      }
    } catch (error) {
      setFacebookError(error.message);

      if (error.code === "auth/account-exists-with-different-credential") {
        const credential = OAuthProvider.credentialFromError(error);

        // Handle account linking flow here
        const email = error.customData?.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);
      } else {
        console.error("Facebook login error:", error);
        throw error;
      }
    } finally {
      setFacebookstatus("idle");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Login</title>
        <meta name="description" content="Login to your account" />
      </Helmet>
      <div className="headerimages">
        <img src={img} alt="login" loading="lazy" className="detailImg" />
      </div>
      <div className="w-full bg-[#edeeff] flex flex-col items-center justify-center p-4">
        <div
          className="w-full md:w-1/2 bg-gradient-to-br from-[#22258a] to-[#0e0f38] text-white p-10 flex flex-col justify-between
             shadow-[8px_0_15px_-5px_rgba(0,0,0,0.2)]
             rounded-3xl border border-white/10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Welcome to <br />
              <span className="text-yellow-400">Tropical Paradise</span>
            </h1>
            <p className="text-xl text-yellow-100 mb-8">
              Where dreams meet the ocean
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <span className="text-lg text-yellow-100">Experience Luxury</span>
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaUmbrellaBeach className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Private Beaches</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaCocktail className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Ocean View Café</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaSpa className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Luxury Spa</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0e0f38] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">Sign in to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-lg text-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                  value={loginFormData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                  value={loginFormData.password}
                  onChange={handleChange}
                  required
                />
                <FaEye
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer transition-colors ${
                    showPassword ? "text-[#22258a]" : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-xxl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {status === "submitting" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
              <button
                onClick={logout}
                className="w-full py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                logout{" "}
              </button>
            </div>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={googleLogin}
                disabled={googlestatus === "submitting"}
                className="flex items-center justify-center py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <FaGoogle className="text-red-500 mr-2" />
                {googlestatus === "submitting" ? "Signing in..." : "Google"}
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={facebookstatus === "submitting"}
                className="flex items-center justify-center py-2.5 bg-[#3b5998] text-white rounded-lg font-medium hover:bg-[#344e86] transition-all"
              >
                <FaFacebookF className="mr-2" />
                {facebookstatus === "submitting" ? "Signing in..." : "Facebook"}
              </button>
            </div>

            {/* Sign out button spanning full width */}
            <button
              onClick={googleLogout}
              className="w-full py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Sign out
            </button>
          </div>

          {googleError && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-md">
              {googleError}
            </div>
          )}

          {facebookError && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-md">
              {facebookError}
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#22258a] font-bold hover:underline transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
