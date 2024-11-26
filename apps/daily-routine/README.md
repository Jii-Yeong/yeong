# daily-routine
![image](https://github.com/Jii-Yeong/daily-routine/assets/57383657/335fb4a6-2d56-4a42-bad4-ce3984e3daa5)

오늘의 할 일을 확인할 수 있는 서비스

주소 : [daily-routine-seven.vercel.app
](https://daily-routine-seven.vercel.app/)
## 기술 스택
- TypeScript/React.js
- sass
- supabase : 회원 인증, DB, API 호출을 위해 사용
- Recoil : 상태 관리를 위하여 사용
- Highcharts : 할일 통계 대시보드 제작을 위해 사용
- tinymce : 투두 리스트 작성을 위해 사용
- storybook : 공통 컴포넌트 테스팅 및 UI를 위하여 사용
- luxon : 날짜 변환을 위해 사용

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

## 기능
1. 로그인/회원가입/구글 로그인

![image](https://github.com/Jii-Yeong/daily-routine/assets/57383657/d6581a8c-e8a5-43b7-adeb-e054625cd1e2)

2. 에디터를 이용한 투두 리스트 추가/수정/삭제

![Animation2](https://github.com/Jii-Yeong/daily-routine/assets/57383657/4d53aebc-7dc4-4ab9-9093-10871d84013a)


3. 투두 리스트 안에 투두 리스트 추가/수정/삭제

![Animation3](https://github.com/Jii-Yeong/daily-routine/assets/57383657/e4c25ef9-2f09-4060-89ed-04d98404990d)

4. 투두 리스트 순서 변경

![Animation](https://github.com/Jii-Yeong/daily-routine/assets/57383657/43f620fa-58c1-4101-8d7d-9904e362696f)


5. 카테고리 추가/수정/삭제
   
![Animation4](https://github.com/Jii-Yeong/daily-routine/assets/57383657/3fc05de6-7242-4744-a04f-f89ba13c7013)

6. 랜덤 투두 리스트 추가

![Animation6](https://github.com/Jii-Yeong/daily-routine/assets/57383657/ed97090d-ad62-4421-a7aa-e6ec0e0f0b2c)

7. 유저 정보 수정

![Animation5](https://github.com/Jii-Yeong/daily-routine/assets/57383657/280f1526-d31b-4dc8-8d94-5836371464aa)

8. 할일 통계 대시보드

![image](https://github.com/Jii-Yeong/daily-routine/assets/57383657/1a33f9f3-3725-4e9d-8681-906bf3a9f6bb)

