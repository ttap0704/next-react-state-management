import {NextRequest, NextResponse} from "next/server";
import db from "../db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const search_params = new URLSearchParams(url.search);
  const user_id = search_params.get("user_id");

  if (user_id) {
    const todos: TodoModel[] = await db.query({
      sql: "SELECT * FROM todos WHERE user_id = ?",
      values: [user_id],
    });
    return NextResponse.json({
      pass: true,
      message: "",
      data: todos,
    });
  } else {
    return NextResponse.json({
      pass: false,
      message: "잘못된 요청입니다.",
      data: [],
    });
  }
}

export async function POST(request: NextRequest) {
  const data: ApiRequestBody = await request.json();

  const create_data: CreateTodoRequest = data.data;
  const create_res: any = await db.query({
    sql: "INSERT INTO todos (contents, user_id) VALUES (?, ?)",
    values: [create_data.contents, create_data.user_id],
  });

  if (create_res.affectedRows == 1) {
    return NextResponse.json({
      pass: true,
      message: "TODO가 등록되었습니다.",
    });
  } else {
    return NextResponse.json({
      pass: false,
      message: "오류로 인해 등록이 실패하였습니다.",
    });
  }
}
