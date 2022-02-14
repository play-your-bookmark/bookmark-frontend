import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 500px;
  font-size: 20px;
  padding: 40px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Logout = styled.div`
  color: black;
`;

export default function NavBar({ auth }) {
  const navigate = useNavigate();

  function handleClickLogout() {
    auth.logout().then((data) => {
      navigate("/auth/login");
    });
  }

  return (
    <animated.div>
      <MenuContainer>
        <div>
          <StyledLink to="/app/rankpage">Rank Page</StyledLink>
        </div>
        <div>
          <StyledLink to="/app/editpage">Edit Page</StyledLink>
        </div>
        <div>
          <StyledLink to="/app/mypage">My Page</StyledLink>
        </div>
        <div>
          <Logout onClick={() => handleClickLogout()}>Logout</Logout>
        </div>
      </MenuContainer>
    </animated.div>
  );
}
