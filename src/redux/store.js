import { configureStore } from "@reduxjs/toolkit";

import appointmentReducer from "./slices/appointmentSlice";
import doctorReducer from "./slices/doctorSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    doctors: doctorReducer,
  },
});
