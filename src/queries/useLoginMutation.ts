// quires/useLoginMutation.ts
import {fetchLoginApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NextResponse} from "next/server";
import {QUERY_KEY as userQueryKey} from "./useUsersQuery";

const fetcher = (data: object) => fetchLoginApi(data);

const useLoginMutation = () => {
  const query_client = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res: any) => {
      const user_data: UserClient = res;
      if (user_data.login_id) {
        query_client.invalidateQueries([userQueryKey]);
        window.location.replace("/todos");
      }
    },
  });
};

export default useLoginMutation;
