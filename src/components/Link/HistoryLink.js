import styled from "styled-components";
import { dragEnd, dragOver, dragStart } from "../../utils/dnd";

const LinkWrap = styled.div`
  .LinkWrap {
    width: 40rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    margin: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
  }

  .LinkWrap-Title {
    display: flex;
    width: 40rem;
    height: 5rem;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #e2e5e7;
    color: #566270;
    font-size: 1rem;
    justify-content: center;
    text-align: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .LinkWrap-Url {
    width: 30rem;
    height: 2.5rem;
    margin: 16px;
    border-radius: 4px;
    overflow: hidden;
    font-size: 1rem;
    justify-content: center;
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
    e.dataTransfer.setData("visit_time", target.visit_time);
  };

  const handleDragEnd = (e) => {
    dragEnd(e);
  };

  return (
    <LinkWrap
      data-title={linkInfo.title}
      data-url={linkInfo.url}
      data-visit_time={linkInfo.utc_time}
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="LinkWrap">
        <div className="LinkWrap-Title ">{linkInfo.title}</div>
        <div className="LinkWrap-Url">
          <a href={linkInfo.url}>{linkInfo.url}</a>
        </div>
      </div>
    </LinkWrap>
  );
}
