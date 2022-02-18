import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCreatedFolder, fetchLikeFolder } from "../../redux/slices/folderSlices";
import UserProfile from "../User/UserProfile";
import List from "../List/List";
import DoughnutChart from "../Chart/DoughnutChart";

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 89.7vh;

  .UserInfo-Box,
  .FolderInfo-Box {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .UserInfo-Box {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-right: 100px;
    justify-content: space-evenly;
    align-items: flex-end;
  }

  .FolderInfo-Box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 70%;
    margin-right: 100px;
  }

  .LikeList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 19rem;
    margin-top: 1.5rem;
    padding: 10px 10px;
    border-radius: 1rem;
    background-color: #ebebeb;
    box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;
  }

  .CreatedList {
    width: 80%;
    padding: 10px 10px;
    border-radius: 1rem;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 24rem;
    margin-bottom: 1.5rem;
    box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 70%;
`;

export default function UserPage() {
  const dispatch = useDispatch();
  const userObjectId = useParams();
  const createdFolders = useSelector((state) => state.folder.folderList);
  const likedFolders = useSelector((state) => state.folder.likedFolder);

  useEffect(() => {
    dispatch(fetchCreatedFolder({ userObjectId }));
    dispatch(fetchLikeFolder({ userObjectId }));
  }, [dispatch, userObjectId]);

  return (
    <BoxWrap>
      <div className="UserInfo-Box">
        <ProfileBox>
          <UserProfile />
        </ProfileBox>
        <DoughnutChart userCreatedfolders={createdFolders} />
      </div>
      <div className="FolderInfo-Box">
        <div className="LikeList">
          <div className="title">Like List</div>
          <List
            category="category"
            origin="mainCategory"
            userLikedFolders={likedFolders}
            width="90%"
            height="20rem"
            color="#5587f5"
          />
        </div>
        <div className="CreatedList">
          <div className="title">Create List</div>
          <List
            category="category"
            origin="mainCategory"
            userCreatedFolders={createdFolders}
            width="90%"
            height="21rem"
            color="#5587f5"
          />
        </div>
      </div>
    </BoxWrap>
  );
}
