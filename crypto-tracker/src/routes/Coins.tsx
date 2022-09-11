import { useQuery } from "@tanstack/react-query";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import Preview from "../components/Preview";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 1460px;
    margin: 0 auto;
		width:100%;
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
    grid-template-columns : repeat(4, 4fr);
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

const Box = styled.div`
	background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
	width:100px;
	height:100px;
`

function Coins() {
    const {isLoading, data} = useQuery<CoinInterface[]>(["allCoins"], fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
		const navigate = useNavigate();
		const coinMatch: PathMatch<string> | null = useMatch("/:id");
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);

		const onCoinClicked = (coinId : string) => {
				navigate(`/${coinId}`);
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
				 <Box/>
    </Container>
    );
}

export default Coins;