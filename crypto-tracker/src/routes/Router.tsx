import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";


function Router(){
    return <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Coins />} >
                <Route path = "/:coinId" element = {<Coins/>}>
                </Route>               
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router;