# Play your Bookmark
### Play your bookmark!
내 북마크를 공유하고 다른 사람의 북마크로부터 유용한 정보를 얻어보세요.

![login page](https://user-images.githubusercontent.com/73685676/154782017-7e99de02-bb05-4a5a-9ba7-585e2e6b4c03.png)

[playyourbookmark.com](https://playyourbookmark.com)
<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue.svg" alt="Frontend-React">
  <img src="https://img.shields.io/badge/Backend-Node%20&%20Express-green.svg" alt="Backend-Node-Express">
  <img src="https://img.shields.io/badge/AWS-deployed-brightgreen" alt="AWS">
  <a href="https://gitkkal.xyz" title="Netlify-deploy-status">
    <img src="https://api.netlify.com/api/v1/badges/b53a6a4d-8634-4f9b-959b-6656ca76c6db/deploy-status" alt="Netlify-deploy-status">
  </a>
</p>

## About '90-crew'?
어쩌다 보니 바코를 중심으로 편도 90분 거리에 사는 사람 3명이 모였습니다.

✨[서현욱](https://github.com/Hyunwooksuh)
<br />
✨[하태용](https://github.com/hatae94)
<br />
✨[이시현](https://github.com/shlee39)

## What is "Play your Bookmark"?
유용한 북마크들을 카테고리별로 정리하여 저장하고 다른 유저들과 공유할 수 있는 웹 서비스 입니다.
<br />
아무렇게나 정리된 북마크들은 개발자에게 전혀 도움이 되지 않습니다!

북마크 폴더의 카테고리를 지정하고 해당 카테고리에 맞는 나만의 북마크 폴더를 구성할 수 있습니다.
<br />
카테고리별로 가장 많은 사랑을 받은 폴더를 확인하고, 어떤 웹 페이지들을 담아뒀는지 확인하여 나에게 유용한 정보들을 얻어갈 수 있습니다.

## Schedule
프로젝트 기간

2022.1.24 - 2022.1.28 : 1주
- 아이디어 기획
- 목업 작성
- 계획 수립

2022.2.7 - 2022.2.18 : 2주
- 개발 진행
- 배포
- Read.me 작성

## Tech Stack
### Frontend
- react
- react redux / redux-toolkit
- firebase
- styled-component
- jsonwebtoken

### Backend
- Node.js + Express
- MongoDB + MOngoDB Atlas
- Mongoose
- firebase

### 그 외
- AWS
- ESLint
- Prettier

### Task Tool
- Schedule : [Jira](https://90crew.atlassian.net/jira/software/projects/MYS/boards/1)
- Mockup : Figma

## Features
### 로그인
- google 소셜 로그인으로 로그인 및 회원가입이 가능합니다.

### Rank
- `Backend`, `Frontend`, `Language` 별 인기있는 폴더 순서를 확인할 수 있습니다.
- 검색 키워드를 입력하거나, 카테고리를 선택하면 해당 키워드 / 카테고리별 인기 있는 폴더를 확인할 수 있습니다.
- 5초마다 바뀐 `좋아요`에 맞는 순위를 보여줍니다.
- 폴더를 누르면 어떤 북마크가 들어있는 지 확인할 수 있고, 폴더를 만든 유저의 페이지에 방문하거나 좋아요를 누를 수 있습니다.

### Edit
- 폴더를 새로 생성하고, 드래그 앤 드롭으로 폴더의 계층 구조를 변경할 수 있으며 삭제 할 수 있습니다.
- Chrome 브라우저에서 내보내기 한 북마크 파일을 입력하면 북마크된 링크들이 목록에 생성되며 해당 북마크들을 드래그하여 폴더에 넣을 수 있습니다.
- 폴더를 더블클릭하면 폴더의 상세한 정보를 확인할 수 있으며, 타이틀, 카테고리를 수정하고, 이미 들어있는 북마크를 삭제할 수 있습니다.

### User
- 유저의 프로필을 확인할 수 있습니다. 
- Github 주소를 입력하면 Github의 프로필과 주소가 연동됩니다.
- 나 / 유저가 저장한 북마크 카테고리에 따른 관심사를 도넛 그래프로 한 눈에 확인할 수 있습니다.
- 나 / 유저가 좋아한 폴더나 생성한 폴더들을 확인할 수 있습니다.

## Technical Log
### tree view 구현
### history
### dnd
### 내보내기 한 북마크 가져오기
### 배포

