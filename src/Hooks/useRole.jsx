import { useContext } from "react";
import useAxios from "./useAxios";
import { authContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let { data = [], isLoading: isAdminLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/get-role?email=${user?.email}`).then();
      return res.data;
    },
  });

  let userRole = [data?.role, isAdminLoading];

  return userRole;
};

export default useRole;
