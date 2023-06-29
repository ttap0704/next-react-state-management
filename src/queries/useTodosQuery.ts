import {fetchGetTodosApi} from "@/utils/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";

export const QUERY_KEY = "/todos";

const fetcher = (props: UseQueryOptions) => {
  const user_id: number = props.queryKey ? Number(props.queryKey[1]) : 0;
  return fetchGetTodosApi(user_id);
};

const useTodosQuery = (user_id: number) => {
  return useQuery([QUERY_KEY, user_id], fetcher, {
    enabled: user_id !== undefined && user_id !== null,
  });
};

export default useTodosQuery;
