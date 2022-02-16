import styled from "styled-components";
import { nanoid } from "nanoid";
import ColorOfLegend from "./ColorOfLegend";

const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: #ebebeb;
  width: 95%;
  height: 30rem;
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
  diplay: flex;
  justify-content: center;
`;

export default function DoughnutChart({ userCreatedfolders = [] }) {
  const RADIUS = 20;
  const MAX_COORD_Y = 49.99999;
  const accBookmarkByCategoryObject = {};

  if (userCreatedfolders.length) {
    userCreatedfolders.forEach((folder) => {
      const subCategory = folder.sub_category;

      if (subCategory && !accBookmarkByCategoryObject[subCategory]) {
        accBookmarkByCategoryObject[subCategory] = folder.bookmark.length;
        return;
      }

      accBookmarkByCategoryObject[subCategory] += folder.bookmark.length;
    });
  }

  const accBookmarkByCategoryList = Object.entries(accBookmarkByCategoryObject);
  const convertToBookmarkCountArray = accBookmarkByCategoryList.map((folder) => folder[1]);
  const totalCount = convertToBookmarkCountArray.reduce(
    (accCount, curCount) => accCount + curCount,
    0,
  );
  const accCountList = convertToBookmarkCountArray.reduce(
    (result, value) => [...result, result[result.length - 1] + value],
    [0],
  );
  const coordInfoObjectForChart = accCountList.map((count, index) => {
    const ratio = count / totalCount;
    const accDegree = ratio * 2 * Math.PI;
    const eachDegree = index
      ? (convertToBookmarkCountArray[index - 1] * 2 * Math.PI) / totalCount
      : 0;

    if (!index || index === 1) {
      return {
        startX: 70,
        startY: 50,
        finishX: 50 + RADIUS * Math.cos(accDegree),
        finishY: 50 + RADIUS * Math.sin(accDegree),
        accDegree,
        eachDegree,
        category: index ? accBookmarkByCategoryList[index - 1][0] : "",
        key: nanoid(8),
      };
    }

    const preRatio = accCountList[index - 1] / totalCount;
    const preAccDegree = preRatio * 2 * Math.PI;

    return {
      startX: 50 + RADIUS * Math.cos(preAccDegree),
      startY: 50 + RADIUS * Math.sin(preAccDegree),
      finishX: 50 + RADIUS * Math.cos(accDegree),
      finishY: 50 + RADIUS * Math.sin(accDegree),
      accDegree,
      eachDegree,
      category: accBookmarkByCategoryList[index - 1][0],
      key: nanoid(8),
    };
  });
  const colors = [];

  convertToBookmarkCountArray.forEach((folder) => {
    while (true) {
      const color = `${Math.round(Math.random() * 16777215).toString(16)}`;

      if (color !== "ebebeb" && String(color).length === 6 && !colors.includes(`#${color}`)) {
        colors.push(`#${color}`);
        break;
      }
    }
  });
  console.log(userCreatedfolders);
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
