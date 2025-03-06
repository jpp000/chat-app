import { Navigate, Route, Routes } from "react-router-dom";
import HomeContainer from "./views/Home/HomeContainer";
import SignUpContainer from "./views/SignUp/SignUpContainer";
import LoginContainer from "./views/Login/LoginContainer";
import ProfileContainer from "./views/Profile/ProfileContainer";
import SettingsContainer from "./views/Settings/SettingsContainer";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import { useThemeStore } from "./store/useThemeStore";
import { useCookies } from "react-cookie";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const [{ token }] = useCookies(["token"]);

  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth(token);
  }, [checkAuth, token]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <NavbarContainer />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomeContainer /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpContainer /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginContainer /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/settings" element={<SettingsContainer />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
