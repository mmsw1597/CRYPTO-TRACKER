import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import About from "./screens/About";
import Chart from "./screens/Chart";
import Coin from "./screens/Coin";
import Coins from "./screens/Coins";
import NotFound from "./screens/NotFound";
import Price from "./screens/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
        errorElement: <ErrorComponent />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
