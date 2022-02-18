import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import isLoggedIn from "../../utils/isLoggedIn";
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
  background-color: #ebebeb;

  .bottom-logo {
    position: relative;

    .logo-blue {
      width: 200px;
    }

    .top-logo {
      position: absolute;
      top: -5px;
      left: -25px;

      .logo-yellow {
        width: 200px;
      }
    }
  }

  h1 {
    position: absolute;
    font-size: 90px;
    font-weight: 430;
    top: 270px;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .google-login {
    margin-top: 100px;
    cursor: pointer;
  }
`;

export default function Login({ auth, restricted }) {
  const navigate = useNavigate();
  const onGoogleLogin = () => {
    auth.login("google").then((data) => {
      navigate("/app/rankpage");
    });
  };

  return !isLoggedIn() ? (
    <LoginWrapper>
      <div className="bottom-logo">
        <img className="logo-blue" src={logoBlue} alt="logo1" />
        <div className="top-logo">
          <img className="logo-yellow" src={logoyellow} alt="logo2" />
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
  ) : (
    <Navigate to="/app/rankpage" />
  );
}
