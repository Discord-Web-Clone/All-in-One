import * as _ from "./style";
import { useSocket } from "../../hooks/useSocket";
import { ProfileImg } from "../../assets/Profile/img";

const UserProfile = () => {
  const { onlineUsers, userId } = useSocket();
  const isOnline =
    Array.isArray(onlineUsers) &&
    userId !== null &&
    onlineUsers.includes(userId);

  return (
    <_.Container>
      <_.User>
        <ProfileImg width={40} height={40} isOnline={isOnline} />
        <_.TextBox>
          <_.UserName>{userId ?? "사용자"}</_.UserName>
          <_.OnlineState>{isOnline ? "온라인" : "오프라인"}</_.OnlineState>
        </_.TextBox>
      </_.User>

      <_.Icons>
        <_.Icon>mic</_.Icon>
        <_.Icon>headphones</_.Icon>
      </_.Icons>
    </_.Container>
  );
};

export default UserProfile;
