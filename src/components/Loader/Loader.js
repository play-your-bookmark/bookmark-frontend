import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export default function Loader({ height = 64, width = 64 }) {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" height={height} width={width} />
    </LoaderWrap>
  );
}
