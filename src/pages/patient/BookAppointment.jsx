// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { addAppointment } from "../../redux/slices/appointmentSlice";
// import { useAuth } from "../../context/useAuth";

// function BookAppointment() {
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { currentUser } = useAuth();

//   const doctors = useSelector((state) => state.doctors.doctors);

//   const doctor = doctors.find((doctor) => doctor.id === Number(id));

//   const [healthIssue, setHealthIssue] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!currentUser) {
//       alert("Please login to book an appointment.");
//       navigate("/login");
//       return;
//     }

//     const appointment = {
//       id: Date.now(),

//       // DOCTOR INFORMATION
//       doctorId: doctor.id,
//       doctorName: doctor.name,

//       // PATIENT INFORMATION
//       patientId: currentUser.id,
//       patientName: currentUser.name,

//       // APPOINTMENT INFORMATION
//       healthIssue,
//       date,
//       time,

//       // DEFAULT STATUS
//       status: "Pending",
//     };

//     dispatch(addAppointment(appointment));

//     alert("Appointment booked successfully!");

//     navigate("/patient/appointments");
//   };

//   if (!doctor) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
//           <div className="text-5xl mb-5">🩺</div>

//           <h1 className="text-2xl font-bold text-slate-800">
//             Doctor Not Found
//           </h1>

//           <p className="mt-2 text-slate-500">
//             The doctor you're looking for doesn't exist.
//           </p>

//           <button
//             onClick={() => navigate("/patient")}
//             className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//           >
//             Back to Doctors
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* HERO */}
//       <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
//         <div className="max-w-5xl mx-auto px-6 py-12">
//           <p className="text-cyan-300 text-sm font-semibold tracking-wide">
//             FINDNEARBYDOCTOR
//           </p>

//           <h1 className="mt-3 text-4xl md:text-5xl font-bold">
//             Book an Appointment
//           </h1>

//           <p className="mt-4 text-blue-100 text-lg">
//             Schedule your consultation with a trusted doctor.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <main className="max-w-5xl mx-auto px-6 py-10">
//         <button
//           onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
//           className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition"
//         >
//           ← Back to Doctor Profile
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
//           {/* DOCTOR CARD */}
//           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-fit">
//             <div className="w-20 h-20 rounded-2xl overflow-hidden bg-blue-100 flex items-center justify-center mx-auto">
//               {doctor.image ? (
//                 <img
//                   src={doctor.image}
//                   alt={doctor.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-4xl">👨‍⚕️</span>
//               )}
//             </div>

//             <div className="text-center mt-5">
//               <h2 className="text-xl font-bold text-slate-800">
//                 {doctor.name}
//               </h2>

//               <p className="text-blue-600 font-semibold mt-1">
//                 {doctor.specialization}
//               </p>

//               <p className="text-sm text-slate-500 mt-3">
//                 🏥 {doctor.hospital}
//               </p>

//               <p className="text-sm text-slate-500 mt-1">
//                 📍 {doctor.location}
//               </p>
//             </div>

//             <div className="mt-6 pt-5 border-t border-slate-100">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-500">Consultation</span>

//                 <span className="font-bold text-slate-800">
//                   ₹{doctor.consultationFee}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm mt-3">
//                 <span className="text-slate-500">Experience</span>

//                 <span className="font-bold text-slate-800">
//                   {doctor.experience} years
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* BOOKING FORM */}
//           <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-7 md:p-8">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">
//                 Appointment Details
//               </h2>

//               <p className="text-slate-500 mt-1">
//                 Tell us a little about your visit.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//               {/* HEALTH ISSUE */}
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-slate-700">
//                   Health Issue
//                 </label>

//                 <input
//                   type="text"
//                   value={healthIssue}
//                   onChange={(event) => setHealthIssue(event.target.value)}
//                   placeholder="Example: Headache, fever, skin problem..."
//                   className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
//                   required
//                 />
//               </div>

//               {/* DATE + TIME */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-slate-700">
//                     Appointment Date
//                   </label>

//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(event) => setDate(event.target.value)}
//                     className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 text-sm font-semibold text-slate-700">
//                     Preferred Time
//                   </label>

//                   <input
//                     type="time"
//                     value={time}
//                     onChange={(event) => setTime(event.target.value)}
//                     className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* PATIENT PREVIEW */}
//               <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
//                 <p className="text-xs uppercase tracking-wide text-blue-500 font-bold">
//                   Booking as
//                 </p>

//                 <p className="mt-1 font-bold text-blue-900">
//                   {currentUser?.name}
//                 </p>

//                 <p className="text-sm text-blue-700 mt-1">
//                   {currentUser?.email}
//                 </p>
//               </div>

//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
//               >
//                 Confirm Appointment →
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default BookAppointment;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAppointment } from "../../redux/slices/appointmentSlice";
import { useAuth } from "../../context/useAuth";

