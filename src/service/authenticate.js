import { authService, googleProvider } from "./firebase";
import Cookies from "js-cookie";
import req from "../utils/api";

class Authenticate {
  async login (name) {
    const provider = this.getProvider(name);
    const data = await authService.signInWithPopup(provider);
    const IdToken = await authService.currentUser.getIdToken().then(data => data);

    Cookies.set("accessToken", IdToken);

    await req("post", "/users/new", result => result.data, { data: data });
  }

  async logout () {
    await authService.signOut();
    
    Cookies.remove("accessToken");
  }

  getProvider (name) {
    switch(name) {
      case "google": 
        return googleProvider;
      default: 
        throw new Error("Unknown provider");
    }
  }
  
}

export default Authenticate
