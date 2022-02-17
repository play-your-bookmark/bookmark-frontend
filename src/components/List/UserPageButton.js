import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonWrap = styled.div`
  position: absolute;
  top: 10px;

  button {
    background-color: white;
    border-style: none;
  }

  .Button {
    width: 300px;
    height: 40px;
    cursor: pointer;
    border-radius: 15px;
    box-shadow: rgba(26, 26, 26, 0.4) 0px 3px 2px 2px;
  }

  .Button:hover {
    box-shadow: rgba(26, 26, 26, 0.8) 0px 3px 2px 2px;
    /* font-weight: bold; */
    background-color: #f2c84d;
    color: white;
    transition: 0.3s;
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
