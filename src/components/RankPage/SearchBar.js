import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setKeyword } from "../../redux/slices/keywordSlices";
import CATEGORY from "../../utils/customCategory.json";

const Wrapper = styled.div`
  display: ${(props) => props.position};
  padding-left: 50px;
`;

const OptionWrapper = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 2;
`;

const Option = styled.div`
  color: black;
  text-decoration: none;
  display: block;
  margin: 5px;
  font-size: 15px;
  font-weight: bolder;
  width: 350px;
  background-color: beige;
  :hover {
    background-color: orange;
  }
`;

const CategoryInput = styled.input`
  width: 200px;
  height: 30px;
  font-size: 20px;
  padding: 10px;
`;

const MainRedirectingButton = styled.button`
  background-color: #f2c84d;
  border: 3px solid #f2c84d;
  font-size: 15px;
  font-weight: bolder;
`;

export default function SearchBar({ position }) {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(CATEGORY);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword.keyword);

  function setKeywordOnInput(keyword) {
    const folderKeyword = keyword.replace(/[^A-Za-z]/gi, "");
    dispatch(setKeyword(folderKeyword));

    setSearch("");
    setDisplay(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e) {
    const wrap = wrapperRef.current;

    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  }

  return (
    <Wrapper ref={wrapperRef} position={position}>
      <CategoryInput
        id="search-input"
        placeholder="🔎 Search category"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {keyword && (
        <MainRedirectingButton onClick={() => dispatch(setKeyword())}>
          메인 랭크페이지로 되돌아가기
        </MainRedirectingButton>
      )}
      {display && (
        <OptionWrapper>
          {options
            .filter(({ main, sub }) => {
              let modifiedSearch = null;

              if (!search) {
                return { main, sub };
              }

              if (search.length === 1) {
                modifiedSearch = search.toUpperCase();
              } else {
                modifiedSearch = search[0].toUpperCase() + search.substring(1);
              }

              return main.indexOf(modifiedSearch) > -1 || sub.indexOf(modifiedSearch) > -1;
            })
            .map((v, i) => {
              return (
                <Option
                  className="option"
                  key={v.sub}
                  onClick={() => setKeywordOnInput(v.sub)}
                  tabIndex={v.sub}
                >
                  <span>
                    {v.main} - {v.sub}
                  </span>
                </Option>
              );
            })}
        </OptionWrapper>
      )}
    </Wrapper>
  );
}
