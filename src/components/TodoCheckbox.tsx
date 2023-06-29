"use client";

import useUpdateTodosMudation from "@/queries/useUpdateTodosMutation";
import React, {memo} from "react";

type TodoCheckboxProps = {
  id: number;
  todo: number;
};

function TodoCheckbox(props: TodoCheckboxProps) {
  const id = props.id;
  const todo = props.todo;
  const {mutate: updateTodoChecked} = useUpdateTodosMudation();

  const handleTodoChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const update_value = e.target.checked ? 1 : 0;

    updateTodoChecked({
      data: {todo: update_value},
      id,
    });
  };

  return (
    <input type="checkbox" className="checkbox-round" onChange={handleTodoChecked} checked={todo == 1 ? true : false} />
  );
}

export default memo(TodoCheckbox, (prev, cur) => {
  return prev.todo === cur.todo;
});
