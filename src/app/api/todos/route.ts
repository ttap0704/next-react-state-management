import {NextRequest, NextResponse} from "next/server";
import db from "../db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const search_params = new URLSearchParams(url.search);
  const user_id = search_params.get("user_id");

  let pass = false,
    message = "",
    data: TodoModel[] = [];

  if (user_id) {
    const todos: TodoModel[] = await db.query({
      sql: "SELECT * FROM todos WHERE user_id = ?;",
      values: [user_id],
    });
    pass = true;
    data = todos;
  } else {
    message = "잘못된 요청입니다.";
  }

  const res: ApiResponseDefault = {pass, message, data};
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body: ApiRequestBody = await request.json();

  const create_data: CreateTodoRequest = body.data;
  const create_res: any = await db.query({
    sql: "INSERT INTO todos (contents, user_id) VALUES (?, ?)",
    values: [create_data.contents, create_data.user_id],
  });

  let pass = false,
    message = "",
    data = false;

  if (create_res.affectedRows == 1) {
    pass = true;
    data = true;
    message = "TODO가 등록되었습니다.";
  } else {
    message = "오류로 인해 등록이 실패하였습니다";
  }

  return NextResponse.json({
    pass,
    message,
    data,
  });
}
