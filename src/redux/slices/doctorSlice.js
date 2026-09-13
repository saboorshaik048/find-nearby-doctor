import { createSlice } from "@reduxjs/toolkit";
import defaultDoctors from "../../data/doctors";

const savedDoctors = localStorage.getItem("doctors");

let doctorsFromStorage = savedDoctors
  ? JSON.parse(savedDoctors)
  : defaultDoctors;

doctorsFromStorage = doctorsFromStorage.map((doctor) => ({
  ...doctor,

  workingDays: Array.isArray(doctor.workingDays)
    ? doctor.workingDays
    : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

  startTime: doctor.startTime || "09:00",

  endTime: doctor.endTime || "17:00",

  available: typeof doctor.available === "boolean" ? doctor.available : true,
}));

localStorage.setItem("doctors", JSON.stringify(doctorsFromStorage));

const initialState = {
  doctors: doctorsFromStorage,
};

const doctorSlice = createSlice({
  name: "doctors",

  initialState,

  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);

      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },

    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter(
        (doctor) => doctor.id !== action.payload,
      );

      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },

    updateDoctor: (state, action) => {
      const index = state.doctors.findIndex(
        (doctor) => doctor.id === action.payload.id,
      );

      if (index !== -1) {
        state.doctors[index] = {
          ...state.doctors[index],
          ...action.payload,
        };
      }

      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },

    updateDoctorAvailability: (state, action) => {
      const { id, available, workingDays, startTime, endTime } = action.payload;

      const doctor = state.doctors.find((item) => item.id === id);

      if (doctor) {
        doctor.available = available;

        doctor.workingDays = Array.isArray(workingDays) ? workingDays : [];

        doctor.startTime = startTime;

        doctor.endTime = endTime;
      }

      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },
  },
});

export const {
  addDoctor,
  deleteDoctor,
  updateDoctor,
  updateDoctorAvailability,
} = doctorSlice.actions;

export default doctorSlice.reducer;
