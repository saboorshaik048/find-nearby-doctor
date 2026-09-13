import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoctor } from "../../redux/slices/doctorSlice";
import { useAuth } from "../../context/useAuth";

function AddDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [specialization, setSpecialization] = useState("");
  const [healthIssues, setHealthIssues] = useState("");

  const [hospital, setHospital] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");

  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [consultationFee, setConsultationFee] = useState("");

  const [image, setImage] = useState("");

  const [available, setAvailable] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Number(distance) < 0) {
      alert("Distance cannot be negative.");
      return;
    }

    if (Number(rating) < 0 || Number(rating) > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    if (Number(experience) < 0) {
      alert("Experience cannot be negative.");
      return;
    }

    if (Number(consultationFee) < 0) {
      alert("Consultation fee cannot be negative.");
      return;
    }

    const doctorId = Date.now();

    const newDoctor = {
      id: doctorId,

      name,

      specialization,

      healthIssues: healthIssues
        .split(",")
        .map((issue) => issue.trim())
        .filter(Boolean),

      hospital,

      location,

      // Distance entered by admin
      distance: Number(distance),

      experience: Number(experience),

      rating: Number(rating),

      consultationFee: Number(consultationFee),

      available,

      image,

      // Default consultation schedule
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

      startTime: "09:00",

      endTime: "17:00",
    };

    // Add doctor to Redux
    dispatch(addDoctor(newDoctor));

    // Create doctor login account
    addUser({
      name,
      email,
      password,
      role: "doctor",
      doctorId,
    });

    alert("Doctor added successfully!");

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>

        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-14">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-sm font-semibold text-slate-400 hover:text-white transition"
          >
            ← Back to Admin Dashboard
          </button>

          <p className="mt-8 text-cyan-300 text-sm font-bold tracking-[0.18em]">
            ADMIN CONTROL CENTER
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Add New Doctor
          </h1>

          <p className="mt-4 text-lg text-slate-400 max-w-2xl">
            Add a healthcare professional to your network and make their profile
            available to patients.
          </p>
        </div>
      </section>

      {/* FORM */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* BASIC INFORMATION */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Doctor Profile
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Basic Information
                </h2>

                <p className="mt-2 text-slate-500">
                  Enter the doctor's professional information.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NAME */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Doctor Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                {/* SPECIALIZATION */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Specialization
                  </label>

                  <input
                    type="text"
                    value={specialization}
                    onChange={(event) => setSpecialization(event.target.value)}
                    placeholder="Cardiologist"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                {/* HEALTH ISSUES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Health Issues
                  </label>

                  <input
                    type="text"
                    value={healthIssues}
                    onChange={(event) => setHealthIssues(event.target.value)}
                    placeholder="Heart disease, chest pain, blood pressure"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />

                  <p className="text-xs text-slate-400 mt-2">
                    Separate multiple health issues with commas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Location
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Practice Location
                </h2>

                <p className="mt-2 text-slate-500">
                  Add the doctor's hospital and location details.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* HOSPITAL */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Hospital / Clinic
                  </label>

                  <input
                    type="text"
                    value={hospital}
                    onChange={(event) => setHospital(event.target.value)}
                    placeholder="City Care Hospital"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    City / Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Hyderabad"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                {/* DISTANCE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Distance from Patient
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={distance}
                      onChange={(event) => setDistance(event.target.value)}
                      placeholder="Example: 2.5"
                      className="w-full px-4 py-3.5 pr-14 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      km
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Enter the approximate distance from the patient's location.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL DETAILS */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Professional Details
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Experience & Consultation
                </h2>
              </div>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* EXPERIENCE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Experience
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                      placeholder="10"
                      className="w-full px-4 py-3.5 pr-16 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      years
                    </span>
                  </div>
                </div>

                {/* RATING */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Rating
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(event) => setRating(event.target.value)}
                      placeholder="4.8"
                      className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-500">
                      ★
                    </span>
                  </div>
                </div>

                {/* FEE */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Consultation Fee
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={consultationFee}
                      onChange={(event) =>
                        setConsultationFee(event.target.value)
                      }
                      placeholder="500"
                      className="w-full px-4 py-3.5 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROFILE IMAGE */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Profile
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Doctor Image
                </h2>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 border border-slate-200 flex items-center justify-center shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt="Doctor preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl">👨‍⚕️</span>
                  )}
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold cursor-pointer hover:bg-blue-700 transition">
                    📷 Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs text-slate-400 mt-3">
                    Upload a professional doctor profile image.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* LOGIN CREDENTIALS */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                  Account
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Doctor Login Credentials
                </h2>

                <p className="mt-2 text-slate-500">
                  These credentials will be used by the doctor to access their
                  dashboard.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="doctor@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create password"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* AVAILABILITY */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-7 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                    Appointment Status
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Doctor Availability
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Choose whether the doctor can receive appointments
                    immediately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAvailable(!available)}
                  className={`relative w-16 h-9 rounded-full transition-all duration-300 ${
                    available ? "bg-green-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 ${
                      available ? "left-8" : "left-1"
                    }`}
                  ></span>
                </button>
              </div>

              <div
                className={`mt-6 rounded-2xl p-4 border ${
                  available
                    ? "bg-green-50 border-green-100"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      available ? "bg-green-500" : "bg-slate-400"
                    }`}
                  ></span>

                  <p
                    className={`text-sm font-bold ${
                      available ? "text-green-700" : "text-slate-600"
                    }`}
                  >
                    {available
                      ? "Doctor is available for appointments"
                      : "Doctor is currently unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SUBMIT */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Add Doctor →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddDoctor;
