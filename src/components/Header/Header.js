import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");

  function handleInsertKeyword(e) {
    setSearchKeyword(e.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(searchKeyword);
    }, 1000);
  }, [searchKeyword]);

  return (
    <div>
      <div>
        <h1>헤더입니다</h1>
        <input
          name="keyword"
          onChange={handleInsertKeyword}
          value={searchKeyword}
          placeholder="검색어 입력하세요"
        />
      </div>
      <Outlet />
    </div>
  );
}
