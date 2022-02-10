import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import KOR_CATEGORY from "../../utils/customCategory.json";

export default function SearchBar() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState(KOR_CATEGORY);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  function setKeywordOnInput(keyword) {
    setSearch(keyword);
    setDisplay(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e) {
    const { current: wrap } = wrapperRef;

    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  }

  return (
    <div ref={wrapperRef}>
      <input
        id="search-input"
        placeholder="키워드를 입력하세요"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {display && (
        <div>
          {options
            .filter(({ main, sub }) => main.indexOf(search) > -1 || sub.indexOf(search) > -1)
            .map((v, i) => {
              return (
                <div
                  className="option"
                  key={v.sub}
                  onClick={() => setKeywordOnInput(v.sub)}
                  tabIndex={v.sub}
                >
                  <span>
                    {v.main} - {v.sub}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
