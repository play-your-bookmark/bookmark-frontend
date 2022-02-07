import Cookies from "js-cookie";

export default function isLoggedIn() {
  return Cookies.get("accessToken");
}
