import { useState } from "react";
import { useSelector } from "react-redux";
import DoctorCard from "../../components/doctor/DoctorCard";

function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorType, setDoctorType] = useState("nearby");

  const doctors = useSelector((state) => state.doctors.doctors);

  const filteredDoctors = doctors
    .filter((doctor) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialization.toLowerCase().includes(search) ||
        doctor.healthIssues.some((issue) =>
          issue.toLowerCase().includes(search),
        );

      const matchesLocation =
        doctorType === "all" || Number(doctor.distance) <= 5;

      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      // In Nearby mode, show closest doctors first
      if (doctorType === "nearby") {
        return Number(a.distance) - Number(b.distance);
      }

      return 0;
    });

  const nearbyCount = doctors.filter(
    (doctor) => Number(doctor.distance) <= 5,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full bg-blue-400/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <p className="text-cyan-300 font-semibold tracking-[0.15em] text-sm">
            FINDNEARBYDOCTOR
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Find the Right Doctor
            <span className="block text-cyan-400">Near You</span>
          </h1>

          <p className="mt-5 text-blue-100 text-lg leading-relaxed max-w-2xl">
            Discover trusted healthcare professionals near your location,
            compare specialists, and book an appointment with ease.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* SEARCH */}
        <div className="-mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 md:p-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              What kind of doctor are you looking for?
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                🔍
              </span>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by health issue, doctor name or specialty..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>
          </div>
        </div>

        {/* HEADER + FILTER */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {doctorType === "nearby" ? "Nearby Doctors" : "All Doctors"}
              </h2>

              {doctorType === "nearby" && (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  Within 5 km
                </span>
              )}
            </div>

            <p className="text-slate-500 mt-2">
              {doctorType === "nearby"
                ? `Showing ${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  } closest to you`
                : `Showing ${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  } available in the network`}
            </p>
          </div>

          {/* TOGGLE */}
          <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm flex">
            <button
              onClick={() => setDoctorType("nearby")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                doctorType === "nearby"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📍 Nearby
            </button>

            <button
              onClick={() => setDoctorType("all")}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                doctorType === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              🌎 All Doctors
            </button>
          </div>
        </div>

        {/* NEARBY INFO */}
        {doctorType === "nearby" && (
          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  📍
                </div>

                <div>
                  <p className="font-bold text-blue-900">Doctors within 5 km</p>

                  <p className="text-sm text-blue-700 mt-0.5">
                    Results are automatically sorted from nearest to farthest.
                  </p>
                </div>
              </div>

              <div className="text-sm font-bold text-blue-700">
                {nearbyCount} nearby
              </div>
            </div>
          </div>
        )}

        {/* DOCTOR GRID */}
        <div className="mt-8">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredDoctors.map((doctor, index) => (
                <div key={doctor.id} className="relative">
                  {/* NEAREST BADGE */}
                  {doctorType === "nearby" && index === 0 && (
                    <div className="absolute -top-3 left-5 z-10 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg">
                      ⭐ Closest to you
                    </div>
                  )}

                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 md:p-16 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                📍
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No nearby doctors found
              </h3>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                We couldn't find a doctor matching your search within 5 km.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setDoctorType("all");
                }}
                className="mt-6 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                View All Doctors
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;
