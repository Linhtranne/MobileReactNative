import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

baseUrl.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseUrl.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
          return Promise.reject(error);
        }

        const res = await baseUrl.post("/auths/refresh-token", {
          refreshToken: refreshToken,
        });

        const { accessToken: newAccessToken } = res.data.data;

        await AsyncStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return baseUrl(originalRequest);
      } catch (refreshError) {
        console.error("Không thể làm mới token, đang đăng xuất:", refreshError);
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default baseUrl;
