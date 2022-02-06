import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ auth }) {
  const navigate = useNavigate();
  const onLogin = (e) => {
    auth
      .login(e.target.name)
      .then((data) => {
        navigate("/app/rankpage");
      })
  }
  return (
    <div>
      <h1>Play your bookmark</h1>
      <div>
        <button name="google" onClick={onLogin}>구글아이콘</button>
      </div>
    </div>
  )
}
