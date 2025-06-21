import img from "/images/header/signup.jpg";
import { useEffect, useState } from "react";
import { FaUmbrellaBeach, FaCocktail, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSubmit }) => {
  useEffect(() => {
    document.title = "Create Your Account | Tropical Paradise";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const url = `${import.meta.env.VITE_PROD_URL_URL}`;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const body = { username, email, password };
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!response.ok) {
        alert(parseRes.message || "Signup failed");
        return;
      }

      sessionStorage.setItem("token", parseRes.token);
      navigate("/rooms");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="headerimages">
        <img
          src={img}
          alt="Sign up banner"
          loading="lazy"
          className="detailImg"
        />
      </div>

      <div className="w-full bg-[#edeeff] flex flex-col items-center justify-center p-4 mt-20">
        <div
          className="w-full md:w-1/2 bg-gradient-to-br from-[#22258a] to-[#0e0f38]              shadow-[8px_0_15px_-5px_rgba(0,0,0,0.2)]
   rounded-3xl border border-white/10 text-white p-10 flex flex-col justify-between"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Join <span className="text-yellow-400">Tropical Paradise</span>
            </h1>
            <p className="text-xl text-yellow-100 mb-8">
              Begin your dream vacation today
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <span className="text-lg text-yellow-100">
                Exclusive Benefits
              </span>
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaUmbrellaBeach className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Private Beach Access</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaCocktail className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Welcome Drink</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur p-4 rounded-xl text-center transition-transform hover:scale-105">
              <FaSpa className="text-2xl mb-2 text-yellow-400 mx-auto" />
              <p className="text-yellow-100">Spa Discount</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0e0f38] mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Join our tropical paradise and start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22258a] text-gray-700 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#22258a] font-bold hover:underline text-md"
              >
                Sign in
              </a>
            </p>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
