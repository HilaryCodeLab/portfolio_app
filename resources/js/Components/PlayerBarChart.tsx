import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface PlayerStat {
    id: number;
    name: string;
    wins: number;
    losses: number;
}

interface Props {
    players: PlayerStat[];
}

export default function PlayerBarChart({ players }: Props) {
    const [mode, setMode] = useState<'wins' | 'losses'>('wins');

    const categories = useMemo(
        () => players.map((player) => player.name),
        [players]
    );

    const series = useMemo(
        () => [
            {
                name: mode === 'wins' ? 'Wins' : 'Losses',
                data: players.map((player) =>
                    mode === 'wins' ? player.wins : player.losses
                ),
            },
        ],
        [players, mode]
    );

    const options: ApexOptions = {
        colors: [mode === 'wins' ? '#22c55e' : '#ef4444'],
        chart: {
            type: 'bar',
            height: 260,
            toolbar: {
                show: false,
            },
            fontFamily: 'Figtree, sans-serif',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 3,
            colors: ['transparent'],
        },
        xaxis: {
            categories,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            min: 0,
            title: {
                text: undefined,
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
        },
        grid: {
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val}`,
            },
        },
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 shadow-sm sm:px-6 sm:pt-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Player Results
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Compare players by {mode}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMode('wins')}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                            mode === 'wins'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        Wins
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('losses')}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                            mode === 'losses'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        Losses
                    </button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[650px]">
                    <Chart options={options} series={series} type="bar" height={260} />
                </div>
            </div>
        </div>
    );
}
