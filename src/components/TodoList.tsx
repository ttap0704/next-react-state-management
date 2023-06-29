"use client";

import useTodosQuery from "@/queries/useTodosQuery";
import useUsersQuery from "@/queries/useUsersQuery";
import Spinner from "./Spinner";
import TodoCheckbox from "./TodoCheckbox";
import TodoDeleteButton from "./TodoDeleteButton";

export default function TodoList() {
  const user = useUsersQuery();
  const todos = useTodosQuery(user.data?.id as number);

  return (
    <div id="todo-list-wrapper">
      {todos.isLoading ? <Spinner /> : null}
      {todos.data?.map((item: TodoModel) => {
        return (
          <div key={`todo_${item.id}`} className="todo-list">
            <TodoCheckbox id={item.id} todo={item.todo} />
            <div className="todo-list-contents">
              <p>{item.contents}</p>
              <TodoDeleteButton id={item.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
