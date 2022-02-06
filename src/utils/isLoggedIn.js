import Cookies from "js-cookie";

const isLoggedIn = () => {
  return Cookies.get("accessToken");
}

export default isLoggedIn;
