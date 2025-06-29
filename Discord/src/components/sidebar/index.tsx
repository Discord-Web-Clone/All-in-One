import * as _ from "./style";
import Discord from "../../assets/Discord/Discord.svg";
import { useState } from "react";

interface SidebarProps {
  onServerSelect: (server: string) => void;
}

const Sidebar = ({ onServerSelect }: SidebarProps) => {
  const [server, setServer] = useState("dm");

  const handleServerSelect = (selectedServer: string) => {
    setServer(selectedServer);
    onServerSelect(selectedServer);
  };

  return (
    <_.Container>
      <_.ChannelBox
        onClick={() => handleServerSelect("dm")}
        style={{
          backgroundColor:
            server === "dm" ? "var(--Blue-10)" : "var(--Selected)",
        }}
      >
        <_.DMIcon src={Discord} />
      </_.ChannelBox>
      <_.Line />
      <_.ChannelBox
        onClick={() => handleServerSelect("server")}
        style={{
          backgroundColor:
            server === "server" ? "var(--Blue-10)" : "var(--Selected)",
        }}
      >
        웹
      </_.ChannelBox>
    </_.Container>
  );
};

export default Sidebar;
