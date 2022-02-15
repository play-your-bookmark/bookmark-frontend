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
  width: 100%;
  margin-top: 1rem;
`;

const LegendBox = styled.div`
  diplay: flex;
  justify-content: center;
`;

export default function DoughnutChart({ userCreatedfolders = [] }) {
  const radius = 50;
  const diameter = 2 * Math.PI * radius;
  const accBookmarkByCategoryObject = {};

  if (userCreatedfolders.length) {
    userCreatedfolders.forEach((folder) => {
      const subCategory = folder.sub_category;

      if (subCategory && !accBookmarkByCategoryObject[subCategory]) {
        accBookmarkByCategoryObject[subCategory] = 1;
        return;
      }

      accBookmarkByCategoryObject[subCategory] += 1;
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
  // path 태그를 사용할 시
  // const coordInfoObjectForChart = accCountList.map((count, index) => {
  //   const ratio = count / totalCount;
  //   const degree = ratio * 2 * Math.PI;

  //   if (!index || index === 1) {
  //     return {
  //       startX: 70,
  //       startY: 50,
  //       finishX: 50 + radius * Math.cos(degree),
  //       finishY: 50 + radius * Math.sin(degree),
  //       degree,
  //       category: index ? userCreatedfolders[index - 1].sub_category : "",
  //       key: nanoid(8),
  //     };
  //   }

  //   const preRatio = convertToBookmarkCountArray[index - 1] / totalCount;
  //   const preDegree = preRatio * 2 * Math.PI;

  //   return {
  //     startX: 50 + radius * Math.cos(preDegree),
  //     startY: 50 + radius * Math.sin(preDegree),
  //     finishX: 50 + radius * Math.cos(degree),
  //     finishY: 50 + radius * Math.sin(degree),
  //     degree,
  //     category: userCreatedfolders[index - 1].sub_category,
  //     key: nanoid(8),
  //   };
  // });
  const colors = [];

  convertToBookmarkCountArray.forEach((folder) => {
    colors.push(`#${Math.round(Math.random() * 0xffffff).toString(16)}`);
  });

  return (
    <ChartWrap>
      {!!totalCount && (
        <svg viewBox="0 0 200 200">
          {convertToBookmarkCountArray.map((count, index) => {
            // const isLarge = count.degree > Math.PI ? 1 : 0;
            const ratio = count / totalCount;
            const fillSpace = diameter * ratio;
            const emptySpace = diameter - fillSpace;
            const offset = (accCountList[index] / totalCount) * diameter;
            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={String(radius)}
                fill="transparent"
                stroke={colors[index]}
                strokeWidth="50"
                strokeDasharray={`${fillSpace} ${emptySpace}`}
                strokeDashoffset={String(-offset)}
              />
              // <path
              //   d={`
              //   M ${count.startX} ${count.startY}
              //   A ${radius} ${radius} 0 0 1 ${count.finishX} ${count.finishY}
              //   L ${count.finishX} ${count.finishY}
              // `}
              //   stroke={colors[colors.length - index]}
              //   strokeWidth="20"
              //   fill="transparent"
              //   key={count.key}
              // />
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
