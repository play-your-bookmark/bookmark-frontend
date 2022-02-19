import styled from "styled-components";

import { dragEnd, dragOver, dragStart } from "../../utils/dnd";

const LinkWrap = styled.div`
  .LinkWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 50rem;
    height: 5rem;
    border-radius: 5px;
    margin: 20px 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    :hover {
      box-shadow: rgba(100, 100, 111, 0.6) 0px 7px 29px 0px;
      font-weight: bold;
      transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }

  .LinkWrap-Title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #ebebeb;
    cursor: pointer;
  }

  .LinkWrap-Url {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
  }
`;

export default function HistoryLink({ linkInfo }) {
  const handleDragOver = (e) => {
    dragOver(e);
  };

  const handleDragStart = (e) => {
    dragStart(e);

    const target = e.currentTarget.dataset;
    e.dataTransfer.setData("type", "link");
    e.dataTransfer.setData("title", target.title);
    e.dataTransfer.setData("url", target.url);
  };

  const handleDragEnd = (e) => {
    dragEnd(e);
  };

  return (
    <LinkWrap
      data-title={linkInfo.title}
      data-url={linkInfo.url}
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="LinkWrap">
        <div className="LinkWrap-Title ">
          {linkInfo.title
            ? linkInfo.title.length > 50
              ? `${linkInfo.title.slice(0, 50)}...`
              : linkInfo.title
            : "제목 없음"}
        </div>
        <div className="LinkWrap-Url">
          <a href={linkInfo.url}>
            {linkInfo.url.length > 50 ? `${linkInfo.url.slice(0, 50)}...` : linkInfo.url}
          </a>
        </div>
      </div>
    </LinkWrap>
  );
}
