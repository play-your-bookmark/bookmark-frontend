import styled from "styled-components";

const ColorWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 8rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;

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
