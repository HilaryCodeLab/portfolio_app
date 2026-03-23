import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface SeriesItem {
    name: string;
    data: number[];
}

interface Props {
    categories: string[];
    series: SeriesItem[];
}

export default function PlayerWinsChart({ categories, series }: Props) {
    const options: ApexOptions = {
        chart: {
            type: 'line',
            height: 320,
            toolbar: {
                show: false,
            },
            fontFamily: 'Figtree, sans-serif',
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories,
            title: {
                text: 'Match Date',
            },
        },
        yaxis: {
            min: 0,
            max: 1,
            tickAmount: 1,
            title: {
                text: 'Wins',
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                    Player Wins By Match Date
                </h3>

            </div>

            <Chart options={options} series={series} type="line" height={320} />
        </div>
    );
}
