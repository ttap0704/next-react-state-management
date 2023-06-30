import {NextRequest, NextResponse} from "next/server";
import {SERVER_NAME} from "../constants";
import {verify} from "./app/api/jwt";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const access_token = request.cookies.get("access_token");
  const path = request.url.replace(SERVER_NAME, "");
  requestHeaders.get("next-url");
  requestHeaders.set("x-url", path);

  // API 요청 검증 과정
  if (request.nextUrl.pathname.startsWith("/api")) {
    // login/join 관련 API가 아닌 이상, access_token의 유효기간 검증
    const not_loigin_server_path = ["/users/login", "/users/join"];
    if (!not_loigin_server_path.includes(path)) {
      if (access_token) {
        let pass = false;

        // 기간 만료되면 error 발생하여 try/catch로 처리
        try {
          const verify_res = await verify(access_token.value);
          if (verify_res) pass = true;
        } catch (err) {
          pass = false;
        }

        if (!pass) {
          // 검증과정 통과하지 못한다면, /login으로 redirect
          // 동시에 access_token 만료처리
          const response: NextResponse = NextResponse.redirect(new URL("/login", request.url), {
            headers: requestHeaders,
          });

          response.cookies.set("access_token", "", {expires: new Date("1001/01/01")});
          return response;
        }
        // 통과시에는 그대로 API 요청
      }
    }
  } else {
    const not_loigin_client_path = ["/login", "/join"];
    if (!not_loigin_client_path.includes(path) && access_token === undefined) {
      // access_token이 없다면 항상 /login으로 redirect
      return NextResponse.redirect(new URL("/login", request.url), {
        headers: requestHeaders,
      });
    } else if ((not_loigin_client_path.includes(path) || path == "/") && access_token) {
      // access_token이 있지만 /login페이지로 진입하려 했을 때, /todos로 redirect
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
