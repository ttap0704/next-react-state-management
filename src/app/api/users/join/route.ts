import {NextRequest, NextResponse} from "next/server";
import {hash} from "../../bcrypt";
import db from "../../db";

export async function POST(request: NextRequest) {
  const data: ApiRequestBody = await request.json();
  const join_data = {...data.data};

  const check_login_id: any[] = await db.query({
    sql: "SELECT COUNT(*) as cnt FROM users WHERE login_id = ?",
    values: [join_data.login_id],
  });

  if (check_login_id[0].cnt > 0) {
    return NextResponse.json({
      pass: false,
      message: "중복된 아이디가 존재합니다.",
      data: false,
    });
  }

  const password: string = await hash(join_data.login_password);
  const join_res: any = await db.query({
    sql: "INSERT INTO users (login_id, password) VALUES (?, ?)",
    values: [join_data.login_id, password],
  });

  if (join_res.affectedRows == 1) {
    return NextResponse.json({
      pass: true,
      message: "회원가입이 완료되었습니다.",
      data: true,
    });
  } else {
    return NextResponse.json({
      pass: false,
      message: "오류로 인해 회원가입이 실패하였습니다.",
      data: false,
    });
  }
}
