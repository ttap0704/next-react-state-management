"use client";

import useCreateTodosMudation from "@/queries/useCreateTodosMutation";
import useUsersQuery from "@/queries/useUsersQuery";
import React, {useRef, useState} from "react";

export default function TodoInput() {
  const {data} = useUsersQuery();
  const contents_input = useRef<HTMLInputElement | null>(null);
  const {mutate} = useCreateTodosMudation();

  const createTodo = async () => {
    if (contents_input.current) {
      if (contents_input.current.value.length == 0) {
        alert("TODO를 입력해주세요.");
        return;
      }

      const res = mutate({contents: contents_input.current.value, user_id: data?.id as number});
    }
  };

  return (
    <div id="todo-input-wrapper">
      <input type="text" ref={contents_input} />
      <button onClick={createTodo}>CREATE</button>
    </div>
  );
}
