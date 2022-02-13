import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UserProfile from "../User/UserProfile";
import List from "../List/List";
import { fetchCreatedFolder } from "../../redux/slices/folderSlices";
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
    width: 60%;
    border-style: solid;
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

  useEffect(() => {
    dispatch(fetchCreatedFolder({ userObjectId }));
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
          <List category="category" origin="mainCategory" userCreatedFolders={createdFolders} />
        </div>
      </Box>
    </BoxWrap>
  );
}
