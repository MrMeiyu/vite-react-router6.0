import { createContext } from "react";
import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { useContext } from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

console.log(import.meta.env);

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === 200) {
      return data;
    }

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data || response.statusText || "Error",
    });

    if (response.status === 401) {
      history.push("/auth/login");
    }

    return Promise.reject(new Error(response.statusText || "Error"));
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          history.push("/auth/login");
          break;
        case 403:
          history.push("/auth/login");
          break;
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || "Error",
          });
          break;
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || "Error",
          });
          break;
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || "Error",
          });
      }
    }

    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

const useCreate = <T, U>(url: string) => {
  console.log(url, "url");
  const axios = useAxios();
  return async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  };
};

export { useCreate };

export default axios;
