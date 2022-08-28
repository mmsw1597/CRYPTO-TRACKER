# CRYPTO-TRACKER

React js를 활용한 코인 트래킹

## styled-component

1. React에서 CSS를 좀 더 편하게 등록하기 위한 컴포넌트. 실제 element로 변환될 때, 임의의 클래스 명을 부여한다.
2. 인자 전달은 props를 이용하여 전달한다.

```js
const Box = styled.div`
  background-color : ${(props) => props.bgColor};
`
<Box bhColor = "teal" />
```

3. 컴포넌트 확장

```js
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
`;
const Circle = styled(Box)``;
```

4. as라는 어트리뷰트로 태그 이름을 변경가능하다.
5. 공통 어트리뷰트 부여. 아래 코드에서 Input 컴포넌트는 모두 required와 minlength 속성이 부여된다.

```js
const Input = styled.input.attrs({required: true, minLength: 10})`
`
<Input />
<Input />
<Input />
<Input />
```

6. 애니메이션 적용

```js
const animation = keyframes`
  from{
  }
  to{
  }
`;
```

7. pseudo selector

```js
const Box = styled.div`
  span {
    font-size: 36px;
    &:hover {
    }
  }
`;

<Box>
  <span></span>
</Box>;
```

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

7. TS에서 state 훅을 활용할때 초기값을 줄 경우, 그 초기값에 따라 데이터 타입을 인식한다.
8. state값이 2가지 타입을 갖게 하기위해선 다음과 같이 하자. `const [value, setValue] = useState<number | string>(0)`
9. TS에선 event의 타입에 대해서도 설명이 필요하다.

```ts
const onChange = (event: FormEvent<HTMLInputElement>) => {};
```

event는 Form으로부터 왔으며 onChange 이벤트 리스너가 InputElement에 의해 실행된다는 것을 설명하는 코드다. `SyntheticEvent`

## 요점 (2022-08-21)

1. Fragment란 아무 기능과 의미 없는 유령 태그를 말한다.
2. 다양한 색상을 고를 땐 이 사이트를 이용 `https://flatuicolors.com/`

## 요점 (2022-08-22)

1. React-query는 API fetcher 함수를 만들게 해주어서 코드를 간략하게 구성이 가능하다.
2. React-query는 `useQuery`라는 훅을 지원하는데 fetch를 완료했는지 여부를 담은 `isLoading` 변수와 데이터를 담은 `data` 객체를 제공한다.
3. React-query는 캐싱 매커니즘을 가졌기 때문에 한번 데이터를 가져오면 API를 다시 불러올 필요가 없다.
4. 캐시 데이터를 보려면 `ReactQueryDevtools`를 사용하면 된다.
5. 데이터를 차트로 시각화하는 JS char library인 `APEXCHARTS.JS`

## 요점 (2022-08-28)

- Link 컴포넌트를 활용하여 다른 웹페이지에 state전달
- 매우 많은 프로퍼티를 가지고 있는 객체에 대하여 빠르게 type을 정의하는 방법
- useLocation은 v6부터 as를 사용해야함.

1. state type 정의하기

```ts
interface LocationTsx {
  state: {
    name: string;
    id: string;
    rank: number;
  };
}

function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationTsx;
  console.log(state.name);
}
```

URL로 부터 state를 받아올때는 `as`를 사용하여 state의 타입을 정의해주자.

2. `Link`로 state 전달하기

```ts
<Link to={`/${coin.id}`} state={coin}>
  <Img
    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
  />
  {coin.name} &rarr;
</Link>
```

이 방식의 문제점은 만약 유저가 다이렉트로 Link의 url에 접속하면 state를 전달해줄 이전 사이트를 거치지 않기 때문에 state가 출력되지 않는다.

3. 옵셔널 체이닝
