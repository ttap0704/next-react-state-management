"use client";

import useLogoutMutation from "@/queries/useLogoutMutation";
import useUsersQuery from "@/queries/useUsersQuery";

function LogoutButton() {
  const {data: user} = useUsersQuery();
  const {mutate: logout} = useLogoutMutation();

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  return user ? (
    <button id="logout-button" onClick={handleLogout}>
      LOGOUT
    </button>
  ) : null;
}

export default LogoutButton;
