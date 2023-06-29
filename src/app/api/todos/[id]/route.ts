import {NextRequest, NextResponse} from "next/server";
import db from "../../db";

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
  const body: ApiRequestBody = await request.json();
  const update_data: UpdateTodoRequest = body.data;
  const todo_id = params.id;

  let sql = "UPDATE todos SET";
  const values: (string | number)[] = [];
  if (update_data.contents) (sql += " contents = ?"), values.push(update_data.contents);
  if (update_data.todo !== undefined) (sql += " todo = ?"), values.push(update_data.todo);
  sql += " WHERE id = ?;";
  values.push(todo_id);

  const update_res: any = await db.query({
    sql,
    values,
  });

  let pass = false,
    message = "",
    data: TodoModel | undefined = undefined;

  if (update_res.affectedRows == 1) {
    pass = true;
    const todos: TodoModel[] = await db.query({
      sql: "SELECT * FROM todos WHERE id = ?",
      values: [todo_id],
    });
    data = todos[0];
  } else {
    message = "오류로 인해 수정이 실패하였습니다";
  }

  return NextResponse.json({
    pass,
    message,
    data,
  });
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
  const todo_id = params.id;

  const delete_res: any = await db.query({
    sql: "DELETE FROM todos WHERE id = ?;",
    values: [todo_id],
  });

  let pass = false,
    message = "",
    data: boolean = false;

  if (delete_res.affectedRows == 1) {
    pass = true;
    data = true;
    message = "TODO가 삭제되었습니다.";
  } else {
    message = "오류로 인해 삭제가 실패하였습니다";
  }

  return NextResponse.json({
    pass,
    message,
    data,
  });
}
