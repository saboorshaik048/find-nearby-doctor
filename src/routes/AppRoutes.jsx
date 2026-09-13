import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorProfile from "../pages/patient/DoctorProfile";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAvailability from "../pages/doctor/DoctorAvailability";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AddDoctor from "../pages/admin/AddDoctor";
import EditDoctor from "../pages/admin/EditDoctor";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* ================= PATIENT ROUTES ================= */}

      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/doctor/:id"
        element={
          <ProtectedRoute role="patient">
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/book/:id"
        element={
          <ProtectedRoute role="patient">
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute role="patient">
            <MyAppointments />
          </ProtectedRoute>
        }
      />

      {/* ================= DOCTOR ROUTES ================= */}

      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/availability"
        element={
          <ProtectedRoute role="doctor">
            <DoctorAvailability />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-doctor"
        element={
          <ProtectedRoute role="admin">
            <AddDoctor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-doctor/:id"
        element={
          <ProtectedRoute role="admin">
            <EditDoctor />
          </ProtectedRoute>
        }
      />

      {/* ================= AUTH ROUTES ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
