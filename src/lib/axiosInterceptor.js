import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.error.message;

      if (errorMessage === "jwt expired" && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await axios.post(`${API_URL}/refreshToken`, {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          localStorage.setItem("accessToken", data.newAccessToken);
          localStorage.setItem("refreshToken", data.newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
          return API(originalRequest);
        } catch (refreshError) {
          console.error("response interceptor error catched!", refreshError);
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else if (errorMessage === "Session expired") {
        localStorage.clear();

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      } else if (errorMessage === "Unauthorized") {
        localStorage.clear();

        // alert("unauthorized!");
        // if (!window.location.pathname.includes("/login")) {
        //   window.location.href = "/login";
        // }

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
