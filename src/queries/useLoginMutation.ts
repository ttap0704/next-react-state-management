// quires/useLoginMutation.ts
import {fetchLoginApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEY as users_query_key} from "./useUsersQuery";

const fetcher = (data: object) => fetchLoginApi(data);

const useLoginMutation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res: UserClient) => {
      if (res.login_id) {
        query_client.invalidateQueries([users_query_key]);
      }
    },
  });
};

export default useLoginMutation;
