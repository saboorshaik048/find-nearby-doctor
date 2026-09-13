import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const defaultUsers = [
    {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "Dr. Anil Kumar",
      email: "doctor@gmail.com",
      password: "doctor123",
      role: "doctor",
      doctorId: 1,
    },
    {
      id: 3,
      name: "Demo Patient",
      email: "patient@gmail.com",
      password: "patient123",
      role: "patient",
    },
  ];

  const savedUsers = localStorage.getItem("users");

  const [users, setUsers] = useState(
    savedUsers ? JSON.parse(savedUsers) : defaultUsers,
  );

  const savedCurrentUser = localStorage.getItem("currentUser");

  const [currentUser, setCurrentUser] = useState(
    savedCurrentUser ? JSON.parse(savedCurrentUser) : null,
  );

  // LOGIN
  const login = (email, password) => {
    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) {
      return false;
    }

    setCurrentUser(user);

    localStorage.setItem("currentUser", JSON.stringify(user));

    return true;
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // REGISTER PATIENT
  const register = (name, email, password) => {
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      return false;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "patient",
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return true;
  };

  // ADD USER
  // Used by Admin when creating doctor accounts
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: user.id || Date.now(),
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        register,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
