# CreateDoodle

![thumbnail](https://4rwpwj6q9lf5hlkz.public.blob.vercel-storage.com/common/images/readme_thumbnail-JOGQ0zTn8dchP7mKKD7M6yHrcjXne4.png)

## 소개

이 프로젝트는 개인용 블로그 목적으로 Next.js를 활용하여 개발된 웹 애플리케이션 입니다.
서버의 연결 없이 정적인 파일만으로 블로그를 만들기 위하여 작성되었습니다.

### 배포 URL

https://createdoodle.dev/

## 기술 스택

- Front-end : `Next.js`
- Styling : `Sass(Scss)`, `Tailwind CSS`
- 기타 : `react-markdown`, `@iconify/react`

## 폴더 구조

```
ㄴsrc
  ㄴcomponents : 컴포넌트를 모아둔 폴더
  ㄴconstants : 상수값들을 모아둔 폴더
  ㄴrepository : api 호출 함수들을 모아둔 폴더
  ㄴhooks : 컴포넌트의 비즈니스 로직을 모아둔 폴더
  ㄴapp : 페이지 컴포넌트를 모아둔 폴더
  ㄴstyle : 공통 스타일을 모아둔 폴더
  ㄴtypes : 공통 타입을 모아둔 폴더
```

## 주요 기능

- 마크다운 (.md) 로 작성된 파일 띄우기
- 포스트 리스트 페이지네이션
- 사이드바 카테고리 기능
- 모바일 반응형 적용

## 학습 내용

이 프로젝트를 통해 다음을 배웠습니다.

- Next.js 의 전반적인 사용방법
- Next.js 의 public 리소스 사용 요령
- Next.js 의 서버 컴포넌트, 클라이언트 컴포넌트 활용 방법
- Sass/Scss, Tailwind CSS 를 통한 전반적인 스타일링 및 반응형 디자인 적용
- 커스텀 훅 작성 방법

## 개선 사항 및 향후 계획

- 검색 기능 추가
- 서브 카테고리 기능 추가
- 검색 엔진 최적화(SEO) 개선
- 포스트 내 이동 가능한 목차 기능 추가
- 포스트 안 프로그래스 바 추가
