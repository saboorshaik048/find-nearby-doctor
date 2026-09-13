import doctor1 from "../assets/images/doctor-1.jpg";
import doctor2 from "../assets/images/doctor-2.jpg";
import doctor3 from "../assets/images/doctor-3.jpg";
import doctor4 from "../assets/images/doctor-4.jpg";
import doctor5 from "../assets/images/doctor-5.jpg";
import doctor6 from "../assets/images/doctor-6.jpg";
import doctor7 from "../assets/images/doctor-7.jpg";
import doctor8 from "../assets/images/doctor-8.jpg";

const doctors = [
  {
    id: 1,
    name: "Dr. Anil Kumar",
    specialization: "Cardiologist",
    healthIssues: ["Chest Pain", "Heart Disease", "Blood Pressure"],
    hospital: "City Care Hospital",
    location: "Hyderabad",
    distance: 2.4,
    experience: 12,
    rating: 4.8,
    consultationFee: 600,
    available: true,
    image: doctor1,
  },

  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    healthIssues: ["Acne", "Skin Allergy", "Hair Loss"],
    hospital: "MediLife Clinic",
    location: "Hyderabad",
    distance: 3.1,
    experience: 8,
    rating: 4.7,
    consultationFee: 500,
    available: true,
    image: doctor2,
  },

  {
    id: 3,
    name: "Dr. Rahul Reddy",
    specialization: "General Physician",
    healthIssues: ["Fever", "Cold", "Headache", "Body Pain"],
    hospital: "Sunrise Medical Center",
    location: "Hyderabad",
    distance: 1.8,
    experience: 10,
    rating: 4.6,
    consultationFee: 400,
    available: true,
    image: doctor3,
  },

  {
    id: 4,
    name: "Dr. Sneha Rao",
    specialization: "Neurologist",
    healthIssues: ["Migraine", "Headache", "Nerve Problems"],
    hospital: "Apollo Care Clinic",
    location: "Hyderabad",
    distance: 5.2,
    experience: 15,
    rating: 4.9,
    consultationFee: 800,
    available: false,
    image: doctor4,
  },

  {
    id: 5,
    name: "Dr. Arjun Patel",
    specialization: "Orthopedic",
    healthIssues: ["Back Pain", "Joint Pain", "Arthritis", "Bone Problems"],
    hospital: "Health Plus Hospital",
    location: "Hyderabad",
    distance: 4.3,
    experience: 11,
    rating: 4.7,
    consultationFee: 650,
    available: true,
    image: doctor5,
  },

  {
    id: 6,
    name: "Dr. Meera Singh",
    specialization: "Pediatrician",
    healthIssues: ["Child Fever", "Child Cold", "Child Health"],
    hospital: "Little Stars Hospital",
    location: "Hyderabad",
    distance: 6.1,
    experience: 9,
    rating: 4.8,
    consultationFee: 550,
    available: true,
    image: doctor6,
  },

  {
    id: 7,
    name: "Dr. Vikram Rao",
    specialization: "ENT Specialist",
    healthIssues: ["Ear Pain", "Sinus", "Sore Throat", "Hearing Problems"],
    hospital: "Carewell Hospital",
    location: "Hyderabad",
    distance: 3.7,
    experience: 13,
    rating: 4.6,
    consultationFee: 500,
    available: true,
    image: doctor7,
  },

  {
    id: 8,
    name: "Dr. Kavya Reddy",
    specialization: "Gynecologist",
    healthIssues: ["Women's Health", "Pregnancy", "Menstrual Problems"],
    hospital: "Mother Care Hospital",
    location: "Hyderabad",
    distance: 7.2,
    experience: 14,
    rating: 4.9,
    consultationFee: 700,
    available: true,
    image: doctor8,
  },
];

export default doctors;
