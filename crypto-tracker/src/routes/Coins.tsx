import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import Preview from "../components/Preview";
import Chart from "./Chart";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 1460px;
    margin: 0 auto;
		width:100%;
		height: 200vh;
`;

const Header = styled.header`
    font-size: 40px;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CoinsList = styled.ul`
    display:grid;
    grid-template-columns : repeat(4, 1fr);
    gap: 10px;
		height: 400px;
		overflow: scroll;
		overflow-x:hidden;
		padding-right: 10px;
		width:100%;

		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			border-radius: 6px;
			background: rgba(255, 255, 255, 0.4);
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.3);
			border-radius: 6px;
		}
`;

const Coin = styled.li<{match: boolean}>`
    background-color: white;
    color: ${props=> props.match ? props.theme.accentColor : props.theme.textColor};
    font-weight: 600;
    margin-bottom: 10px;
    border-radius: 10px;
    
        display:flex;
        align-items: center;
        padding: 20px;
  
    &:hover{    
       color: ${(props) => props.theme.accentColor};
    }
		cursor: pointer;
		height:100%;
`;

const Title = styled.h1`
    color: ${props=>props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display:block;
`;

const Wrapper= styled.div`
		display:flex;
		align-items:flex-start;
		width:100%;
`

const ChartWrapper= styled.div`
		display:flex;
		flex-direction:column;
		width:100%;
`

interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const Attrs = styled.ul`
	display: grid;
	grid-template-columns : repeat(4, 1fr);
	width:100%;
	margin-top : 10px;
	margin:30px auto;	
`;

const Attr = styled.button<{isSelected : boolean}>`
	display: flex;
	justify-content: center;
	border:none;
	align-items:center;
	background-color: #ffa801;
	height: 100px;
	cursor: pointer;
	font-size: 33px;
	padding:20px;
	color: ${props => props.isSelected? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)"};
	margin:2px;
`;

const Text = styled.span`
	margin-left : 10px;
`



function Coins() {
    const {isLoading, data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
		const [attr,setAttr] = useState("close");
    const setDarkAtom = useSetRecoilState(isDarkAtom);
		const navigate = useNavigate();
		const coinMatch: PathMatch<string> | null = useMatch("/:id");
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);

		const onCoinClicked = (coinId : string) => {
				navigate(`/${coinId}`);
		}

		const onClickChartAttr = (attr : string) => {
			setAttr(attr);
		}

    return (
    <Container>
        <Helmet>
          <title>Coins</title>
        </Helmet>
        <Header>
            <Title>Coins</Title>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </Header>
        {isLoading ? (<Loader>Loading...</Loader>) :(
					<Wrapper>
						<Preview id = {coinMatch ? coinMatch.params.id : undefined}/>
						<CoinsList>
							{data?.slice(0,50).map(coin => 
							<Coin
							 match = {coinMatch?.params.id === coin.id ? true : false}
							 key ={coin.id}
							 onClick = {() => onCoinClicked(coin.id)}
							>
									<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
									{coin.name} &rarr;							      
							</Coin>
							)}
						</CoinsList>
					</Wrapper>
				 )}
				 <ChartWrapper>
						<Attrs>
							<Attr isSelected = {attr === "close"} onClick = {() => {onClickChartAttr("close")}}>
								<span>
									<FontAwesomeIcon icon="cloud-rain" size ="1x" /><Text>close</Text>
								</span>
							</Attr>
							<Attr isSelected = {attr === "high"} onClick = {() => {onClickChartAttr("high")}}>
								<span>
									<FontAwesomeIcon icon="thunderstorm" size ="1x" /><Text>high</Text>
								</span>
							</Attr>
							<Attr isSelected = {attr === "low"} onClick = {() => {onClickChartAttr("low")}}>
								<span>
									<FontAwesomeIcon icon="snowflake" size ="1x" /><Text>low</Text>
								</span>
							</Attr>
							<Attr isSelected = {attr === "volume"} onClick = {() => {onClickChartAttr("volume")}}>
								<span>
									<FontAwesomeIcon icon="wind" size ="1x" /><Text>volume</Text>
								</span>
							</Attr>
						</Attrs>
						<Chart id = {coinMatch ? coinMatch.params.id : undefined} attr = {attr}/>
				 </ChartWrapper>

    </Container>
    );
}

export default Coins;