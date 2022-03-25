import styled from "styled-components";

import ReactLoading from "react-loading";

const LoaderWrap = styled.div`
  width: 110%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  .loading-time {
    font-size: 15px;
  }
`;

export default function Loader({ height = 64, width = 64, loadingTime }) {
  return (
    <LoaderWrap>
      <div className="loading-time">{loadingTime}초 뒤 업데이트</div>
      <ReactLoading type="spin" color="#A593E0" height={height} width={width} />
    </LoaderWrap>
  );
}
