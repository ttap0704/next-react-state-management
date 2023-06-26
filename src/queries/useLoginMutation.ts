// quires/useLoginMutation.ts
import {fetchPostApi} from "@/utils/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NextResponse} from "next/server";
import {QUERY_KEY as userQueryKey} from "./useUsersQuery";

const fetcher = (data: object) => fetchPostApi(data, "/users/login");

const useLoginMutation = (data: object) => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (res: NextResponse) => {
      const user_data: UserClient = await res.json();
      console.log(user_data);
      if (user_data.pass) {
        queryClient.invalidateQueries([userQueryKey]);
        localStorage.setItem("user", JSON.stringify(user_data));
        window.location.replace("/todos");
      } else {
        alert("아이디와 비밀번호를 확인해주세요.");
      }
    },
  });
};

export default useLoginMutation;
