import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "./atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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

interface IPrice extends IDate{
	[key : string] : string | number;
}

interface ICoinId{
    id : string | undefined;
	attr : string;
}

const Wrapper = styled.div`
	margin: 0 auto;
	width: 90%;
`;

function Chart({id, attr} : ICoinId){
    //const {coinId} = useOutletContext<ICoin>();
    const {isLoading, data} = useQuery<IDate[]>(["ohlcv", id], () => fetchCoinHistory(id ?? ""),
		{
			refetchInterval: 10000,
		});
	
	const isDark = useRecoilValue(isDarkAtom);

    return (
		<Wrapper>
			{isLoading ? "Loading chart..." : id ?  
			<ApexChart type ="line" series={[
				{
					name: "price",
					data :  data?.map(price => parseFloat((price as IPrice)[attr] as string)) ?? [],	
				}
			]} 
			options={{
				theme: {
					mode: isDark ? "dark" : "light",
				},
				chart : {
					height: '100%',
					width: '500px',
					toolbar: {
						show: false,
					},
					background : "transparent",
					animations : {
						enabled : false,
					}
				},
				grid :{
					show: true,
				},
				stroke : {
					curve: "smooth",
					width: 5,
				},
				yaxis:{
					show: true,
				},
				xaxis:{
					labels :{
						show: true,
					},
					axisTicks :{
						show: true,
					},
					axisBorder : {
						show: true,
					},
					
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
				},
				markers : {
					size: 3,
				}
			}}/>
		: "센서를 선택해"} 
		</Wrapper>
	);
}

export default Chart;