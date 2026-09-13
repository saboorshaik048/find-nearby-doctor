import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import logo from "../../assets/images/logo.jpeg";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle =
    "no-underline [text-decoration:none] px-4 py-2 rounded-lg text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-700 transition";

  return (
    <nav className="sticky top-0 z-50 h-20 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="no-underline [text-decoration:none] flex items-center h-full overflow-hidden shrink-0"
        >
          <img
            src={logo}
            alt="FindNearbyDoctor"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {/* Home */}
          <Link to="/" className={linkStyle}>
            Home
          </Link>

          {/* Patient Navigation */}
          {currentUser?.role === "patient" && (
            <>
              <Link to="/patient" className={linkStyle}>
                Find Doctors
              </Link>

              <Link to="/patient/appointments" className={linkStyle}>
                My Appointments
              </Link>
            </>
          )}

          {/* Doctor Navigation */}
          {currentUser?.role === "doctor" && (
            <>
              <Link to="/doctor" className={linkStyle}>
                Dashboard
              </Link>

              <Link to="/doctor/availability" className={linkStyle}>
                Availability
              </Link>
            </>
          )}

          {/* Admin Navigation */}
          {currentUser?.role === "admin" && (
            <Link to="/admin" className={linkStyle}>
              Dashboard
            </Link>
          )}

          {/* Divider */}
          <div className="h-7 w-px bg-slate-200 mx-2"></div>

          {/* Logged Out */}
          {!currentUser && (
            <>
              <Link
                to="/login"
                className="no-underline [text-decoration:none] px-4 py-2 rounded-lg text-slate-700 font-semibold hover:text-blue-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="no-underline [text-decoration:none] px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Logged In */}
          {currentUser && (
            <>
              {/* User */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-slate-700 font-medium max-w-32 truncate">
                  {currentUser.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
