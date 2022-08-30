import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface IDate{
    time_open: number;
    time_close: number;
    openddd: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ICoin{
    coinId: string;
}

function Chart(){
    const {coinId} = useOutletContext<ICoin>();
    const {isLoading, data} = useQuery<IDate[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		});

    return (
		<div>
			{isLoading ? "Loading chart..." : <ApexChart type ="line" series={[
				{
					name: "price",
					data : data?.map(price => parseFloat(price.close)) ?? [],
				}
			]} 
			options={{
				theme: {
					mode: "dark",
				},
				chart : {
					height: 500,
					width: 500,
					toolbar: {
						show: false,
					},
					background : "transparent",
				},
				grid :{
					show: false,
				},
				stroke : {
					curve: "smooth",
					width: 5,
				},
				yaxis:{
					show: false,
				},
				xaxis:{
					labels :{
						show: false,
					},
					axisTicks :{
						show: false,
					},
					axisBorder : {
						show: false,
					},
					type:"datetime",
					categories: data?.map(price => {
						const date = new Date(price.time_close*1000);
						return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
					}),
				},
				fill:{
					type: "gradient",
					gradient : {gradientToColors : ["#0be881", ], stops : [0, 100],},
				},
				colors : ["#4bcffa"],
				tooltip : {
					y:{
						formatter : (value) => `$ ${value.toFixed(3)}`,
					},
					x:{

					},
				}
			}}/>
		}
	</div>
	);
}

export default Chart;