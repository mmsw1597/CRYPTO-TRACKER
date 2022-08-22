# CRYPTO-TRACKER
React js를 활용한 코인 트래킹

## 요점 (2022-08-21)
1. Fragment란 아무 기능과 의미 없는 유령 태그를 말한다.
2. 다양한 색상을 고를 땐 이 사이트를 이용 `https://flatuicolors.com/`

## 요점 (2022-08-22)
1. React-query는 API fetcher 함수를 만들게 해주어서 코드를 간략하게 구성이 가능하다.
2. React-query는 `useQuery`라는 훅을 지원하는데 fetch를 완료했는지 여부를 담은 `isLoading` 변수와 데이터를 담은 `data` 객체를 제공한다.
3. React-query는 캐싱 매커니즘을 가졌기 때문에 한번 데이터를 가져오면 API를 다시 불러올 필요가 없다.
4. 캐시 데이터를 보려면 `ReactQueryDevtools`를 사용하면 된다.
5. 데이터를 차트로 시각화하는 JS char library인 `APEXCHARTS.JS`