// quires/useJoinMutation.ts
import {fetchPostApi} from "@/utils/api";
import {useMutation} from "@tanstack/react-query";
import {NextResponse} from "next/server";

const fetcher = (data: object) => fetchPostApi(data, "/users/join");

const useJoinMutation = (data: object) => {
  return useMutation(fetcher, {
    onSuccess: async (res: NextResponse) => {
      const user_data: {pass: boolean; message: string} = await res.json();
      alert(user_data.message);
      if (user_data.pass) {
        window.location.replace("/login");
      }
    },
  });
};

export default useJoinMutation;
