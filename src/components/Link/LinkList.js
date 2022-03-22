import { useState } from "react";
import styled from "styled-components";

import axios from "axios";
import Cookies from "js-cookie";
import HistoryLink from "./HistoryLink";

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

  .input-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 500px;
    height: 100px;
    margin-top: 200px;

    .html {
      border: none;
      background-color: white;
      font-size: 15px;
    }
  }
`;

export default function LinkList() {
  const [file, setFile] = useState(null);
  const [bookmark, setBookmark] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();
    formData.append("bookmark", file);

    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/file`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setBookmark(data);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();
    formData.append("bookmark", file);

    const { data } = await axios.post("http://localhost:7001/file", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setBookmark(data);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <LinkListWrap>
      {!bookmark.length && (
        <div className="input-box">
          <h3>
            Chrome 브라우저 - 설정 - 북마크 - 북마크 관리자에서
            <br />
            북마크 내보내기로 받은 파일을 넣어주세요
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              className="html"
              name="html"
              type="file"
              accept="html"
              onChange={handleFileChange}
            />
            <input className="html" type="submit" value="북마크 가져오기" />
          </form>
        </div>
      )}
      {!!bookmark.length && bookmark.map((info) => <HistoryLink linkInfo={info} key={info.key} />)}
    </LinkListWrap>
  );
}
