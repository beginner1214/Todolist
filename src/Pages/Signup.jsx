import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext/Context";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const signupData = new FormData();
    signupData.append("username", formData.username);
    signupData.append("email", formData.email);
    signupData.append("password", formData.password);
    if (formData.profilePicture) {
      signupData.append("profilePicture", formData.profilePicture);
    }

    setLoading(true);
    try {
      await signup(signupData); // Use the context's signup function
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          Sign Up
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {["username", "email", "password", "confirmPassword"].map((field) => (
            <div key={field} className="mb-4">
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace("Password", " Password")
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="mb-4">
            <input
              type="file"
              name="profilePicture"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
