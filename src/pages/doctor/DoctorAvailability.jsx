import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDoctorAvailability } from "../../redux/slices/doctorSlice";
import { useAuth } from "../../context/useAuth";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function DoctorAvailability() {
  const { currentUser } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.doctors.doctors);

  const doctor = doctors.find(
    (item) => item.id === (currentUser?.doctorId || currentUser?.id),
  );

  const [isAvailable, setIsAvailable] = useState(doctor?.available ?? true);

  const [selectedDays, setSelectedDays] = useState(doctor?.workingDays || []);

  const [startTime, setStartTime] = useState(doctor?.startTime || "09:00");

  const [endTime, setEndTime] = useState(doctor?.endTime || "17:00");

  const [error, setError] = useState("");

  /*
    Keep local state synchronized with the doctor
    stored in Redux.
  */
  useEffect(() => {
    if (!doctor) {
      return;
    }

    setIsAvailable(doctor.available ?? true);

    setSelectedDays(doctor.workingDays || []);

    setStartTime(doctor.startTime || "09:00");

    setEndTime(doctor.endTime || "17:00");
  }, [doctor]);

  const toggleDay = (day) => {
    setSelectedDays((previousDays) => {
      if (previousDays.includes(day)) {
        return previousDays.filter((item) => item !== day);
      }

      return [...previousDays, day];
    });

    setError("");
  };

  const handleSave = () => {
    setError("");

    if (!doctor) {
      setError("Doctor profile could not be found.");
      return;
    }

    if (!startTime || !endTime) {
      setError("Please select both consultation start and end times.");
      return;
    }

    if (startTime >= endTime) {
      setError("Consultation end time must be later than start time.");
      return;
    }

    dispatch(
      updateDoctorAvailability({
        id: doctor.id,
        available: isAvailable,
        workingDays: selectedDays,
        startTime,
        endTime,
      }),
    );

    alert("Availability updated successfully!");
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-10 text-center max-w-md">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-4xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-800">
            Doctor Profile Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            We could not find the doctor profile associated with this account.
          </p>

          <button
            onClick={() => navigate("/doctor")}
            className="mt-7 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>

        <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <p className="text-cyan-300 text-sm font-bold tracking-[0.18em]">
            DOCTOR PORTAL
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Schedule Management
          </h1>

          <p className="mt-4 text-lg text-slate-400 max-w-2xl">
            Manage your availability, working days, and consultation hours so
            patients can book at the right time.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-7">
            {/* Availability Status */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-7 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                      Appointment Status
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Availability
                    </h2>

                    <p className="mt-2 text-slate-500">
                      Control whether patients can book appointments with you.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`relative w-16 h-9 rounded-full transition-all duration-300 ${
                      isAvailable ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 ${
                        isAvailable ? "left-8" : "left-1"
                      }`}
                    ></span>
                  </button>
                </div>

                <div
                  className={`mt-7 rounded-2xl p-5 border ${
                    isAvailable
                      ? "bg-green-50 border-green-100"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isAvailable ? "bg-green-100" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isAvailable ? "bg-green-500" : "bg-slate-400"
                        }`}
                      ></span>
                    </div>

                    <div>
                      <p
                        className={`font-bold ${
                          isAvailable ? "text-green-800" : "text-slate-700"
                        }`}
                      >
                        {isAvailable
                          ? "You are accepting appointments"
                          : "You are currently unavailable"}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {isAvailable
                          ? "Patients can request appointments based on your working schedule."
                          : "Patients will not be able to book appointments with you."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Working Days */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="p-7 md:p-8">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                    Weekly Schedule
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Working Days
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Select the days when patients can schedule appointments.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {days.map((day) => {
                    const selected = selectedDays.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`p-4 rounded-2xl border text-sm font-bold transition-all duration-200 ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {selected && <span>✓</span>}

                          {day}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedDays.length === 0 && (
                  <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">⚠️</span>

                      <div>
                        <p className="font-bold text-amber-800">
                          No working days selected
                        </p>

                        <p className="text-sm text-amber-700 mt-1">
                          Patients will not be able to book appointments until
                          you select at least one working day.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Consultation Hours */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="p-7 md:p-8">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                    Consultation Schedule
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Consultation Hours
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Define the time range during which patients can request
                    appointments.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      Start Time
                    </label>

                    <input
                      type="time"
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      End Time
                    </label>

                    <input
                      type="time"
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🕐</span>

                    <div>
                      <p className="text-sm font-bold text-blue-900">
                        Current consultation window
                      </p>

                      <p className="text-sm text-blue-700 mt-1">
                        {startTime || "--:--"} to {endTime || "--:--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Error */}
            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                <div className="flex items-start gap-3">
                  <span>⚠️</span>

                  <p className="text-sm font-semibold text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Save */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Save Availability
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-7">
            {/* Doctor */}
            <section className="bg-slate-900 rounded-3xl p-7 text-white shadow-xl">
              <p className="text-xs uppercase tracking-wider font-bold text-cyan-400">
                Your Schedule
              </p>

              <h2 className="mt-3 text-xl font-bold">{doctor.name}</h2>

              <p className="mt-1 text-sm text-slate-400">
                {doctor.specialization}
              </p>

              <div className="mt-7 pt-6 border-t border-slate-700">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                  Selected Days
                </p>

                {selectedDays.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {days
                      .filter((day) => selectedDays.includes(day))
                      .map((day) => (
                        <span
                          key={day}
                          className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-slate-200"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-amber-400">
                    No working days selected
                  </p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                  Consultation Hours
                </p>

                <p className="mt-2 text-lg font-bold text-white">
                  {startTime || "--:--"} — {endTime || "--:--"}
                </p>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                ✦
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Weekly Overview
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Your availability determines when patients can request
                appointments through FindNearbyDoctor.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Working days</span>

                  <span className="font-bold text-slate-800">
                    {selectedDays.length}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Daily hours</span>

                  <span className="font-bold text-slate-800">
                    {startTime && endTime
                      ? `${startTime} - ${endTime}`
                      : "Not set"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Booking status</span>

                  <span
                    className={`font-bold ${
                      isAvailable && selectedDays.length > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {isAvailable && selectedDays.length > 0
                      ? "Accepting"
                      : "Unavailable"}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DoctorAvailability;
