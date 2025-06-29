import { Member } from "../member";
import * as _ from "./style";
const Chatting2 = () => {
  return (
    <_.Container>
      <_.Header>
        <_.Icon>numbers</_.Icon>
        <_.Tittle>Nomal2</_.Tittle>
      </_.Header>

      <_.BodyBox>
        <_.ChattingBox>
          <_.Body>
            <_.Welcome>
              <_.ChannelProfile>numbers</_.ChannelProfile>
              <_.WelcomeMessage>Welcome to #Nomal2</_.WelcomeMessage>
              <_.SubWelcomeMessage>
                This is the start of the #Nomal2 channel.
              </_.SubWelcomeMessage>
            </_.Welcome>
            {/* <_.Chats></_.Chats> */}
          </_.Body>
          <_.BottomBar>
            <_.ChattingBar>
              <_.Input placeholder="Send a message to #Nomal2"></_.Input>
            </_.ChattingBar>
          </_.BottomBar>
        </_.ChattingBox>

        <Member />
      </_.BodyBox>
    </_.Container>
  );
};

export default Chatting2;
