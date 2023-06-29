import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  // 만약 로그아웃 Log를 남긴다면 추가 작업 필요
  let pass = true,
    message = "로그아웃 되었습니다.",
    data = true;

  const response = NextResponse.json({pass, message, data});
  response.cookies.set({
    name: "access_token",
    value: "",
    expires: new Date().getTime() - 1000 * 60 * 60, // 1시간 이전으로 세팅하여 쿠키 삭제
    path: "/",
    httpOnly: true,
    sameSite: true,
  });
  return response;
}
