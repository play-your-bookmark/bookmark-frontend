import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setKeyword } from "../../redux/slices/keywordSlices";
import CATEGORY from "../../utils/customCategory.json";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
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
  width: 350px;
  :hover {
    background-color: #f1f1f1;
  }
`;

export default function SearchBar() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(CATEGORY);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword.keyword);

  function setKeywordOnInput(keyword) {
    // 폴더 찾을 시, 쉽게 찾기 위해 정규 표현식으로 불필요한 부분 trimming -> 폴더 저장에 따라 수정 필요
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
    <Wrapper ref={wrapperRef}>
      <input
        id="search-input"
        placeholder="키워드를 입력하세요"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {keyword && (
        <button onClick={() => dispatch(setKeyword())}>메인 랭크페이지로 되돌아가기</button>
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
