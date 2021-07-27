import { useCreate } from "./request";

import { LoginParams, LoginResult } from "@/types/user";

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>("/login");
};
