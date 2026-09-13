import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);

      if (!success) {
        alert("Invalid email or password");
        setIsLoading(false);
        return;
      }

      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-float-slower"></div>
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl animate-float-slowest"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Elegant Medical Info */}
        <div className="hidden lg:block animate-slide-in-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></span>
            <span className="text-slate-600 text-sm font-medium tracking-wide">
              Trusted Healthcare Platform
            </span>
          </div>

          <h1 className="mt-8 text-6xl font-bold leading-tight text-slate-900">
            Your Health,
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
            Connect with top healthcare professionals and manage your medical
            journey with ease and confidence.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-5 mt-10 max-w-lg">
            <div className="group bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                🔍
              </div>
              <h3 className="font-semibold text-slate-900">Smart Search</h3>
              <p className="text-sm text-slate-500 mt-2">
                Find the right specialist instantly
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                📍
              </div>
              <h3 className="font-semibold text-slate-900">Nearby Doctors</h3>
              <p className="text-sm text-slate-500 mt-2">
                Quality care around you
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-10">
            <div className="flex -space-x-2">
              {["👩‍⚕️", "👨‍⚕️", "🧑‍⚕️", "👩‍⚕️"].map((emoji, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-lg"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                10,000+ Doctors
              </p>
              <p className="text-xs text-slate-500">Trusted by millions</p>
            </div>
          </div>
        </div>

        {/* Login card - Premium Design */}
        <div className="w-full max-w-md mx-auto animate-slide-in-right">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Elegant shadow and border */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl transition-all duration-500 ${isHovered ? "opacity-30 scale-105" : "opacity-20 scale-100"}`}
            ></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-lg transition-all duration-500 ${isHovered ? "opacity-60 scale-110" : "opacity-40"}`}
                  ></div>
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl shadow-lg">
                    <span className="transform hover:scale-110 transition-transform duration-300">
                      🩺
                    </span>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                  Welcome Back
                </h1>
                <p className="mt-2 text-slate-500">
                  Sign in to continue your healthcare journey
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onFocus={() => setActiveInput("email")}
                      onBlur={() => setActiveInput(null)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="Enter your email"
                      required
                    />
                    {email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 animate-check-pop"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onFocus={() => setActiveInput("password")}
                      onBlur={() => setActiveInput(null)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="Enter your password"
                      required
                    />
                    {password && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 animate-check-pop"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                      </>
                    ) : (
                      <>
                        Sign In
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                  </div>
                </button>
              </form>

              {/* Register */}
              <p className="text-center mt-8 text-sm text-slate-600">
                New to the platform?{" "}
                <Link
                  to="/register"
                  className="relative font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
                >
                  Create an account
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </p>

              {/* Secure badge */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Protected by 256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes floatSlower {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes floatSlowest {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(15px, -15px);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes checkPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: floatSlower 8s ease-in-out infinite;
        }
        .animate-float-slowest {
          animation: floatSlowest 10s ease-in-out infinite;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-check-pop {
          animation: checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
