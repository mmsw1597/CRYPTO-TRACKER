import { useParams } from "react-router-dom";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../routes/api";

const Container = styled.div`
    width: 300px;
    height: 405px;
    border-radius: 10px;
    margin-right: 10px;
    background-color : white;
`;

interface ICoinId{
    id : string | undefined;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    text-align : center;
    font-size:22px;
    padding: 18px;
		font-weight: 600;
`

const Items = styled.ul`
    width:100%;
    padding: 0 20px;
`

const Item = styled.li`
    display:flex;
    justify-content: space-between;
    align-items: center;
    div{
        display:flex;
        align-items: center;
        margin-bottom: 5px;
    }
		margin-bottom: 10px;
`;

const Dot = styled.div<{dotColor : string}>`
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background-color: ${(props) => props.dotColor};
    margin-right: 5px;
`

const ItemDes = styled.span`
    font-weight:600;
		display:flex;
		align-items:center;
`

const CoinPercentage = styled.span<{isPositive: boolean}>`
	font-weight:600;
    color : ${(props) => props.isPositive ? "#00b894" : "#d63031"}
`

const Price = styled.span`
		color: gold;
		font-weight:600;
`;

const Rank = styled.span`
		color: blue;
		font-weight:600;
`


interface PriceInterface{
    id: string;
    name:     string;
    symbol:     string;
    rank:     number;
    circulating_supply:     number;
    total_supply:     number;
    max_supply:     number;
    beta_value:     number;
    first_data_at:     string;
    last_updated:     string;
    quotes: {
        USD :{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}


function Preview({id} : ICoinId) {
    const {isLoading , data} = useQuery<PriceInterface>(["tickers", id], () => fetchCoinTickers(id ?? ""));

    console.log(data);

    return (
        <Container>
            {id ? 
             <Wrapper>
                <Title>{id}</Title>
                <ApexChart 
                type = 'radialBar'
                series= {[75]}
                options = {{
                    chart:{
                        type: "radialBar",
                    },
                    series : [67],
                    colors : ["#20E647"],
                    plotOptions :{
                        radialBar:{
                            hollow:{
                                margin: 0,
                                size: "70%",
                                background : "#293450",
                            },
                            track:{
                                dropShadow:{
                                    enabled : true,
                                    top: 2,
                                    left: 0,
                                    blur: 4,
                                    opacity : 0.15,
                                }
                            },
                            dataLabels:{
                                name:{
                                    offsetY: -10,
                                    color: "#fff",
                                    fontSize: "13px",
                                },
                                value : {
                                    color: "#fff",
                                    fontSize: "30px",
                                    show: true,
                                }
                            }
                        }
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                          shade: "dark",
                          type: "vertical",
                          gradientToColors: ["#87D4F9"],
                          stops: [0, 100]
                        }
                    },
                    stroke: {
                        lineCap: "round"
                    },
                    labels: ["Progress"]
                }
            }
                />
                <Items>
                    <Item>
                        <ItemDes>
                        	<Dot dotColor="green"/>
                        	Percentage 
                        </ItemDes> 
                        <CoinPercentage 
                        isPositive = {(data?.quotes.USD.percent_change_15m ?? 0) > 0 ? true : false }>
                            {data?.quotes.USD.percent_change_15m}%
                        </CoinPercentage>
                    </Item>
										<Item>
                        <ItemDes>
                        	<Dot dotColor="orange"/>
                        	Price 
                        </ItemDes> 
                        <Price>
                            {data?.quotes.USD.price.toFixed(2)}$
                        </Price>
                    </Item>
										<Item>
                        <ItemDes>
                        	<Dot dotColor = "tomato"/>
                        	Rank 
                        </ItemDes> 
                        <Rank>
                            {data?.rank}
                        </Rank>
                    </Item>
                </Items> 
            </Wrapper>
            : "코인을 선택하라.." }
        </Container>
    );
}

export default Preview;