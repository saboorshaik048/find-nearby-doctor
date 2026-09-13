import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.doctors.doctors);

  const doctor = doctors.find((doctor) => doctor.id === Number(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>

          <button
            onClick={() => navigate("/patient")}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/patient")}
          className="mb-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to Doctors
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Doctor Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shrink-0">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl">👨‍⚕️</span>
              )}
            </div>

            {/* Doctor Information */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {doctor.name}
              </h1>

              <p className="text-blue-600 text-lg font-medium mt-1">
                {doctor.specialization}
              </p>

              <p className="text-gray-600 mt-3">🏥 {doctor.hospital}</p>

              <p className="text-gray-600 mt-1">📍 {doctor.location}</p>

              <div className="mt-4">
                {doctor.available ? (
                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    ● Available
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    ● Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Doctor Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-lg font-semibold text-gray-800">
                  {doctor.experience} years
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-lg font-semibold text-gray-800">
                  ⭐ {doctor.rating} / 5
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{doctor.consultationFee}
                </p>
              </div>
            </div>

            {/* Health Issues */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Health Issues
              </h2>

              <div className="flex flex-wrap gap-2">
                {doctor.healthIssues.map((issue, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Appointment */}
            {doctor.available && (
              <button
                onClick={() => navigate(`/patient/book/${doctor.id}`)}
                className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
