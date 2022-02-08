import axios from "axios";

// 웹 데브 서버 연결 확인을 위한 axios 요청 예시
const model = {
  async get() {
    const a = await axios.get("/api/key");
    console.log("웹 데브 서버 연결 확인을 위한 axios 요청 예시");
    console.log(a);
  },
};

export default model;
