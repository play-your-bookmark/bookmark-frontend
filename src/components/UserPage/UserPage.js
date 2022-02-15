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
`;

const Box = styled.div`
  display: flex;

  .UserInfo-Box {
    width: 40%;
    border-style: solid;
  }

  .FolderInfo-Box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    border-style: solid;
  }

  .LikeList {
  }

  .CreatedList {
  }
`;

const ProfileBox = styled.div`
  width: 100%;
  border-style: solid;
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
      <Box>
        <div className="UserInfo-Box">
          <ProfileBox>
            <UserProfile />
          </ProfileBox>
          <DoughnutChart userCreatedfolders={createdFolders} />
        </div>
        <div className="FolderInfo-Box">
          <div className="LikeList">
            <div>Like Folder</div>
            <List category="category" origin="mainCategory" userLikedFolders={likedFolders} />
          </div>
          <div className="CreatedList">
            <div>Create Folder</div>
            <List category="category" origin="mainCategory" userCreatedFolders={createdFolders} />
          </div>
        </div>
      </Box>
    </BoxWrap>
  );
}
