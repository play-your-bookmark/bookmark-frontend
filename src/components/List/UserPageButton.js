import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getGitubUserInfo } from "../../redux/slices/userSlices";

const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;

  .Button {
    border-style: none;
    cursor: pointer;
  }

  .Button:hover {
    background-color: green;
  }
`;

export default function UserPageButton({ userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.userGithubInfo.name);

  dispatch(getGitubUserInfo({ userId: { id: userId } }));

  function handleOnClick() {
    navigate(`/app/userpage/${userId}`);
  }

  return (
    <ButtonWrap>
      <button className="Button" onClick={handleOnClick}>{`${name}님의 페이지로 이동`}</button>
    </ButtonWrap>
  );
}
