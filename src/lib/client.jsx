import axios from "axios";
import {loginExpired} from "../actions/AuthActions.jsx";

const client = axios.create();
client.defaults.baseURL = import.meta.env.VITE_API_SERVER_URL;

export const setUpInterceptors = (dispatch) => {
  client.interceptors.response.use(
    (response) => response,
    async e => {

      if (e.response.data.error.code === 'A-001') {

        const accessToken = await client.post("/auth/refresh-token", {}, {
          withCredentials: true
        }).then((res) => {
          console.log(res);
          return res.data.token_info.access_token.value
        })
          .catch((e) => {
            console.log(e);
            if (e.response.status === 401) {
              alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
              dispatch(loginExpired());
              location.href = "/login";
              return null;
            }
          });

        if (accessToken) {
          const originalRequest = e.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return client.request(originalRequest);
        }
      }

      return Promise.reject(e);
    }
  );
}

export default client;
