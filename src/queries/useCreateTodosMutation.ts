// quires/useCreateTodosMudation.ts
import {fecthTodoApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as todos_query_key} from "./useTodosQuery";

const fetcher = (data: CreateTodoRequest) => fecthTodoApi(data);

const useCreateTodosMudation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res) => {
      if (res) {
        query_client.invalidateQueries([todos_query_key]);
      }
      return res;
    },
  });
};

export default useCreateTodosMudation;
