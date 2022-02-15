import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import category from "../../../utils/category.json";
import List from "../../List/List";
import useInterval from "../../../utils/useInterval";
import { updateSecond } from "../../../redux/slices/timerSlice";
import { fetchCategoryFolder } from "../../../redux/slices/categoryFolderSlices";

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 40px;
`;

const TitleWrapper = styled.h2`
  display: flex;
  justify-content: center;
`;

export default function MainRankPage() {
  const [isRunning, setIsRunning] = useState(true);
  const loadingTime = useSelector((state) => state.timer.second);
  const dispatch = useDispatch();

  useInterval(
    async () => {
      if (loadingTime === 0) {
        setIsRunning(false);

        category.mainCategory.map(async (element, index) => {
          await dispatch(
            fetchCategoryFolder({
              origin: "mainCategory",
              category: category.mainCategory[index].name,
            }),
          );
        });

        dispatch(updateSecond(process.env.REACT_APP_RANK_PAGE_LOADING_DELAY / 1000));
        setIsRunning(true);
      } else {
        dispatch(updateSecond(-1));
      }
    },
    isRunning ? 1000 : null,
  );

  return (
    <ListWrapper>
      {category.mainCategory.map((element, index) => (
        <div key={element.name}>
          <TitleWrapper># {category.mainCategory[index].name}</TitleWrapper>
          <List
            category={category.mainCategory[index].name}
            origin="mainCategory"
            width={450}
            height={500}
          />
        </div>
      ))}
    </ListWrapper>
  );
}
