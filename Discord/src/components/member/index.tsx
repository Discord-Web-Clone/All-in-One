import * as _ from "./style";
import { useSocketContext } from "../../hooks/SocketProvider";
import { ProfileImg } from "../../assets/Profile/img";
import { useMemo } from "react";

export const Member = () => {
  const { onlineUsers, userId, allUsers } = useSocketContext();

  const { onlineUsersList, offlineUsersList } = useMemo(() => {
    const safeAllUsers = Array.isArray(allUsers) ? allUsers : [];
    const safeOnlineUsers = Array.isArray(onlineUsers) ? onlineUsers : [];

    // 중복 제거
    const uniqueAllUsers = [...new Set(safeAllUsers)];
    const uniqueOnlineUsers = [...new Set(safeOnlineUsers)];

    // 온라인/오프라인 구분
    const online = uniqueAllUsers.filter((id) =>
      uniqueOnlineUsers.includes(id)
    );
    const offline = uniqueAllUsers.filter(
      (id) => !uniqueOnlineUsers.includes(id)
    );

    return {
      onlineUsersList: online,
      offlineUsersList: offline,
    };
  }, [onlineUsers, allUsers]);

  console.log("Debug - allUsers:", allUsers);
  console.log("Debug - onlineUsers:", onlineUsers);
  console.log("Debug - userId:", userId);
  console.log("Debug - uniqueAllUsers:", [...new Set(allUsers)]);

  return (
    <_.Container>
      {onlineUsersList.length >= 1 && (
        <_.Onlines>온라인 - {onlineUsersList.length}</_.Onlines>
      )}

      {onlineUsersList.map((id) => (
        <_.OnlinePerson key={id}>
          <ProfileImg width={32} height={32} isOnline={true} />
          {id === userId ? `${id} (나)` : id}
        </_.OnlinePerson>
      ))}

      {offlineUsersList.length >= 1 && (
        <_.Offlines>오프라인 - {offlineUsersList.length}</_.Offlines>
      )}

      {offlineUsersList.map((id) => (
        <_.OnlinePerson key={id}>
          <ProfileImg width={32} height={32} isOnline={false} />
          {id}
        </_.OnlinePerson>
      ))}
    </_.Container>
  );
};
