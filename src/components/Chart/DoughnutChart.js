export default function DoughnutChart({ userCreatedfolders }) {
  const colors = ["#ddd", "#bbb", "#aaa", "#888", "#666"];
  const radius = 20;
  const diameter = 2 * Math.PI * radius;
  const convertToBookmarkCountArray = userCreatedfolders.map((folder) => folder.bookmark.length);
  const totalCount = convertToBookmarkCountArray.reduce(
    (accCount, curCount) => accCount + curCount,
    0,
  );
  const accCountList = convertToBookmarkCountArray.reduce(
    (result, value) => [...result, result[result.length - 1] + value],
    [0],
  );

  return (
    <svg viewBox="0 0 100 100">
      {convertToBookmarkCountArray.length &&
        convertToBookmarkCountArray.map((count, index) => {
          const ratio = count / totalCount;
          const fillSpace = diameter * ratio;
          const emptySpace = diameter - fillSpace;
          const offset = (accCountList[index] / totalCount) * diameter;
          return (
            <circle
              cx="50"
              cy="50"
              r={String(radius)}
              fill="none"
              stroke={colors[index]}
              strokeWidth="10"
              strokeDashoffset={String(-offset)}
              strokeDasharray={`${fillSpace} ${emptySpace}`}
            />
          );
        })}
    </svg>
  );
}
