"use client";

import useTodosQuery from "@/queries/useTodosQuery";
import TodoInput from "./TodoInput";

export default function TodoList() {
  const test = useTodosQuery();

  return (
    <div id="todo-wrapper">
      <TodoInput />
      testestestes
    </div>
  );
}
