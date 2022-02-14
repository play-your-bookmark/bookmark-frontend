import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "./NavBar";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;

  .nav-button {
    width: 30px;
    height: 30px;
  }
`;

export default function Header({ auth }) {
  const [isToggled, setIsToggled] = useState(false);

  function toggleHandler() {
    setIsToggled(!isToggled);
  }

  return (
    <div>
      <HeaderWrapper>
        <NavBar auth={auth} toggled={isToggled} />
        <ButtonWrapper>
          <GiHamburgerMenu onClick={() => toggleHandler()} className="nav-button" />
        </ButtonWrapper>
      </HeaderWrapper>
      <Outlet />
    </div>
  );
}
