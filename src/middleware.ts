import {NextRequest, NextResponse} from "next/server";
import {SERVER_NAME} from "../constants";
import {verify} from "./app/api/jwt";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const access_token = request.cookies.get("access_token");
  const path = request.url.replace(SERVER_NAME, "");
  requestHeaders.get("next-url");
  requestHeaders.set("x-url", path);

  if (request.nextUrl.pathname.startsWith("/api")) {
    const not_loigin_server_path = ["/users/login", "/users/join"];
    if (!not_loigin_server_path.includes(path) && access_token) {
      let pass = false;
      try {
        const verify_res = await verify(access_token.value);
        if (verify_res) pass = true;
      } catch (err) {
        pass = false;
      }

      if (!pass) {
        const response: NextResponse = NextResponse.redirect(new URL("/login", request.url), {
          headers: requestHeaders,
        });

        response.cookies.set("access_token", "", {expires: new Date("1001/01/01")});
        return response;
      }
    }
  } else {
    const not_loigin_client_path = ["/login", "/join"];
    if (!not_loigin_client_path.includes(path) && access_token === undefined) {
      return NextResponse.redirect(new URL("/login", request.url), {
        headers: requestHeaders,
      });
    } else if (not_loigin_client_path.includes(path) && access_token) {
      return NextResponse.redirect(new URL("/todos", request.url), {
        headers: requestHeaders,
      });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
