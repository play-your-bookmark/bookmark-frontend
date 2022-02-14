import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

export default function UserPageButton({ onClick, userName, userObjectId }) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/app/userpage/${userObjectId}`);
    onClick();
  }

  return (
    <ButtonWrap>
      <button className="Button" onClick={handleOnClick}>{`${userName}님의 페이지로 이동`}</button>
    </ButtonWrap>
  );
}
