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

## 요점 (2022-08-29)

- v6에서 중첩 라우팅 구현.
- useMatch 훅에 대하여
- react query 사용법.

1. 중첩 라우팅

```ts
<Route path="/:coinId" element={<Coin />}>
  <Route path="price" element={<Price />} />
  <Route path="Chart" element={<Chart />} />
</Route>
```

이렇게 하고 Coin 컴포넌트내에 자식 컴포넌트가 위치할 곳에 Outlet 컴포넌트를 작성하면 된다.

2. useMatch

```ts
const priceMatch = useMatch("/:coinId/price");
```

기본적으로 객체를 반환하는데, 특정 URL에 사용자가 접속해있으면 객체를 반환, 아니면 null을 반환. v6부터 useMatch 훅을 사용해야함.

3. react query </br>
   `npm i @tanstack/react-query` 해당 명령어로 설치 후, index.tsx에서 QueryClientProvider로 App 컴포넌트를 감싼다.

```ts
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

4. useQuery 훅

```ts
const { isLoading, data } = useQuery(["allCoins"], fetchCoins);
```

fetchCoins 함수는 별도로 만들어야함. 해당 함수는 프로미스를 반환. 그리고 객체를 반환하는데 `isLoading` 프로퍼티와 `data` 프로퍼티를 보유. 첫번째 인자는 고유한 key값이고 배열로 전달.
배열로 전달하기 때문에 고유한 값 전달에 용이하다.

5. 캐시데이터 직접 보기
   `npm i @tanstack/react-query-devtools` 설치 -> App.tsx에 `import { ReactQueryDevtools } from "@tanstack/react-query-devtools";` -> Router 컴포넌트 밑에 devtools 컴포넌트 추가.

6. url 파라미터 받기 `const { coinId } = useParams<keyof RouteParams>() as RouteParams;`

## 요점 (2022-08-30)

- V6 nested router에서 부모 컴포넌트가 자식에게 prop 전달하기.
- Apex Chart
- 주기적으로 리패치하기.
- react-helmet

1. 부모 컴포넌트에서 자식 컴포넌트로 프로퍼티 보내기</br>
   부모 컴포넌트의 Outlet에 다음과 같이 coinId를 보내고 `<Outlet context={{coinId}}/>` -> 자식 컴포넌트에서 프로퍼티를 받는다.` const {coinId} = useOutletContext<ICoin>();`
   주의할 점은 객체 타입으로 반환하기 때문에, 구조 분해 할당으로 받아야 하고, 인터페이스를 작성해야한다.

2. Apex Chart에 들어간 후, 명령어 입력. 이후 import하고 ApexChart 컴포넌트를 원하는 위치에 삽입.

3. 주기적으로 refetch하기 위해선 다음과 같이 입력

```ts
const { isLoading: tickersLoading, data: tickersData } =
  useQuery<PriceInterface>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
```

4. react-helmet을 이용하여 문서의 head 영역을 수정할 수 있다. title이나 favicon 등 수정가능.

```ts
<Helmet>
  <title>Coins</title>
</Helmet>
```

## 요점 (2022-08-31)

- dark/light 모드 구현
- function을 prop으로 전달하기.
- v6 라우팅 버전에서 prop 전달하기
- Recoil 적용

1. prop으로 전달하려는 function에 마우스를 올리면 그 함수의 타입을 보여준다.

```ts
interface IRouteProps {
  toggleDark: () => void;
}

function Router({ toggleDark }: IRouteProps) {}
```

2. 라우터에서 prop 전달하기

```ts
<Route path="/" element={<Coins toggleDark={toggleDark} />} />
```

3. recoil `npm install recoil` 명령어로 설치 후 index.tsx에서 다음과 같이 작성

```ts
<RecoilRoot>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</RecoilRoot>
```

이후 atom을 모아둔 파일을 따로 작성하여 저장한다.

```ts
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
```

key는 고유한 값, default는 기본 값. 이후 App.tsx에서 useRecoilValue 훅으로 atom을 받아온다.

```ts
const isDark = useRecoilValue(isDarkAtom);
```

atom의 값을 변경시키려면 다음 훅을 사용

```ts
const setDarkAtom = useSetRecoilState(isDarkAtom);
const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
```

기본적으로 useState의 set함수와 같은 함수를 반환함. 반환된 set함수는 useState set함수와 사용방법이 동일.
