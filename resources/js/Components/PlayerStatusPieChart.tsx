import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface Props {
    labels: string[];
    series: number[];
}

export default function PlayerStatusPieChart({ labels, series }: Props) {
    const options: ApexOptions = {
        chart: {
            type: 'pie',
            fontFamily: 'Figtree, sans-serif',
        },
        labels,
        colors: ['#f59e0b', '#22c55e', '#6b7280'],
        legend: {
            position: 'bottom',
        },
        dataLabels: {
            enabled: true,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val}`,
            },
        },
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 shadow-sm sm:px-6 sm:pt-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Player Status Distribution
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Total players by status
                </p>
            </div>

            <Chart options={options} series={series} type="pie" height={320} />
        </div>
    );
}
