import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import axios from "axios";
import Cookies from "js-cookie";
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
  const [file, setFile] = useState(null);
  const [bookmark, setBookmark] = useState([]);

  useInfinityScroll(target);

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

    console.log(data);
    setBookmark(data);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <LinkListWrap>
      <form onSubmit={handleSubmit}>
        <input name="html" type="file" accept="html" onChange={handleFileChange} />
        <input type="submit" value="submit" />
      </form>
      {!!bookmark.length &&
        bookmark.map((info, index) => <HistoryLink linkInfo={info} key={info.key} />)}
      <div className="Target-Element">
        <img ref={setTarget} className="logo-yellow" src={logoYellow} alt="logo_yellow" />
        {isLoaded && <Loader />}
      </div>
    </LinkListWrap>
  );
}
