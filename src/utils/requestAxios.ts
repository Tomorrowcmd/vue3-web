import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});
// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data; // 后端返回的 Request 对象

        // 如果code不是200， 说明业务上有错误
        if (res.code !== 200) {
            alert(res.msg || "Error");
            return Promise.reject(new Error(res.msg || "Error"));
        }
        // 业务成功，直接返回 Result里的 data 部分
        return res.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default request;