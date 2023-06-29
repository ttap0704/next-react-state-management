// quires/useUpdateTodosMudation.ts
import {fetchUpdateTodoApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as todos_query_key} from "./useTodosQuery";

const fetcher = (data: {data: UpdateTodoRequest; id: number}) => fetchUpdateTodoApi(data);

const useUpdateTodosMudation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res) => {
      if (res) {
        query_client.setQueryData([todos_query_key, res.user_id], (prev) => {
          return (prev as TodoModel[]).map((item) => (item.id == res.id ? res : item));
        });
      }
    },
  });
};

export default useUpdateTodosMudation;
