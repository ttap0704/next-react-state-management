import {fetchGetApi} from "@/utils/api";
import {useQuery} from "@tanstack/react-query";

export const QUERY_KEY = "/todos";

const fetcher = () => fetchGetApi("/todos");

const useTodosQuery = () => {
  return useQuery([QUERY_KEY], fetcher);
};

export default useTodosQuery;
