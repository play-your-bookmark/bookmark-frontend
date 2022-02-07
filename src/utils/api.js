import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:7001";
const req = (
  method,
  url,
  { params = {}, data = {}, headers = {}, responseType = "json" },
  isBased = false,
  callback = () => {},
) => {
  const accessToken = Cookies.get("accessToken") || undefined;
  return axios({
    method,
    url: isBased ? BASE_URL + url : url,
    params,
    data,
    headers: { Authorization: `Bearer ${accessToken}` || null },
    responseType,
  })
    .then((res) => callback(res))
    .catch((e) => {
      if (!e.response || e.message === "Network Error") {
        console.log("Server Error!");
        return; // 왠지 이 return문은 eslint 오류가 발생하지 않습니다..
      }

      const { status, data, config } = e.response;

      if (status === 401) {
        Cookies.remove("accessToken");
        // return;
      }
      // eslint에서 Arrow function expected no return value  consistent-return
      // 오류가 발생하였는데, 화살표 함수에서는 리턴 값이 없어야한다고 합니다.
      // return 부분을 지웠을 때 현욱님께서 짜주신 로직에 문제가 생길수도 있어서 일단 주석처리 했습니다!
      // 확인 부탁드리고 지워도 상관없다면 수정 부탁드립니다~!
      // return { status, data, config };
    });
};
export default req;
