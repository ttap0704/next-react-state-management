import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Todos() {
  return (
    <div id="todo-wrapper">
      <TodoInput />
      <TodoList />
    </div>
  );
}
