import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlayerWinsChart from '@/Components/PlayerWinsChart';
import PlayerBarChart from '@/Components/PlayerBarChart';
import PlayerStatusPieChart from '@/Components/PlayerStatusPieChart';
import { Head } from '@inertiajs/react';

interface SeriesItem {
    name: string;
    data: number[];
}

interface PlayerStat {
    id: number;
    name: string;
    wins: number;
    losses: number;
}

interface StatusCounts {
    labels: string[];
    series: number[];
}


interface Props {
    auth: any;
    playerWinsChart: {
        categories: string[];
        series: SeriesItem[];
    };
    players: PlayerStat[];
    statusCounts: StatusCounts;
}

export default function Statistics({ auth, playerWinsChart, players, statusCounts }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Player Statistics
                </h2>
            }
        >
            <Head title="Player Statistics" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <PlayerWinsChart
                        categories={playerWinsChart.categories}
                        series={playerWinsChart.series}
                    />
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <PlayerBarChart players={players} />
                        <PlayerStatusPieChart
                            labels={statusCounts.labels}
                            series={statusCounts.series}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
