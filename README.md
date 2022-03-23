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
- 개발 진행 및 배포
- Readme.md 작성

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
- ESLint + Prettier

### Task Tool
- Schedule : [Jira](https://90crew.atlassian.net/jira/software/projects/MYS/boards/1)
- Mockup : [Figma](https://www.figma.com/file/gSNpLMxkEmz0oscsBiIZ0y/play-your-bookmark)

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
tree 자료구조에서 영감을 받았으며, nested array를 사용하여, 부모 - 자식 간의 상대적 위계관계를 정의하였습니다. 

- building folder tree: 배열 형태로 자식을 저장하는 방식으로서, 재귀적으로 함수를 호출하여, nested tree를 구성하였습니다. 이 경우, 첫 인덱스로는 id값을 저장하였는데, 이는 relocate, add, delete 등의 메소드 구현을 염두한 것으로서 추가, 수정, 삭제를 용이하게 하였습니다.
- rendering folder tree: Componenet를 재귀적으로 rendering 하였습니다. 최초, build된 folder tree를 props로 받고, map배열을 통해 tree의 children들을 props로 전달 및 재귀호출하여 전체 tree를 render합니다.
- folder tree method: nested array 배열을 재귀호출을 통해 조회하며, target folder를 찾고 아래와 같은 메소드를 수행합니다.
  - relocate folder: 현재 참조하고 있는 parent folder를 다른 parent folder로 바꿔줍니다. 이 경우, 해당 child folder 이하의 children들도 함께 이동시킬 수 있습니다. 
  - add / delete tree: 현재 참조하고 있는 parent folder를 찾아, 해당 배열을 iterating 하여 target folder를 추가, 삭제합니다.

### drag and drop

라이브러리를 사용하기보다는 직접 구현해보고자 하는 팀의 프로젝트 구현 방향에 맞춰 `react-dnd` 와 같은 drag&drop으로 유명하고 널리 사용되고 있는 리액트 라이브러리 대신, `HTML Drag & drop API` 를 직접 사용해보기로 했습니다. `HTML Drag and Drop API` 를 활용하였지만 `appendChild` 와 같이 직접 DOM의 구조 변경을 시도하는 것이 아닌, 우리의 프로젝트의 폴더 tree-view 구조에 맞게 적용시켰습니다.

서버에 api 요청을 매번 보내지 않고 폴더의 계층구조 변경 및 북마크 링크를 폴더에 추가하는 기능에 사용하기 위해 `dataset`을 활용하였습니다. 

이번 프로젝트에서 db에 저장된 폴더의 구조는 nested child를 모두 기록하는 방식이 아닌, parent가 누구인지를 저장해두는 형태이기 때문에 계층 구조를 바꾸는 경우, drop event 발생 시 놓는 곳의 id값을 받아서 drag 한 파일의 parent를 바꾸어주는 방법으로 활용하였습니다. 또한, drag 하는 대상이 폴더인지, 링크인지를 구분하기 위해 `dataTransfer.setdata()`로 구분하여 drop시에 발생하는 이벤트 분기 처리에 활용하였습니다.

### history
저희 프로젝트의 핵심 기능 중 하나인 검색기록을 불러오기 위해 node-browser-history 라이브러리를 사용하였습니다.
해당 라이브러리는 여러 다양한 브라우저와 윈도우, 맥, 리눅스 환경을 지원하여 저희의 목적에 비해 상대적으로 용량이 크다고 판단하였습니다.
따라서 라이브러리를 오로지 크롬 브라우저, 맥, 윈도우 환경에서 지원할 수 있도록 수정 및 배포하였습니다.

또한 기존의 기능은 현재 날짜에서 n분 전까지의 기록을 가져오는 것에 비해, 사용자가 지정한 특정 날짜에서 n분 뒤의 기록을 탐색할 수 있도록 기능을 확장하였습니다.
로컬 환경에서 테스트 결과 정상적으로 작동하는 것을 확인하였고, 다른 핵심 기능과 더불어 비교적 원활히 개발을 진행하였습니다.
하지만 aws 배포 후에 저희는 aws 서버에서 로컬 환경에 접근하지 못한다는 것을 알게 되었습니다.
이 과정에서 프론트엔드 단에서도 로컬 환경에 접근하지 못하는 것 또한 인지하게 되었습니다.
검색 기록을 가져오는 것은 저희 프로젝트의 핵심 기능 중 하나였고, 이를 위해 저희가 배포한 라이브러리를 사용할 수 없다는 사실이 프로젝트가 마무리되는 시점에서 발견되었기에 시간이 갑작스레 촉박해졌습니다.
이러한 이슈를 해결하기위해 머리를 맞대고 고민한 결과, 구글 사용자가 이미 만들어놓은 즐겨찾기 폴더를 import하는 방향으로 전환하였습니다.
이를 위해 파일 업로드 로직을 작성하여 받은 파일을 multer로 받고, 이를 parsing하여 parsing된 html을 해석하고 링크 태그를 받을 수 있도록 하여 이슈를 해결할 수 있었습니다.

## 소감
### 잘한 점
프로젝트 주요 기능에 리액트 라이브러리를 최대한 사용하지 않은 점, 컴포넌트의 재사용성에 대해서 의견을 나누고, 구현한 기능을 사용하지 못하는 위기 상황일수록 서로 소통하고 머리를 맞대며 해결 방안을 찾아갔던 점입니다.

### 아쉬운 점
초기에 선정한 기술에 대해 사전 검증을 더욱 철저하게 하지 못했던 점 입니다. 이 부분에 대해서 부족하여 프로젝트가 위기를 맞이하기도 하였기 때문에 큰 교훈이 되었다고 생각합니다.
개발과정에서 간헐적으로라도 테스트 배포를 하지 못한 점 또한 아쉬움으로 다가왔습니다. 테스트 배포를 진행했다면 사전 기술 검증 단계에서 부족했던 점을 일찍 발견하고 보완할 수 있었을 것이라고
생각합니다.
또한, 이러한 이슈로 인해 추가적으로 구현하고자 생각했던 기능들에 도전해보지 못한 점이 아쉽습니다. 
추후에는 검색기록으로 북마크 폴더를 구성하는 기능은 크롬 익스텐션을 통해 구현해보거나 공유된 폴더 안의 개별 북마크들에 대해서도 공유될 수 있도록 기능을 개선해보고 싶습니다.


