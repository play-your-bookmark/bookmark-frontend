import { useState } from "react";
import { useSelector } from 'react-redux';

import styled from "styled-components";

import Link from "./Link";
import Loader from "../Loader/Loader";
import useInfinityScroll from '../hooks/useInfinityScroll';

const LinkListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  .Target-Element {
    width: 40rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;

export default function LinkList() {
  const [target, setTarget] = useState(null);
  const LinkLists = useSelector(state => state.link.linkList);
  const isLoaded = useSelector(state => state.link.isLoaded);

  useInfinityScroll(target);

  return (
    <LinkListWrap>
      {
        LinkLists &&
        LinkLists.map((info, index) => {
          return <Link linkInfo={info} key={index} />;
        })
      }
      <div ref={setTarget} className="Target-Element">
        { isLoaded && <Loader /> }
      </div>
    </LinkListWrap>
  );
};
