import { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import HistoryLink from "./HistoryLink";
import Loader from "../Loader/Loader";
import useInfinityScroll from "../hooks/useInfinityScroll";

const LinkListWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background 삭제 예정 */
  background-color: aquamarine;

  .Target-Element {
    width: 40rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  /* width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  .Target-Element {
    width: 40rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  } */
`;

export default function LinkList() {
  const [target, setTarget] = useState(null);
  const LinkLists = useSelector((state) => state.link.linkList);
  const isLoaded = useSelector((state) => state.link.isLoaded);

  useInfinityScroll(target);

  return (
    <LinkListWrap>
      {LinkLists && LinkLists.map((info, index) => <HistoryLink linkInfo={info} key={info.key} />)}
      <div ref={setTarget} className="Target-Element">
        {isLoaded && <Loader />}
      </div>
    </LinkListWrap>
  );
}
