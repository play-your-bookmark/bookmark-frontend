import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UserProfile from "../User/UserProfile";
import List from "../List/List";
import { fetchCreatedFolder, fetchLikeFolder } from "../../redux/slices/folderSlices";
import DoughnutChart from "../Chart/DoughnutChart";

const BoxWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .UserInfo-Box {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .FolderInfo-Box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    border-style: solid;
  }

  .LikeList {
    border-radius: 1rem;
    background-color: #ebebeb;
  }

  .CreatedList {
    border-radius: 1rem;
    background-color: #ebebeb;
  }
`;

// const Box = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100%;
// `;

const ProfileBox = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: #ebebeb;
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
          <div>Like Folder</div>
          <List
            category="category"
            origin="mainCategory"
            userLikedFolders={likedFolders}
            width={450}
            height={200}
          />
        </div>
        <div className="CreatedList">
          <div>Create Folder</div>
          <List
            category="category"
            origin="mainCategory"
            userCreatedFolders={createdFolders}
            width={450}
            height={200}
          />
        </div>
      </div>
    </BoxWrap>
  );
}
