"use client";

import useTodosQuery from "@/queries/useTodosQuery";
import useUsersQuery from "@/queries/useUsersQuery";
import {useEffect} from "react";

export default function TodoList() {
  const user = useUsersQuery();
  const todos = useTodosQuery(user.data?.id as number);

  useEffect(() => {
    console.log(todos);
  }, []);

  return <div>{}</div>;
}
