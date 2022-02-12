import styled from "styled-components";

import UserProfile from "../User/UserProfile";
import List from "../List/List";

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
  return (
    <BoxWrap>
      <Box>
        <div className="UserInfo-Box">
          <ProfileBox>
            <UserProfile />
          </ProfileBox>
          {/* <svg width={500} height={500}>
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="blue"
              strokeWidth="10"
              strokeDasharray={(10, 5)}
            />
          </svg> */}
        </div>
        {/* <div className="FolderInfo-Box">
          <List />
          <List />
        </div> */}
      </Box>
    </BoxWrap>
  );
}
