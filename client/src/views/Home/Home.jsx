import ChatContainer from "../../components/ChatContainer/ChatContainer";
import NoChatSelected from "../../components/NoChatSelected/NoChatSelected";
import SidebarContainer from "../../components/Sidebar/SidebarContainer";

const Home = ({ selectedUser }) => {
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SidebarContainer />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
