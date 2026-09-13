# FindNearbyDoctor

A modern doctor discovery and appointment booking web application built with React, Vite, Redux Toolkit, Tailwind CSS, and Bootstrap.

FindNearbyDoctor allows patients to discover doctors based on health issues, specialties, and nearby location, view doctor profiles, and book appointments. It also provides dedicated dashboards for patients, doctors, and administrators.

---

## Features

### Patient

- Search doctors by:
  - Doctor name
  - Specialization
  - Health issue
- View all doctors
- Find nearby doctors
- View detailed doctor profiles
- View doctor availability
- Book appointments
- View personal appointments
- Track appointment status
- Patient-specific appointment history

### Doctor

- Doctor dashboard
- View appointment statistics
- View pending appointments
- Accept appointments
- Reject appointments
- View patient information
- View health issues mentioned by patients
- Manage availability
- Select working days
- Set consultation hours
- View appointment history

### Admin

- Admin dashboard
- View total doctors
- Monitor doctor availability
- View combined doctor experience
- Add new doctors
- Edit doctor information
- Delete doctors
- Upload doctor profile images
- Manage doctor directory
- Create doctor login credentials

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- React Router DOM

### State Management

- Redux Toolkit
- React Redux
- React Context API

### Styling

- Tailwind CSS
- Bootstrap
- Responsive design

### Storage

- Browser LocalStorage
- Mock data

---

## Project Structure

```text
find-nearby-doctor/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── doctor/
│   │   └── appointment/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── useAuth.js
│   │
│   ├── data/
│   │   └── doctors.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AddDoctor.jsx
│   │   │   └── EditDoctor.jsx
│   │   │
│   │   ├── doctor/
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── DoctorAvailability.jsx
│   │   │
│   │   ├── patient/
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorProfile.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   └── MyAppointments.jsx
│   │   │
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── doctorSlice.js
│   │       └── appointmentSlice.js
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saboorshaik048/find-nearby-doctor.git
```

2. Navigate to the project folder:
```bash
cd find-nearby-doctor
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and go to:
```
http://localhost:5173
```

---

## Demo Credentials

| Role    | Email               | Password |
|---------|---------------------|----------|
| Patient | patient@example.com | 123456   |
| Doctor  | doctor@example.com  | 123456   |
| Admin   | admin@example.com   | admin123 |

> Replace the above with your actual credentials from `src/context/AuthContext.jsx`.

---
## Live Demo

🔗 [Coming soon](#)

> Update this link after deploying to Vercel or Netlify.

---

## Note

> This project is frontend-only. All data is stored in the browser's **localStorage** using mock data — there is no backend server.

---

## Author

**Saboor Shaik**
- GitHub: [@saboorshaik048](https://github.com/saboorshaik048)

