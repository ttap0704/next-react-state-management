import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const data: ApiResponse = await request.json();

  const login_data = {...data.data};
  const ret: User = {
    pass: false,
    name: "",
    login_id: "",
    id: 0,
  };

  if (login_data.login_id == "test" && login_data.login_password == "12345678") {
    ret.pass = true;
    ret.name = "테스트";
    ret.login_id = "test";
    ret.id = 10000;
  }

  const response = NextResponse.json(ret);
  response.cookies.set({
    name: "jwt",
    value: "testset", // 로그인 시 토큰 (임시),
    expires: new Date().getTime() + 1000 * 60 * 60 * 24,
    path: "/",
  });

  return response;
}
