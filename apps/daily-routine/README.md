# Daily Routine

![image](https://github.com/user-attachments/assets/ffb68c6c-ff1d-45e6-b9c9-b3f984feff1c)

## 소개

이 프로젝트는 오늘의 할일을 관리할 수 있도록 개발된 웹 애플리케이션 입니다.

### 배포 URL

https://yeong-daily-routine.vercel.app/

## 기술 스택

- `TypeScript/React.js`
- `Sass/Scss`
- `supabase` : 회원 인증, DB, API 호출을 위해 사용
- `Recoil` : 상태 관리를 위하여 사용
- `Highcharts` : 할일 통계 대시보드 제작을 위해 사용
- `tinymce` : 투두 리스트 작성을 위해 사용
- `storybook` : 공통 컴포넌트 테스팅 및 UI를 위하여 사용
- `luxon` : 날짜 변환을 위해 사용

## 폴더 구조

```
ㄴsrc
  ㄴcomponents : 컴포넌트를 모아둔 폴더
  ㄴconstants : 상수값들을 모아둔 폴더
  ㄴrepository : api 호출 함수들을 모아둔 폴더
  ㄴmodel : model, dto 타입을 모아둔 폴더
  ㄴservice : model과 dto의 상호변환 시의 비즈니스 로직을 담기 위한 폴더
  ㄴhooks : service외 컴포넌트의 비즈니스 로직을 모아둔 폴더
  ㄴpages : 페이지 컴포넌트를 모아둔 폴더
  ㄴrecoil : 상태 관리 요소들을 모아둔 폴더
  ㄴstyle : 공통 스타일을 모아둔 폴더
  ㄴsupabase : supabase 요소들을 모아둔 폴더
  ㄴutils : 유틸 함수들을 모아둔 폴더
```

## 주요 기능

- 로그인/회원가입/구글 로그인
- 에디터를 이용한 투두 리스트 추가/수정/삭제
- 투두 리스트 안에 투두 리스트 추가/수정/삭제
- 투두 리스트 순서 변경
- 카테고리 추가/수정/삭제
- 랜덤 투두 리스트 추가
- 유저 정보 수정
- 할일 통계 대시보드

## 학습 내용

이 프로젝트를 통해 다음을 배웠습니다.

- Sass/Scss를 통한 전반적인 스타일링
- supabase를 통한 서버리스 통신 방법 및 supabase API 사용 방법
- Recoil를 이용한 전반적인 상태 관리 방법
- Highcharts를 이용한 차트 렌더링, 차트 데이터 생성 방법
- Storybook을 통한 컴포넌트의 UI/로직 분리
- 투두 리스트 순서 변경 구현을 통한 JavaScript Drag Event, Mouse Event, Event Listener 활용 방법

## 개선 사항 및 향후 계획

- 전반적인 UI 수정
- 모바일 반응형 작업
- 다른 사람의 할일 구경 기능 추가
- 다른 사람에게 할일 공개/비공개 처리
- 성능 최적화
