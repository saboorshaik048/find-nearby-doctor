import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentStatus } from "../../redux/slices/appointmentSlice";
import { useAuth } from "../../context/useAuth";

function DoctorDashboard() {
  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const appointments = useSelector((state) => state.appointments.appointments);

  const doctorAppointments = appointments.filter(
    (appointment) =>
      appointment.doctorId === (currentUser.doctorId || currentUser.id),
  );

  const pendingAppointments = doctorAppointments.filter(
    (appointment) => appointment.status === "Pending",
  );

  const acceptedAppointments = doctorAppointments.filter(
    (appointment) => appointment.status === "Accepted",
  );

  const rejectedAppointments = doctorAppointments.filter(
    (appointment) => appointment.status === "Rejected",
  );

  const handleStatusChange = (id, status) => {
    dispatch(
      updateAppointmentStatus({
        id,
        status,
      }),
    );
  };

  const AppointmentCard = ({ appointment, showActions = false }) => {
    return (
      <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        {/* Top accent */}
        <div
          className={`h-1 ${
            appointment.status === "Pending"
              ? "bg-yellow-400"
              : appointment.status === "Accepted"
                ? "bg-green-500"
                : "bg-red-500"
          }`}
        ></div>

        <div className="p-6">
          {/* Patient Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 flex items-center justify-center text-xl font-bold shrink-0">
                {appointment.patientName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Patient
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {appointment.patientName}
                </h3>
              </div>
            </div>

            {/* Status */}
            <span
              className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-sm font-semibold ${
                appointment.status === "Pending"
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : appointment.status === "Accepted"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  appointment.status === "Pending"
                    ? "bg-yellow-500"
                    : appointment.status === "Accepted"
                      ? "bg-green-500"
                      : "bg-red-500"
                }`}
              ></span>

              {appointment.status}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                Health Issue
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {appointment.healthIssue}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                Date
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                📅 {appointment.date}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                Time
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                ⏰ {appointment.time}
              </p>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleStatusChange(appointment.id, "Accepted")}
                className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                ✓ Accept Appointment
              </button>

              <button
                onClick={() => handleStatusChange(appointment.id, "Rejected")}
                className="flex-1 py-3 rounded-xl bg-white text-red-600 font-semibold border border-red-200 hover:bg-red-50 hover:-translate-y-0.5 transition-all duration-300"
              >
                ✕ Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-400 rounded-full opacity-10 blur-3xl"></div>

        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-900 border border-blue-700 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>

                <span className="text-blue-100 text-sm font-semibold">
                  Doctor Portal
                </span>
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
                Good day, Dr. {currentUser.name}
              </h1>

              <p className="mt-4 text-blue-100 text-lg max-w-2xl">
                Manage your appointments, review patient requests, and keep your
                schedule organized.
              </p>
            </div>

            {/* Appointment count */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-6 py-5 min-w-48">
              <p className="text-blue-200 text-sm font-medium">
                Total Appointments
              </p>

              <p className="text-4xl font-bold mt-1">
                {doctorAppointments.length}
              </p>

              <p className="text-blue-200 text-xs mt-1">Patient requests</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ===================================================
            STAT CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-2">
          {/* Pending */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Pending Requests
                </p>

                <h2 className="text-4xl font-bold text-slate-800 mt-3">
                  {pendingAppointments.length}
                </h2>

                <p className="text-xs text-yellow-600 font-medium mt-2">
                  Waiting for your response
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-2xl">
                ⏳
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Accepted</p>

                <h2 className="text-4xl font-bold text-slate-800 mt-3">
                  {acceptedAppointments.length}
                </h2>

                <p className="text-xs text-green-600 font-medium mt-2">
                  Confirmed appointments
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                ✓
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Rejected</p>

                <h2 className="text-4xl font-bold text-slate-800 mt-3">
                  {rejectedAppointments.length}
                </h2>

                <p className="text-xs text-red-600 font-medium mt-2">
                  Declined requests
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                ✕
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            PENDING
        ==================================================== */}

        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-800">
                  Pending Appointments
                </h2>

                {pendingAppointments.length > 0 && (
                  <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    {pendingAppointments.length}
                  </span>
                )}
              </div>

              <p className="text-slate-500 mt-1">
                Review and respond to new patient requests.
              </p>
            </div>
          </div>

          {pendingAppointments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-50 flex items-center justify-center text-3xl">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                You're all caught up
              </h3>

              <p className="mt-2 text-slate-500">
                There are no pending appointment requests.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {pendingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </section>

        {/* ===================================================
            ACCEPTED
        ==================================================== */}

        <section className="mt-14">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Accepted Appointments
              </h2>

              {acceptedAppointments.length > 0 && (
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                  {acceptedAppointments.length}
                </span>
              )}
            </div>

            <p className="text-slate-500 mt-1">
              Confirmed appointments with your patients.
            </p>
          </div>

          {acceptedAppointments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
              No accepted appointments yet.
            </div>
          ) : (
            <div className="space-y-5">
              {acceptedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </section>

        {/* ===================================================
            REJECTED
        ==================================================== */}

        <section className="mt-14 pb-10">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Rejected Appointments
              </h2>

              {rejectedAppointments.length > 0 && (
                <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold">
                  {rejectedAppointments.length}
                </span>
              )}
            </div>

            <p className="text-slate-500 mt-1">
              Appointment requests that were declined.
            </p>
          </div>

          {rejectedAppointments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
              No rejected appointments.
            </div>
          ) : (
            <div className="space-y-5">
              {rejectedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DoctorDashboard;