function BookAppointment() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const doctors = useSelector((state) => state.doctors.doctors);

  const doctor = doctors.find((doctor) => doctor.id === Number(id));

  const [healthIssue, setHealthIssue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Get today's date for the minimum appointment date
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Login check
    if (!currentUser) {
      alert("Please login to book an appointment.");

      navigate("/login");

      return;
    }

    // Doctor check
    if (!doctor) {
      alert("Doctor not found.");

      return;
    }

    // ------------------------------------------------
    // 1. CHECK OVERALL DOCTOR AVAILABILITY
    // ------------------------------------------------

    if (!doctor.available) {
      alert(`${doctor.name} is currently unavailable for appointments.`);

      return;
    }

    // ------------------------------------------------
    // 2. CHECK WORKING DAYS
    // ------------------------------------------------

    if (!Array.isArray(doctor.workingDays) || doctor.workingDays.length === 0) {
      alert(
        `${doctor.name} is not available on any working day. Please choose another doctor.`,
      );

      return;
    }

    // ------------------------------------------------
    // 3. CHECK DATE
    // ------------------------------------------------

    if (!date) {
      alert("Please select an appointment date.");

      return;
    }

    // ------------------------------------------------
    // 4. CHECK WHETHER SELECTED DATE IS A WORKING DAY
    // ------------------------------------------------

    const selectedDate = new Date(`${date}T00:00:00`);

    const selectedDay = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!doctor.workingDays.includes(selectedDay)) {
      alert(
        `${doctor.name} is not available on ${selectedDay}. Please select another date.`,
      );

      return;
    }

    // ------------------------------------------------
    // 5. CHECK CONSULTATION HOURS
    // ------------------------------------------------

    if (!doctor.startTime || !doctor.endTime) {
      alert(`${doctor.name}'s consultation hours are not configured.`);

      return;
    }

    // ------------------------------------------------
    // 6. CHECK SELECTED TIME
    // ------------------------------------------------

    if (!time) {
      alert("Please select an appointment time.");

      return;
    }

    /*
      Because HTML time input returns HH:mm,
      string comparison works correctly.

      Example:

      09:00 < 10:30
      10:30 < 17:00
    */

    if (time < doctor.startTime || time > doctor.endTime) {
      alert(
        `${doctor.name} is available on ${selectedDay} only from ${doctor.startTime} to ${doctor.endTime}. Please select another time.`,
      );

      return;
    }

    // ------------------------------------------------
    // 7. EVERYTHING IS VALID
    // ------------------------------------------------

    const appointment = {
      id: Date.now(),

      doctorId: doctor.id,

      doctorName: doctor.name,

      patientId: currentUser.id,

      patientName: currentUser.name,

      healthIssue,

      date,

      time,

      status: "Pending",
    };

    dispatch(addAppointment(appointment));

    alert("Appointment booked successfully!");

    navigate("/patient/appointments");
  };

  // Doctor not found
  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
          <div className="text-5xl mb-5">🩺</div>

          <h1 className="text-2xl font-bold text-slate-800">
            Doctor Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The doctor you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/patient")}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-cyan-300 text-sm font-semibold tracking-wide">
            FINDNEARBYDOCTOR
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold">
            Book an Appointment
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Schedule your consultation with a trusted doctor.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
          className="mb-8 text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          ← Back to Doctor Profile
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* DOCTOR CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-fit">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-blue-100 flex items-center justify-center mx-auto">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">👨‍⚕️</span>
              )}
            </div>

            <div className="text-center mt-5">
              <h2 className="text-xl font-bold text-slate-800">
                {doctor.name}
              </h2>

              <p className="text-blue-600 font-semibold mt-1">
                {doctor.specialization}
              </p>

              <p className="text-sm text-slate-500 mt-3">
                🏥 {doctor.hospital}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                📍 {doctor.location}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Consultation</span>

                <span className="font-bold text-slate-800">
                  ₹{doctor.consultationFee}
                </span>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <span className="text-slate-500">Experience</span>

                <span className="font-bold text-slate-800">
                  {doctor.experience} years
                </span>
              </div>
            </div>

            {/* AVAILABILITY SUMMARY */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                Availability
              </p>

              {!doctor.available ? (
                <div className="mt-3 rounded-xl bg-red-50 border border-red-100 p-3">
                  <p className="text-sm font-bold text-red-700">
                    Currently unavailable
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-3 rounded-xl bg-green-50 border border-green-100 p-3">
                    <p className="text-sm font-bold text-green-700">
                      Accepting appointments
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    <span className="font-semibold text-slate-700">Days:</span>{" "}
                    {doctor.workingDays?.length > 0
                      ? doctor.workingDays.join(", ")
                      : "No working days selected"}
                  </p>

                  {doctor.startTime && doctor.endTime && (
                    <p className="text-xs text-slate-500 mt-2">
                      <span className="font-semibold text-slate-700">
                        Hours:
                      </span>{" "}
                      {doctor.startTime} – {doctor.endTime}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* BOOKING FORM */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-7 md:p-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Appointment Details
              </h2>

              <p className="text-slate-500 mt-1">
                Tell us a little about your visit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* HEALTH ISSUE */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Health Issue
                </label>

                <input
                  type="text"
                  value={healthIssue}
                  onChange={(event) => setHealthIssue(event.target.value)}
                  placeholder="Example: Headache, fever, skin problem..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                />
              </div>

              {/* DATE + TIME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(event) => setDate(event.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />

                  {doctor.workingDays?.length > 0 && (
                    <p className="text-xs text-slate-400 mt-2">
                      Working days: {doctor.workingDays.join(", ")}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    min={doctor.startTime || undefined}
                    max={doctor.endTime || undefined}
                    onChange={(event) => setTime(event.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />

                  {doctor.startTime && doctor.endTime && (
                    <p className="text-xs text-slate-400 mt-2">
                      Consultation hours: {doctor.startTime} – {doctor.endTime}
                    </p>
                  )}
                </div>
              </div>

              {/* AVAILABILITY NOTICE */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">🕐</span>

                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Check doctor availability
                    </p>

                    <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                      Your selected date must be one of the doctor's working
                      days and your selected time must fall within the
                      consultation hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* USER */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                  Booking as
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {currentUser?.name}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {currentUser?.email}
                </p>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
              >
                Confirm Appointment →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookAppointment;
