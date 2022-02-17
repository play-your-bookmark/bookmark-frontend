import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import logoBlue from "../../src_assets/logo_blue.png";
import logoYellow from "../../src_assets/logo_yellow.png";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: #ebebeb;

  .logo-blue {
    position: absolute;
    left: 100px;
    width: 50px;
  }

  .logo-yellow {
    position: absolute;
    left: 80px;
    width: 50px;
  }
`;

const OutletWrapper = styled.div`
  padding-top: 0;
`;

const LogoutButton = styled.div`
  margin-right: 125px;
  font-size: 18px;
  font-weight: 300;
  :hover {
    font-weight: 600;
    transition: 0.3s;
  }
`;

export default function Header({ auth }) {
  const navigate = useNavigate();

  function handleClickLogout() {
    auth.logout().then((data) => {
      navigate("/auth/login");
    });
  }

  return (
    <div>
      <HeaderWrapper>
        <NavBar />
        <img className="logo-blue" src={logoBlue} alt="logo_blue" />
        <img className="logo-yellow" src={logoYellow} alt="logo_yellow" />
        <LogoutButton onClick={() => handleClickLogout()}>LogOut</LogoutButton>
      </HeaderWrapper>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  );
}
