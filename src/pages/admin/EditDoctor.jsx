import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateDoctor } from "../../redux/slices/doctorSlice";

function EditDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.doctors.doctors);
  const doctor = doctors.find((item) => item.id === Number(id));

  const [name, setName] = useState(doctor?.name || "");
  const [specialization, setSpecialization] = useState(
    doctor?.specialization || "",
  );
  const [healthIssues, setHealthIssues] = useState(
    doctor?.healthIssues?.join(", ") || "",
  );
  const [hospital, setHospital] = useState(doctor?.hospital || "");
  const [location, setLocation] = useState(doctor?.location || "");
  const [experience, setExperience] = useState(doctor?.experience || "");
  const [rating, setRating] = useState(doctor?.rating || "");
  const [consultationFee, setConsultationFee] = useState(
    doctor?.consultationFee || "",
  );
  const [image, setImage] = useState(doctor?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imagePreview, setImagePreview] = useState(doctor?.image || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!doctor) {
        alert("Doctor not found.");
        setIsLoading(false);
        return;
      }

      const updatedDoctor = {
        ...doctor,
        name,
        specialization,
        healthIssues: healthIssues.split(",").map((issue) => issue.trim()),
        hospital,
        location,
        experience: Number(experience),
        rating: Number(rating),
        consultationFee: Number(consultationFee),
        image,
      };

      dispatch(updateDoctor(updatedDoctor));
      alert("Doctor updated successfully!");
      navigate("/admin");
    }, 1000);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white text-center animate-slide-up">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-2xl font-bold text-slate-900">
            Doctor Not Found
          </h1>
          <p className="text-slate-500 mt-2">
            The doctor you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-float-slower"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <button
            onClick={() => navigate("/admin")}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1"
          >
            <svg
              className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
              Back to Dashboard
            </span>
          </button>

          <div className="mt-6 flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-40"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
                👨‍⚕️
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Edit Doctor Profile
              </h1>
              <p className="text-slate-500 mt-1">
                Update doctor information and credentials
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div
          className="relative animate-slide-up"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl transition-all duration-500 ${isHovered ? "opacity-20 scale-105" : "opacity-10 scale-100"}`}
          ></div>

          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Doctor Name and Image */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Doctor Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="Dr. John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col items-center">
                  <label className="block mb-2 text-sm font-semibold text-slate-700 text-center">
                    Profile Photo
                  </label>
                  <div
                    className="relative group cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden group-hover:border-blue-500 transition-all duration-300">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">📷</span>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Change
                      </span>
                    </div>
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Specialization and Hospital */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Specialization
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
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
                    </div>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(event) =>
                        setSpecialization(event.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="Cardiologist"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Hospital
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={hospital}
                      onChange={(event) => setHospital(event.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="City General Hospital"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Health Issues */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Health Issues
                  <span className="text-slate-400 font-normal ml-2">
                    (comma separated)
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={healthIssues}
                    onChange={(event) => setHealthIssues(event.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                    placeholder="Chest pain, Heart disease, Hypertension"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Location
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                    placeholder="Downtown Medical Center, 5th Avenue"
                    required
                  />
                </div>
              </div>

              {/* Experience / Rating / Fee */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Experience (Years)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      min="0"
                      placeholder="5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Rating
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={rating}
                      onChange={(event) => setRating(event.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      placeholder="4.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Consultation Fee ($)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={consultationFee}
                      onChange={(event) =>
                        setConsultationFee(event.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
                      min="0"
                      placeholder="100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 relative py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
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
                        Updating...
                      </>
                    ) : (
                      <>
                        Update Doctor
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
                            d="M5 13l4 4L19 7"
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
              </div>
            </form>
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
            transform: translate(20px, -20px);
          }
        }

        @keyframes floatSlower {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15px, 15px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slide-down {
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default EditDoctor;
