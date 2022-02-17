import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import SidebarData from "./SidebarData";

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

  ${(props) =>
    props.className === "menu-bars" &&
    `
      width: 30px;
      height: 30px;
    `}
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const NavWrapper = styled.div`
  z-index: 1001;
`;

export default function NavBar() {
  const [isToggled, setIsToggled] = useState(false);
  const toggleHandler = () => setIsToggled(!isToggled);

  return (
    <>
      {isToggled && <OverlayStyle onClick={() => setIsToggled(false)} />}
      <NavWrapper>
        <div className="navbar">
          <Link to="#">
            <FaBars onClick={toggleHandler} size={40} />
          </Link>
        </div>
        <div className={isToggled ? "nav-menu active" : "nav-menu"}>
          <div className="nav-menu-items" onClick={toggleHandler}>
            <div className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <div key={index} className={item.cName}>
                  <StyledLink to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </StyledLink>
                </div>
              );
            })}
          </div>
        </div>
      </NavWrapper>
    </>
  );
}
