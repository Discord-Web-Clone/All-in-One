import { useState } from "react";
import Sidebar from "./components/sidebar";
import UserProfile from "./components/userprofile";
import Layout from "./layout";
import { Auth } from "./components/login";
import { SocketProvider } from "./hooks/SocketProvider";

function App() {
  const [selectedServer, setSelectedServer] = useState<string | null>("dm");

  return (
    <SocketProvider>
      {selectedServer === "server" && <UserProfile />}
      <Sidebar onServerSelect={setSelectedServer} />
      {selectedServer === "server" && <Layout />}
      {selectedServer === "dm" && (
        <div style={{ padding: "32px", flex: 1 }}>
          <Auth />
        </div>
      )}
    </SocketProvider>
  );
}

export default App;
