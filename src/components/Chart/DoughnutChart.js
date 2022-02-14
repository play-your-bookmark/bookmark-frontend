import styled from "styled-components";
import { nanoid } from "nanoid";

const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function DoughnutChart({ userCreatedfolders = [] }) {
  console.log("asdfasdfadsf", userCreatedfolders);
  const colors = ["#ddd", "#bbb", "#aaa", "#888", "#666"];
  const radius = 20;
  const convertToBookmarkCountArray = userCreatedfolders.map((folder) => {
    if (folder.bookmark) {
      return folder.bookmark.length;
    }

    return 0;
  });
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
    const degree = ratio * 2 * Math.PI;

    if (!index || index === 1) {
      return {
        startX: 70,
        startY: 50,
        finishX: 50 + radius * Math.cos(degree),
        finishY: 50 + radius * Math.sin(degree),
        degree,
        category: index ? userCreatedfolders[index - 1].sub_category : "",
        key: nanoid(8),
      };
    }

    const preRatio = convertToBookmarkCountArray[index - 1] / totalCount;
    const preDegree = preRatio * 2 * Math.PI;

    return {
      startX: 50 + radius * Math.cos(preDegree),
      startY: 50 + radius * Math.sin(preDegree),
      finishX: 50 + radius * Math.cos(degree),
      finishY: 50 + radius * Math.sin(degree),
      degree,
      category: userCreatedfolders[index - 1].sub_category,
      key: nanoid(8),
    };
  });
  return (
    <ChartWrap>
      {!!totalCount && (
        <svg viewBox="0 0 100 100">
          {coordInfoObjectForChart.map((count, index) => {
            const isLarge = count.degree > Math.PI ? 1 : 0;
            return (
              <path
                d={`
                M ${count.startX} ${count.startY}
                A ${radius} ${radius} 0 ${isLarge} 1 ${count.finishX} ${count.finishY}
                L ${count.finishX} ${count.finishY}
              `}
                stroke={colors[colors.length - index]}
                strokeWidth="20"
                fill="transparent"
                key={count.key}
              />
            );
          })}
        </svg>
      )}
      {!totalCount && <div>북마크가 들어있는 폴더가 없습니다.</div>}
    </ChartWrap>
  );
}
