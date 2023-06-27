import {fetchGetUserInfoApi} from "@/utils/api";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export const QUERY_KEY = "/users";

const fetcher = () => fetchGetUserInfoApi();
const useUsersQuery = () => {
  return useQuery([QUERY_KEY], fetcher);
};

export default useUsersQuery;
