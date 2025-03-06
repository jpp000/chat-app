import { useChatStore } from "../../store/useChatStore";
import Home from "./Home";

const HomeContainer = () => {
  const { selectedUser } = useChatStore();

  return <Home selectedUser={selectedUser} />;
};

export default HomeContainer;
