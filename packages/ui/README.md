# @yeong/ui

## 소개

이 프로젝트는 yeong 모노레포 안 디자인 시스템 내부 패키지 입니다.
다양한 프로젝트들이 모여있는 yeong Repositioy 안에서 공통으로 컴포넌트를 사용하기 위하여 작성되었습니다.

## 기술 스택

- `React.js`
- `Tailwind CSS`
- `class-variance-authority`
- `tailwind-merge`

## 폴더 구조

```
ㄴsrc
  ㄴcomponents : 공통 컴포넌트를 모아둔 폴더
  ㄴconstants : 상수값들을 모아둔 폴더
  ㄴhooks : 컴포넌트의 비즈니스 로직을 모아둔 폴더
  ㄴtypes : 공통 타입을 모아둔 폴더
  ㄴutils : 공통 유틸을 모아둔 폴더
```

## 구현 컴포넌트

- Button
- Toggle Button
- Chip
- Divider
- Dropdown
- Profile Image
- Input
- FileInput
- Textarea
- Loading Circle
- Pagination
- Skeleton
- Ellipsis Text
- Toast

### Storybook

https://design-system-silk-xi.vercel.app/

## 학습 내용

이 프로젝트를 통해 다음을 배웠습니다.

- 디자인 시스템에 대한 전반적인 구조
- UI 컴포넌트 생성 시 비즈니스 로직 분리 중요성
- Tailwind CSS와 class-variance-authority 를 통한 동적 스타일링
- React memo 기능의 중요성 및 사용 용도
- forwardRef 컴포넌트를 사용을 통한 컴포넌트 접근성 향상 방법
- Toast 컴포넌트 구현을 통한 컴파운드 패턴 습득

## 개선 사항 및 향후 계획

- 다양한 UI 컴포넌트 추가
- 패키지 최적화
- 다크 모드 추가
