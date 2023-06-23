import {NextRequest, NextResponse} from "next/server";
import {SERVER_NAME} from "../constants";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const jwt = request.cookies.get("jwt");
  const path = request.url.replace(SERVER_NAME, "");
  requestHeaders.get("next-url");
  requestHeaders.set("x-url", path);

  const not_loigin_path = ["/login", "/join"];
  if (!not_loigin_path.includes(path) && jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url), {
      headers: requestHeaders,
    });
  } else if (not_loigin_path.includes(path) && jwt) {
    return NextResponse.redirect(new URL("/todos", request.url), {
      headers: requestHeaders,
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
