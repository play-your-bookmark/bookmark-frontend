import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";

export default function Login({ auth, restricted }) {
  const navigate = useNavigate();
  const onLogin = (e) => {
    auth.login(e.target.name).then((data) => {
      navigate("/app/rankpage");
    });
  };

  return !isLoggedIn() ? (
    <div>
      <h1>Play your bookmark</h1>
      <div>
        <button name="google" onClick={onLogin}>
          구글아이콘
        </button>
      </div>
    </div>
  ) : (
    <Navigate to="/app/rankpage" />
  );
}
