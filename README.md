# CRYPTO-TRACKER

React js를 활용한 코인 트래킹

## Type-Script

1. JS의 strongly-typed 버전. 개발자로부터 코드 실행 이전에 에러를 발생시키거나 미리 알려주고 실수를 줄여주게끔 도와준다. 또한 자동 완성 기능이 강화된다.
2. 변수나 함수 매개변수를 설정할때 데이터 타입을 명시해야만 한다.

```ts
const plus = (a: number, b: number) => a + b;
```

3. 자바스크립트로 만들어진 라이브러리를 타입스크립트 환경에서 사용하려면 @types라고 불리는 type definition을 정의해야 한다.
4. react와 ts를 병합하기 -> `npx create-react-app (app-name) --template typescript`
5. ts와 styled-component 병합하기 -> `npm i --save-dev @types/styled-components`
6. interface란 객체의 모양을 TS에게 설명해주는 TS 문법.

```ts
interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>``;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {}
```

## 요점 (2022-08-21)

1. Fragment란 아무 기능과 의미 없는 유령 태그를 말한다.
2. 다양한 색상을 고를 땐 이 사이트를 이용 `https://flatuicolors.com/`

## 요점 (2022-08-22)

1. React-query는 API fetcher 함수를 만들게 해주어서 코드를 간략하게 구성이 가능하다.
2. React-query는 `useQuery`라는 훅을 지원하는데 fetch를 완료했는지 여부를 담은 `isLoading` 변수와 데이터를 담은 `data` 객체를 제공한다.
3. React-query는 캐싱 매커니즘을 가졌기 때문에 한번 데이터를 가져오면 API를 다시 불러올 필요가 없다.
4. 캐시 데이터를 보려면 `ReactQueryDevtools`를 사용하면 된다.
5. 데이터를 차트로 시각화하는 JS char library인 `APEXCHARTS.JS`
