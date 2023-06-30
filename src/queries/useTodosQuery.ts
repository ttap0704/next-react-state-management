import {fetchGetTodosApi} from "@/utils/api";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";

export const QUERY_KEY = "/todos";

const fetcher = (props: UseQueryOptions) => {
  // 해당 user id를 통해 Todo 리스트 가져와서 캐싱
  const user_id: number = Number((props.queryKey as (string | number)[])[1]);
  return fetchGetTodosApi(user_id);
};

const useTodosQuery = (user_id: number) => {
  // 쿼리 키와 user의 고유 아이디를 사용하여 key값 할당
  return useQuery([QUERY_KEY, user_id], fetcher, {
    enabled: user_id !== undefined && user_id !== null,
  });
};

export default useTodosQuery;
