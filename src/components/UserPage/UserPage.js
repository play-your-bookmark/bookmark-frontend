import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UserProfile from "../User/UserProfile";
import List from "../List/List";
import { fetchCreatedFolder, fetchLikeFolder } from "../../redux/slices/folderSlices";
import DoughnutChart from "../Chart/DoughnutChart";

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-style: solid;

  .UserInfo-Box {
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
  }

  .FolderInfo-Box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 55%;
    height: 100%;
    border-style: solid;
  }

  .LikeList {
    width: 95%;
    border-radius: 1rem;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  .CreatedList {
    width: 95%;
    border-radius: 1rem;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
`;

const ProfileBox = styled.div`
  width: 95%;
  height: 25%;
  border-radius: 1rem;
  background-color: #ebebeb;
  margin: 0.5rem;
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
          <div>Like List</div>
          <List
            category="category"
            origin="mainCategory"
            userLikedFolders={likedFolders}
            width="100%"
            height="5rem"
          />
        </div>
        <div className="CreatedList">
          <div>Create List</div>
          <List
            category="category"
            origin="mainCategory"
            userCreatedFolders={createdFolders}
            width="100%"
            height="27rem"
          />
        </div>
      </div>
    </BoxWrap>
  );
}
