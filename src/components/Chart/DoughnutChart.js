import styled from "styled-components";
import { nanoid } from "nanoid";
import ColorOfLegend from "./ColorOfLegend";
import {
  makeBookmarkCountAndTotalCountArray,
  makeCategoryBookmarkObject,
  makeChartInfoObject,
  makeColorArray,
} from "../../utils/chart";

const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: #ebebeb;
  width: 95%;
  height: 42rem;
  margin: 0.5rem;

  .Chart-title {
    font-size: 1.5rem;
  }

  .path {
    stroke-miterlimit: 10;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 10s linear alternate infinite;
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const LegendBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 20rem;
`;

export default function DoughnutChart({ userCreatedfolders = [] }) {
  const RADIUS = 20;
  const MAX_COORD_Y = 49.99999;
  const accBookmarkByCategoryObject = makeCategoryBookmarkObject(userCreatedfolders);
  const { accBookmarkByCategoryList, convertToBookmarkCountArray, totalCount } =
    makeBookmarkCountAndTotalCountArray(accBookmarkByCategoryObject);
  const { coordInfoObjectForChart } = makeChartInfoObject(
    accBookmarkByCategoryList,
    convertToBookmarkCountArray,
    totalCount,
  );
  const { colors } = makeColorArray(convertToBookmarkCountArray);

  return (
    <ChartWrap>
      <div className="Chart-title">Interests</div>
      {!!totalCount && (
        <svg viewBox="0 0 100 100">
          {coordInfoObjectForChart.map((count, index) => {
            const isLarge = count.eachDegree > Math.PI ? 1 : 0;

            if (Math.floor(count.finishY) === 49) {
              count.finishY = MAX_COORD_Y;
            }

            return (
              <path
                className="path"
                d={`
                  M ${count.startX.toFixed(5)} ${count.startY.toFixed(5)}
                  A ${RADIUS} ${RADIUS} 0 ${isLarge} 1 ${count.finishX.toFixed(
                  5,
                )} ${count.finishY.toFixed(5)}
                `}
                stroke={index ? colors[index - 1] : ""}
                strokeWidth="20"
                fill="transparent"
                key={count.key}
              />
            );
          })}
        </svg>
      )}
      <LegendBox>
        {!!totalCount &&
          colors.map((color, index) => {
            return (
              <ColorOfLegend
                key={index}
                color={color}
                subCategory={accBookmarkByCategoryList[index][0]}
              />
            );
          })}
      </LegendBox>
      {!totalCount && <div>북마크가 들어있는 폴더가 없습니다.</div>}
    </ChartWrap>
  );
}
