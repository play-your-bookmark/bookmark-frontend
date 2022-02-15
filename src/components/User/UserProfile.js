import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getGitubUserInfo, setGitubUserInfo } from "../../redux/slices/userSlices";
import Modal from "../Modal/Modal";
import githubIcon from "../../src_assets/github-icon.png";

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  .Github-Button-Img {
    width: 1rem;
  }
`;

const ImgBox = styled.div`
  .Avartar-Img {
    width: 8rem;
    border-radius: 50%;
  }

  .Default-Img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: green;
  }
`;

const BoxWrap = styled.div`
  .Form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    height: 400px;
  }

  .Input {
    width: 250px;
    height: 40px;
    text-align: center;
  }

  .Button-Wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 250px;
  }
`;

const NameGithubBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  font-size: 1.5rem;

  .Github-Button {
    border-radius: 50%;
    border-style: none;
    width: 2rem;
    height: 2rem;
    background-color: grey;
  }
`;

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { url, avatarUrl, isMyPage, name } = useSelector((state) => state.user.userGithubInfo);
  const userId = useParams();

  useEffect(() => {
    dispatch(getGitubUserInfo({ userId }));
  }, [avatarUrl, userId, dispatch]);

  function handleGithubOnClick() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  async function handleUrlOnSubmit(e) {
    e.preventDefault();

    const name = e.target.children[0].value;

    await dispatch(setGitubUserInfo({ name, userId }));

    setIsOpen(false);
  }

  return (
    <>
      <ProfileWrap>
        <ImgBox>
          {avatarUrl === "github not registed" && <div className="Default-Img" />}
          {avatarUrl !== "github not registed" && (
            <img className="Avartar-Img" alt="Avartar-Img" src={avatarUrl} />
          )}
        </ImgBox>
        <NameGithubBox>
          {url && <a href={url}>{name}</a>}
          {!url && <div>{name}</div>}
          {isMyPage && (
            <button className="Github-Button" onClick={handleGithubOnClick}>
              <img className="Github-Button-Img" alt="github icon" src={githubIcon} />
            </button>
          )}
        </NameGithubBox>
      </ProfileWrap>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <BoxWrap>
          <form className="Form" onSubmit={handleUrlOnSubmit}>
            <input className="Input" placeholder="Github 유저 이름을 입력해주세요" />
            <div className="Button-Wrap">
              <button type="submit">save</button>
              <button onClick={handleCloseModal}>close</button>
            </div>
          </form>
        </BoxWrap>
      </Modal>
    </>
  );
}
