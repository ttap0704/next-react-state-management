// quires/useDeleteTodosMutation.ts
import {fecthDeleteTodoApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as todos_query_key} from "./useTodosQuery";

const fetcher = (id: number) => fecthDeleteTodoApi(id);

const useDeleteTodosMutation = (user_id: number) => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res) => {
      if (res) {
        query_client.invalidateQueries([todos_query_key, user_id]);
      }
    },
  });
};

export default useDeleteTodosMutation;
