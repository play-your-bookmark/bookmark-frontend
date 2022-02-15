import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoBlue from "../../src_assets/logo_blue.png";
import logoyellow from "../../src_assets/logo_yellow.png";
import googleLoginButton from "../../src_assets/btn_google_signin_light_focus_web.png";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .bottom-logo {
    position: relative;
  }

  h1 {
    position: absolute;
    top: 400px;
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .google-login {
    cursor: pointer;
  }
`;

export default function Login({ auth }) {
  const navigate = useNavigate();
  const onGoogleLogin = (e) => {
    auth.login("google").then((data) => {
      navigate("/app/rankpage");
    });
  };

  return (
    <LoginWrapper>
      <div className="bottom-logo">
        <img className="logo-blue" src={logoBlue} alt="logo1" style={{ width: "200px" }} />
        <div className="top-logo" style={{ position: "absolute", top: "-5px", left: "-25px" }}>
          <img className="logo-yellow" src={logoyellow} alt="logo2" style={{ width: "200px" }} />
        </div>
      </div>
      <div className="title">
        <h1>Play your bookmark</h1>
        <img
          className="google-login"
          src={googleLoginButton}
          alt="google-login"
          onClick={onGoogleLogin}
        />
      </div>
    </LoginWrapper>
  );
}
