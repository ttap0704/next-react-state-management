import {NextResponse} from "next/server";
import {SERVER_NAME} from "../constants";

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.get("next-url");
  requestHeaders.set("x-url", request.url.replace(SERVER_NAME, ""));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {};
