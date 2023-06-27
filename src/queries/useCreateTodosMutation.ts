// quires/useCreateTodosMudation.ts
import {fecthTodoApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as userQueryKey} from "./useUsersQuery";

const fetcher = (data: CreateTodoRequest) => fecthTodoApi(data);

const useCreateTodosMudation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res: {pass: boolean; message: string}) => {
      alert(res.message);
    },
  });
};

export default useCreateTodosMudation;
