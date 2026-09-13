import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import stethoscope from "../assets/images/stethoscope.jpeg";

function Home() {
  const { currentUser } = useAuth();

  const getDashboardLink = () => {
    if (!currentUser) {
      return "/login";
    }

    if (currentUser.role === "admin") {
      return "/admin";
    }

    if (currentUser.role === "doctor") {
      return "/doctor";
    }

    return "/patient";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
        {/* Background glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-12">
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">
              <p className="text-cyan-300 font-semibold tracking-[0.15em] text-sm mb-4">
                FINDNEARBYDOCTOR
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight">
                Find the Right Doctor
                <span className="block text-cyan-400">Near You</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                Search for doctors based on your health needs, discover nearby
                healthcare professionals, and book appointments easily.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={getDashboardLink()}
                  className="no-underline [text-decoration:none] bg-white text-blue-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                >
                  {currentUser ? "Go to Dashboard" : "Find a Doctor"}
                </Link>

                {!currentUser && (
                  <Link
                    to="/register"
                    className="no-underline [text-decoration:none] border border-blue-200/60 bg-white/10 backdrop-blur-sm text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT MEDICAL IMAGE */}
            <div className="hidden md:flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-6 bg-cyan-300/20 blur-3xl rounded-full"></div>

                {/* Image frame */}
                <div className="relative w-[300px] h-[390px] lg:w-[350px] lg:h-[450px] rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl shadow-black/30 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={stethoscope}
                    alt="Stethoscope"
                    className="w-full h-full object-cover"
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-transparent to-white/5 pointer-events-none"></div>
                </div>

                {/* Floating medical badge */}
                <div className="absolute -bottom-5 -left-6 bg-white text-slate-800 rounded-2xl px-5 py-4 shadow-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                    🩺
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium">
                      Healthcare
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      Trusted Doctors
                    </p>
                  </div>
                </div>

                {/* Small floating status */}
                <div className="absolute -top-4 -right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                    <span className="text-xs font-bold text-slate-700">
                      Find care nearby
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Everything You Need
            </h2>

            <p className="mt-3 text-slate-600">
              Simple healthcare discovery and appointment management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-3xl mb-5">
                🔍
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Search by Health Issue
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Find doctors based on your health problem or medical
                requirement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-100 text-3xl mb-5">
                📍
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Nearby Doctors
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Discover doctors near your location and compare their
                specialties and experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-100 text-3xl mb-5">
                📅
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Easy Appointments
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Choose a trusted doctor and book your appointment with just a
                few steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold tracking-wide mb-2">
              SIMPLE PROCESS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              How It Works
            </h2>

            <p className="mt-3 text-slate-600">
              Find and book the right doctor in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-blue-100 hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                1
              </div>

              <h3 className="mt-5 font-semibold text-xl text-slate-800">
                Search
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Search doctors by health issue or specialty.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-indigo-100 hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                2
              </div>

              <h3 className="mt-5 font-semibold text-xl text-slate-800">
                Choose
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Compare doctors and select the right one.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-cyan-100 hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-cyan-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                3
              </div>

              <h3 className="mt-5 font-semibold text-xl text-slate-800">
                Book
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Select a date and time and book your appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-blue-100 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-white">FindNearbyDoctor</h3>

          <p className="mt-3 text-blue-200">
            Making healthcare discovery simple and accessible.
          </p>

          <div className="w-16 h-px bg-blue-700 mx-auto my-6"></div>

          <p className="text-sm text-blue-300">
            © 2026 FindNearbyDoctor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
