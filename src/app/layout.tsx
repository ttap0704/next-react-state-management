import "./globals.css";
import {Inter} from "next/font/google";
import {headers} from "next/dist/client/components/headers";
import ReactQueryProvider from "@/utils/provider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "TODO APP",
  description: "Generated by create next app",
};

function Header() {
  const header_title: {[key: string]: string} = {
    "/": "HOME",
    "/todos": "TODO",
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div id="wrapper">
            <Header />
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
