# 개발 개요
* React v18
* create-react-application 으로 생성된 프로젝트로 Webpack, Babel로 빌드되고 있음
* 배포는 AWS 서버에서 이루어지고 있음
* 자동 배포 yml파일 : [Diabetes/.github/workflows/frontend-ci-cd.yml]('../.github/workflows/frontend-ci-cd.yml')

# 프론트 테스트 서버 실행하기
* 명령어 `npm start`
* 테스트 서버주소 `localhost:3000`

## 테스트 서버 사용시 주의
1. API 요청 에러 - 로컬에서 Backend 서버로의 API요청 불가
2. utils의 BASE URL 수정없이 페이지 이동 발생시, 배포된 서버로 이동할 수 있음
3. `npm start` 명령어 오류 시, `npm i`로 package.json의 의존성들을 설치한 후 재입력

## 부가설명
* 주요 페이지 주소

  /login

  /login/redirect

  /mylist

  /userlist

  /foodForm

