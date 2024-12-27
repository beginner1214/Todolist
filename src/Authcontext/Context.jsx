import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on app load
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Signup function
  const signup = async (signupData) => {
    try {
      const response = await fetch("http://localhost:5005/api/signup", {
        method: "POST",
        body: signupData,
        // Remove credentials: 'include' for now
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Login function

  // In your AuthProvider
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5005/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
      const data = await response.json();
      const userData = {
        ...data.user,
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard"); // Add this line
    } catch (error) {
      throw error;
    }
  };
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
