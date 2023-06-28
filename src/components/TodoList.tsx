"use client";

import useTodosQuery from "@/queries/useTodosQuery";
import useUsersQuery from "@/queries/useUsersQuery";

export default function TodoList() {
  const user = useUsersQuery();
  const todos = useTodosQuery(user.data?.id as number);

  return (
    <div>
      {todos.data?.map((item: TodoModel) => {
        return <div key={`todo_${item.id}`}>{item.contents}</div>;
      })}
    </div>
  );
}
