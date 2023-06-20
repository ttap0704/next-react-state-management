// quires/useUsersLoginMudation.ts
import {fetchPostApi} from "@/utils/api";
import {users} from "@/utils/mockups";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NextResponse} from "next/server";
import {QUERY_KEY as userQueryKey} from "./useUsersQuery";

const fetcher = (data: object) => fetchPostApi(data, "/users/login");

const useUsersLoginMudation = (data: object) => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onMutate: (res) => {
      console.log(res);
    },
    onSuccess: async (res: NextResponse) => {
      const user_data: User = await res.json();
      if (user_data.pass) {
        queryClient.invalidateQueries([userQueryKey]);
        localStorage.setItem("user", JSON.stringify(user_data));
        window.location.replace("/");
      } else {
        alert("아이디와 비밀번호를 확인해주세요.");
      }
    },
  });
};

export default useUsersLoginMudation;
