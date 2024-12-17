# Readly

![image](https://github.com/user-attachments/assets/bc1e58ce-174d-4ac0-9c89-5e3c1413f747)

## 소개
이 프로젝트는 자신이 읽은 책의 소감을 자유롭게 게시할 목적으로 Next.js를 활용하여 개발된 웹 애플리케이션 입니다.

### 배포 URL
https://readly-steel.vercel.app/

## 기술 스택
- `Next.js`
- `Tailwind CSS`
- `React Query`
- `tinyMCE`

## 폴더 구조
```
ㄴsrc
  ㄴapi : axios instance를 모아둔 폴더
  ㄴapp : 페이지 컴포넌트를 모아둔 폴더
  ㄴcomponents : 컴포넌트를 모아둔 폴더
  ㄴconstants : 상수값들을 모아둔 폴더
  ㄴrepository : api 호출 함수들을 모아둔 폴더
  ㄴmodel : 데이터의 model, dto 타입을 모아둔 폴더
  ㄴservice : model과 dto의 상호변환 시의 비즈니스 로직을 담기 위한 폴더
  ㄴhooks : service외 컴포넌트의 비즈니스 로직을 모아둔 폴더
  ㄴlib : 라이브러리의 기본 설정들을 모아둔 폴더
  ㄴstyle : 공통 스타일을 모아둔 폴더
  ㄴtypes : 공통 타입을 모아둔 폴더
  ㄴutils : 유틸 함수들을 모아둔 폴더
```

## 주요 기능
- 일반 로그인과 회원가입
- 구글 로그인
- 책 요약 작성/상세 조회/수정/삭제
- 책 요약 무한스크롤
- 책 검색 기능
- 댓글 및 대댓글 기능
- 상세 페이지 좋아요 버튼
- 소셜 공유 기능 (카카오톡, 트위터, URL 복사)
- 카테고리에 따른 책 요약 데이터 분류
- 최신순, 등록순, 조회순, 좋아요순에 따른 요약 리스트 정렬
- 회원 닉네임, 프로필 사진 수정 기능
- 마이페이지 기능

## 학습 내용
이 프로젝트를 통해 다음을 배웠습니다.
- Next.js의 전반적인 사용방법
- oauth2를 통한 소셜 로그인 구현 방법
- React Query를 이용한 API 호출 관리 방법
- React Query를 이용한 효율적인 API 데이터 캐싱 또는 refetch 방법
- Tailwind CSS를 통한 스타일링 및 반응형 디자인 적용

## 개선 사항 및 향후 계획
- ~~무한 스크롤 추가~~ (24.12.17 구현)
- 책 요약 작성 시 책 검색 기록 모달 추가
- 카테고리 중복 등록이 가능하도록 수정
- 가장 많이 등록된 책 순위 컴포넌트 추가
- 메인 페이지 리스트 뷰 다른 UI 형태 추가

