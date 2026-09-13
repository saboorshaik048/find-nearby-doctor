import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition">
      {/* Doctor Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl">👨‍⚕️</span>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>

          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="mt-5 space-y-3 text-sm text-gray-600">
        <p>
          🏥 <span className="font-medium">{doctor.hospital}</span>
        </p>

        <div className="flex items-center justify-between gap-3">
          <p>📍 {doctor.location}</p>

          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs whitespace-nowrap">
            {doctor.distance} km away
          </span>
        </div>

        <p>💼 {doctor.experience} years experience</p>

        <p>⭐ {doctor.rating} / 5</p>

        <p>💰 ₹{doctor.consultationFee} consultation</p>
      </div>

      {/* Availability */}
      <div className="mt-5">
        {doctor.available ? (
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            ● Available
          </span>
        ) : (
          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            ● Unavailable
          </span>
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Profile
      </button>
    </div>
  );
}

export default DoctorCard;
