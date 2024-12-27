import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Pages/Sidebar";
import { Profile } from "./Pages/Profile";
import AuthProvider from "./Authcontext/Context";
import Signups from "./Pages/Signup";
import Login from "./Pages/Login";
import ProtectedRoute from "./Pages/Protectedroute";
import { useAuth } from "./Authcontext/Context";
import { SettingsProvider } from './Authcontext/SettingContext';
import Settings from "./Pages/Settings";

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      {/* Only show sidebar if user is authenticated */}
      {user && <Sidebar />}
      <div className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" replace /> : <Signups />}
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
           <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to appropriate page */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
