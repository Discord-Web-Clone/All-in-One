import Chatting from "../components/chating/chatting";
import Chatting2 from "../components/chating/chatting2";
import * as _ from "./style";
import { useState } from "react";

const Layout = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("Nomal");

  return (
    <_.Container>
      <_.ChannelNav>
        <_.Header>WebPrograming</_.Header>

        <_.Body>
          <_.Channel>
            <_.SubText>Chatting Channel</_.SubText>
            <_.ChannelName
              onClick={() => {
                setSelectedChannel("Nomal");
              }}
              isClicked={selectedChannel === "Nomal"}
            >
              <_.Icon>numbers</_.Icon> Nomal
            </_.ChannelName>

            <_.ChannelName
              onClick={() => {
                setSelectedChannel("Nomal2");
              }}
              isClicked={selectedChannel === "Nomal2"}
            >
              <_.Icon>numbers</_.Icon> Nomal2
            </_.ChannelName>
          </_.Channel>

          <_.Channel>
            <_.SubText>Voice Channel</_.SubText>
            <_.VoiceChannelName>
              <_.Icon>adaptive_audio_mic</_.Icon> Nomal
            </_.VoiceChannelName>
          </_.Channel>
        </_.Body>
      </_.ChannelNav>

      {selectedChannel === "Nomal" ? (
        <Chatting />
      ) : selectedChannel === "Nomal2" ? (
        <Chatting2 />
      ) : (
        <h1>Error</h1>
      )}
    </_.Container>
  );
};

export default Layout;
