import { createSlice } from "@reduxjs/toolkit";

const savedAppointments = localStorage.getItem("appointments");

const initialState = {
  appointments: savedAppointments ? JSON.parse(savedAppointments) : [],
};

const appointmentSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);

      localStorage.setItem("appointments", JSON.stringify(state.appointments));
    },

    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;

      const appointment = state.appointments.find((item) => item.id === id);

      if (appointment) {
        appointment.status = status;
      }

      localStorage.setItem("appointments", JSON.stringify(state.appointments));
    },
  },
});

export const { addAppointment, updateAppointmentStatus } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
