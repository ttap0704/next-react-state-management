import {NextRequest, NextResponse} from "next/server";
import {isHashValid} from "../../bcrypt";
import db from "../../db";
import {sign} from "../../jwt";

export async function POST(request: NextRequest) {
  const data: ApiRequestBody = await request.json();

  const login_data: {login_id: string; login_password: string} = data.data;
  let pass = false;
  const user_data: UserModel[] = await db.query({
    sql: "SELECT id, login_id, password, created_at FROM users WHERE login_id = ?",
    values: [login_data.login_id],
  });

  if (user_data.length == 1) {
    const check_password = await isHashValid(login_data.login_password, user_data[0].password);
    pass = check_password;
  }

  const user: UserClient = {
    id: pass ? user_data[0].id : 0,
    login_id: pass ? user_data[0].login_id : "",
    created_at: pass ? user_data[0].created_at : "",
  };

  const response = NextResponse.json({pass, message: "", user});
  if (pass) {
    const token = await sign(JSON.stringify({...user}));
    response.cookies.set({
      name: "access_token",
      value: token,
      expires: new Date().getTime() + 1000 * 60 * 60, // 1시간
      path: "/",
      httpOnly: true,
      sameSite: true,
    });
  }

  return response;
}
