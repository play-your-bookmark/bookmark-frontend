import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:7001";
const req = (
  method,
  url,
  callback = () => {},
  { params = {}, data = {}, headers = {}, responseType = "json" },
  is_based = false,
) => {
      const accessToken = Cookies.get("accessToken") || undefined;
      return axios({
        method,
        url: is_based ? BASE_URL + url : url,
        params,
        data,
        headers: { Authorization: `Bearer ${accessToken}` || null },
        responseType
      })
        .then((res) => {
          return callback(res);
        })
        .catch((e) => {
          if (!e.response || e.message === "Network Error") {
            console.log("Server Error!");
            return;
          }
          const { status, data, config } = e.response;
          if (status === 401) {
            Cookies.remove("accessToken")
            return;
          }
          return { status, data, config };
      });
};
export default req;
