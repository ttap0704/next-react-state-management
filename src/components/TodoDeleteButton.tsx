import useDeleteTodosMutation from "@/queries/useDeleteTodosMutation";
import useUsersQuery from "@/queries/useUsersQuery";
import {memo} from "react";

type TodoDeleteButtonProps = {
  id: number;
};

function TodoDeleteButton(props: TodoDeleteButtonProps) {
  const todo_id = props.id;

  const {data: user} = useUsersQuery();
  const {mutate: deleteTodo} = useDeleteTodosMutation(user?.id as number);

  const handleTodo = () => {
    if (confirm("TODO를 삭제하시겠습니까?")) {
      deleteTodo(todo_id);
    }
  };

  return <button className="todo-list-delete-button" onClick={handleTodo} />;
}

export default memo(TodoDeleteButton, (prev, cur) => {
  return prev.id === cur.id;
});
