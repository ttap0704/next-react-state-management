import {headers} from "next/dist/client/components/headers";

function Header() {
  const header_title: {[key: string]: string} = {
    "/": "HOME",
    "/todos": "TODO",
    "/join": "JOIN",
    "/login": "LOGIN",
    "/users/join": "JOIN",
  };
  const header_list = headers();
  const url = header_list.get("x-url") ?? "/";
  return (
    <div id="header">
      <h1>{header_title[url]}</h1>
    </div>
  );
}

export default Header;
