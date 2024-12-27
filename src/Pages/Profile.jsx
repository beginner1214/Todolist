import { AuthContext } from "../Authcontext/Context";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios"; // Add this import

export const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    contact: user?.contact || "",
    sex: user?.sex || "",
    bio: user?.bio || "",
  });
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const token = user?.token; // Get token from user object instead
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const response = await axios.put(
        "http://localhost:5005/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data && response.data.user) {
        // Keep the token when updating user data
        const updatedUserData = {
          ...response.data.user,
          token: token // Preserve the token
        };
        setUser(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setEditing(false);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again."
      );
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user instead of token
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4">
            <img
              src={
                user?.profilePicture?.startsWith("http")
                  ? user.profilePicture
                  : `http://localhost:5005${user?.profilePicture}` ||
                    "/api/placeholder/128/128"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  className="mt-1 w-full p-2 border rounded"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  className="mt-1 w-full p-2 border rounded"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sex
                </label>
                <select
                  className="mt-1 w-full p-2 border rounded"
                  value={formData.sex}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full p-2 border rounded"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                className="mt-1 w-full p-2 border rounded"
                rows="4"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{user?.contact || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sex</p>
                <p className="font-medium">{user?.sex || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Bio</p>
              <p className="font-medium">{user?.bio || "No bio added"}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setEditing(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
