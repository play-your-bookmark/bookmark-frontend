import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import HistoryLink from "./HistoryLink";
import Loader from "../Loader/Loader";
import useInfinityScroll from "../hooks/useInfinityScroll";
import logoYellow from "../../src_assets/logo_yellow.png";

const LinkListWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .Target-Element {
    width: 40rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .logo-yellow {
    width: 1rem;
  }
`;

export default function LinkList() {
  const [target, setTarget] = useState(null);
  const LinkLists = useSelector((state) => state.link.linkList);
  const isLoaded = useSelector((state) => state.link.isLoaded);

  useInfinityScroll(target);

  return (
    <LinkListWrap>
      {LinkLists && LinkLists.map((info, index) => <HistoryLink linkInfo={info} key={info.key} />)}
      <div className="Target-Element">
        <img ref={setTarget} className="logo-yellow" src={logoYellow} alt="logo_yellow" />
        {isLoaded && <Loader />}
      </div>
    </LinkListWrap>
  );
}
