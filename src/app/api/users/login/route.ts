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

  return NextResponse.json(ret);
}
