// quires/useLogoutMutation.ts
import {fetchLogoutApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as users_query_key} from "./useUsersQuery";
import {QUERY_KEY as todoss_query_key} from "./useTodosQuery";

const fetcher = () => fetchLogoutApi();

const useLogoutMutation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res) => {
      if (res) {
        query_client.removeQueries([users_query_key]);
        query_client.removeQueries([todoss_query_key]);
        location.replace("/login");
      }
    },
  });
};

export default useLogoutMutation;
