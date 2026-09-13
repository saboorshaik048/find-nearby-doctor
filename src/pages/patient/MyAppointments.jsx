import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function MyAppointments() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const allAppointments = useSelector(
    (state) => state.appointments.appointments,
  );

  // Only show appointments belonging to the logged-in patient
  const appointments = allAppointments.filter(
    (appointment) => appointment.patientId === currentUser?.id,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-14">
          <p className="text-cyan-300 font-semibold tracking-wide text-sm">
            FINDNEARBYDOCTOR
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold">
            My Appointments
          </h1>

          <p className="mt-4 text-blue-100 text-lg max-w-2xl">
            View and track your upcoming and previous doctor appointments.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => navigate("/patient")}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            ← Back to Doctors
          </button>

          {appointments.length > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {appointments.length} appointment
              {appointments.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* EMPTY STATE */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 md:p-16 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">
              📅
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              No appointments yet
            </h2>

            <p className="mt-2 text-slate-500 max-w-md mx-auto leading-relaxed">
              You haven't booked any appointments yet. Find a doctor and
              schedule your first consultation.
            </p>

            <button
              onClick={() => navigate("/patient")}
              className="mt-7 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Find a Doctor
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {/* TOP STATUS LINE */}
                <div
                  className={`h-1 ${
                    appointment.status === "Accepted"
                      ? "bg-green-500"
                      : appointment.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-400"
                  }`}
                ></div>

                <div className="p-6 md:p-7">
                  {/* HEADER */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl shrink-0">
                        🩺
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                          Doctor
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-800">
                          {appointment.doctorName}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Patient:{" "}
                          <span className="font-semibold text-slate-700">
                            {appointment.patientName}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-sm font-bold ${
                        appointment.status === "Accepted"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : appointment.status === "Rejected"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          appointment.status === "Accepted"
                            ? "bg-green-500"
                            : appointment.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      ></span>

                      {appointment.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                        Health Issue
                      </p>

                      <p className="mt-2 text-slate-700 font-semibold">
                        {appointment.healthIssue}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                        Date
                      </p>

                      <p className="mt-2 text-slate-700 font-semibold">
                        📅 {appointment.date}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                        Time
                      </p>

                      <p className="mt-2 text-slate-700 font-semibold">
                        🕐 {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="border-t border-slate-100 px-6 md:px-7 py-4 bg-slate-50/80">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-sm text-slate-500">Appointment Status</p>

                    <p
                      className={`text-sm font-bold ${
                        appointment.status === "Accepted"
                          ? "text-green-600"
                          : appointment.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {appointment.status === "Accepted"
                        ? "Your appointment has been accepted."
                        : appointment.status === "Rejected"
                          ? "Your appointment was rejected."
                          : "Waiting for doctor confirmation."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyAppointments;
