import styled from "styled-components";

const ColorWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 6rem;

  .Color-Box {
    width: 1rem;
    height: 1rem;
  }
`;

export default function ColorOfLegend({ color, subCategory }) {
  return (
    <ColorWrap>
      <div className="Color-Box" style={{ background: color }} />
      <div>{subCategory}</div>
    </ColorWrap>
  );
}
