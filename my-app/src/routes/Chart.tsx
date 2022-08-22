import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    close: string;
    high: string;
    low: string;
    open: string;
    volume: string;
    market_cap: number;
    time_open: number;
    time_close: number;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return <div>
        {isLoading ? "Loading chart..." : <ApexChart type="line" series={[
            {
                name: "price",
                data: data?.map((price) => parseFloat(price.close)) ?? []
            },
        ]} options={{
            xaxis: {
                labels: {
                    datetimeFormatter: { month: "mmm 'yy" }
                }
            },
            yaxis: {
                labels: {
                    formatter: (v, index) => `$${v.toFixed(4)}`,
                }
            },
            chart: {
                height: 500,
                width: 500,
            },
            theme: {
                mode: "dark",
            },
            tooltip: {
                x: {

                },
                y: {
                    formatter: (value) => `$${value.toFixed(3)}`,
                }
            }
        }} />}
    </div>;
}

export default Chart;