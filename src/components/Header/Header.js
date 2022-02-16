import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: #ebebeb;
`;

const OutletWrapper = styled.div`
  padding-top: 100px;
`;

const LogoutButton = styled.div`
  margin-right: 50px;
  font-size: 20px;
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
        <LogoutButton onClick={() => handleClickLogout()}>LogOut</LogoutButton>
      </HeaderWrapper>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </div>
  );
}
