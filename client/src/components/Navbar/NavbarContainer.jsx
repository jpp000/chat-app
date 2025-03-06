import { useAuthStore } from "../../store/useAuthStore";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { authUser, logout } = useAuthStore();

  return <Navbar authUser={authUser} logout={logout} />;
};

export default NavbarContainer;
