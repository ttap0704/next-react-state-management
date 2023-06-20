import {useQuery} from "@tanstack/react-query";

export const QUERY_KEY = "/users";

const fetcher = () => {
  return new Promise((resolve) => {
    const user_data = localStorage.getItem("user");
    resolve(user_data ? JSON.parse(user_data) : null);
  });
};
const useUsersQuery = () => {
  return useQuery([QUERY_KEY], fetcher);
};

export default useUsersQuery;
