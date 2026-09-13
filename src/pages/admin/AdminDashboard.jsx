import { useDispatch, useSelector } from "react-redux";
import { deleteDoctor } from "../../redux/slices/doctorSlice";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.doctors.doctors);

  const availableDoctors = doctors.filter((doctor) => doctor.available);

  const unavailableDoctors = doctors.filter((doctor) => !doctor.available);

  const totalExperience = doctors.reduce(
    (total, doctor) => total + Number(doctor.experience || 0),
    0,
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (confirmDelete) {
      dispatch(deleteDoctor(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Decorative background */}
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>

                <span className="text-xs font-bold tracking-[0.18em] text-cyan-300">
                  ADMIN CONTROL CENTER
                </span>
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Healthcare
                <span className="block text-cyan-400">Management.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
                Manage your medical network, monitor doctor availability, and
                keep the FindNearbyDoctor platform organized.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/add-doctor")}
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-2xl hover:bg-cyan-50 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-xl group-hover:rotate-90 transition-transform duration-300">
                +
              </span>
              Add New Doctor
            </button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-12 relative z-10">
          {/* TOTAL */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Total Doctors
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {doctors.length}
                </h2>

                <p className="mt-2 text-xs font-semibold text-blue-600">
                  Medical professionals
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                🩺
              </div>
            </div>
          </div>

          {/* AVAILABLE */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Available
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {availableDoctors.length}
                </h2>

                <p className="mt-2 text-xs font-semibold text-green-600">
                  Currently accepting patients
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
            </div>
          </div>

          {/* UNAVAILABLE */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Unavailable
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {unavailableDoctors.length}
                </h2>

                <p className="mt-2 text-xs font-semibold text-red-500">
                  Not accepting appointments
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Combined Experience
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {totalExperience}
                  <span className="text-lg ml-1 text-slate-400">yrs</span>
                </h2>

                <p className="mt-2 text-xs font-semibold text-cyan-600">
                  Across all doctors
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-2xl">
                ✦
              </div>
            </div>
          </div>
        </div>

        {/* DIRECTORY HEADER */}
        <section className="mt-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Doctor Directory
                </h2>

                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  {doctors.length}
                </span>
              </div>

              <p className="mt-2 text-slate-500">
                Manage doctors registered on your healthcare platform.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {availableDoctors.length} currently available
            </div>
          </div>

          {/* DIRECTORY */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden">
            {/* TABLE TOP BAR */}
            <div className="px-6 md:px-8 py-5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Registered Physicians
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Review profiles and manage access.
                  </p>
                </div>

                <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-500">
                  {doctors.length} profiles
                </div>
              </div>
            </div>

            {doctors.length === 0 ? (
              /* EMPTY STATE */
              <div className="px-6 py-20 text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 flex items-center justify-center text-4xl">
                  🩺
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  No doctors registered
                </h3>

                <p className="mt-2 max-w-md mx-auto text-slate-500">
                  Your medical directory is empty. Add your first doctor to
                  start building your healthcare network.
                </p>

                <button
                  onClick={() => navigate("/admin/add-doctor")}
                  className="mt-7 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
                >
                  + Add First Doctor
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-6 md:px-8 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Doctor
                      </th>

                      <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Specialty
                      </th>

                      <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Practice
                      </th>

                      <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Location
                      </th>

                      <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Experience
                      </th>

                      <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Status
                      </th>

                      <th className="text-right px-6 md:px-8 py-4 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctors.map((doctor) => (
                      <tr
                        key={doctor.id}
                        className="group border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80 transition-colors duration-200"
                      >
                        {/* DOCTOR */}
                        <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-xl font-bold text-blue-700">
                                {doctor.image ? (
                                  <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  doctor.name?.charAt(0).toUpperCase()
                                )}
                              </div>

                              <span
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                  doctor.available
                                    ? "bg-green-500"
                                    : "bg-slate-300"
                                }`}
                              ></span>
                            </div>

                            <div>
                              <p className="font-bold text-slate-800 group-hover:text-blue-700 transition">
                                {doctor.name}
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                Doctor ID #{doctor.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SPECIALIZATION */}
                        <td className="px-6 py-5">
                          <span className="inline-flex px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                            {doctor.specialization}
                          </span>
                        </td>

                        {/* HOSPITAL */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🏥</span>

                            <span className="text-sm font-medium text-slate-700">
                              {doctor.hospital}
                            </span>
                          </div>
                        </td>

                        {/* LOCATION */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span>📍</span>

                            <span>{doctor.location}</span>
                          </div>
                        </td>

                        {/* EXPERIENCE */}
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-slate-800">
                            {doctor.experience}
                            <span className="font-medium text-slate-400 ml-1">
                              years
                            </span>
                          </p>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">
                          {doctor.available ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              Unavailable
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/edit-doctor/${doctor.id}`)
                              }
                              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(doctor.id)}
                              className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM INSIGHT */}
        {doctors.length > 0 && (
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 md:p-7 text-white shadow-lg shadow-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <p className="text-blue-100 text-xs font-bold tracking-wider uppercase">
                    Network Overview
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Your healthcare network is active.
                  </h3>

                  <p className="mt-2 text-blue-100 text-sm max-w-xl">
                    {availableDoctors.length} of {doctors.length} doctors are
                    currently available for patient appointments.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center justify-center backdrop-blur">
                    <span className="text-2xl font-bold">
                      {doctors.length > 0
                        ? Math.round(
                            (availableDoctors.length / doctors.length) * 100,
                          )
                        : 0}
                      %
                    </span>

                    <span className="text-[10px] text-blue-100 uppercase tracking-wide">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6 md:p-7 text-white shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                ✦
              </div>

              <h3 className="mt-4 font-bold text-lg">Keep profiles updated</h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Accurate doctor information helps patients make confident
                healthcare decisions.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
