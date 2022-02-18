import { nanoid } from "nanoid";

export function makeCategoryBookmarkObject(folders) {
  const object = {};

  if (folders.length) {
    folders.forEach((folder) => {
      const subCategory = folder.sub_category;

      if (subCategory && !object[subCategory]) {
        object[subCategory] = folder.bookmark.length;
        return;
      }

      object[subCategory] += folder.bookmark.length;
    });
  }

  return object;
}

export function makeBookmarkCountAndTotalCountArray(object) {
  const accBookmarkByCategoryList = Object.entries(object);
  const convertToBookmarkCountArray = accBookmarkByCategoryList.map((folder) => folder[1]);
  const totalCount = convertToBookmarkCountArray.reduce(
    (accCount, curCount) => accCount + curCount,
    0,
  );

  return { accBookmarkByCategoryList, convertToBookmarkCountArray, totalCount };
}

export function makeChartInfoObject(accBookmarkByCategoryList, bookmarkCountArray, totalCount) {
  const RADIUS = 20;
  const accCountList = bookmarkCountArray.reduce(
    (result, value) => [...result, result[result.length - 1] + value],
    [0],
  );
  const coordInfoObjectForChart = accCountList.map((count, index) => {
    const ratio = count / totalCount;
    const accDegree = ratio * 2 * Math.PI;
    const eachDegree = index ? (bookmarkCountArray[index - 1] * 2 * Math.PI) / totalCount : 0;

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

  return { coordInfoObjectForChart };
}

export function makeColorArray(convertToBookmarkCountArray) {
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

  return { colors };
}
