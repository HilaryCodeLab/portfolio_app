import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import type { PageProps } from '@/types/app';
import { formatDate } from '@/utils/date';

interface MatchPlayer {
    id: number;
    name: string;
    pivot: {
        team: number;
    };
}

interface TennisMatch {
    id: number;
    date_played: string;
    match_type: string;
    score: string;
    winning_team: number;
    players: MatchPlayer[];
}

interface Props extends PageProps {
    matches: TennisMatch[];
}

function deleteMatch(matchId: number) {
    if (!window.confirm('Are you sure you want to delete this match?')) {
        return;
    }

    router.delete(route('tennis.matches.destroy', matchId));
}


export default function Index({ auth, matches }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Matches</h2>}
        >
            <Head title="Matches" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link
                        href={route('tennis.matches.create')}
                        className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                        Add Match
                    </Link>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-center border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 border">Date</th>
                                        <th className="px-4 py-3 border">Type</th>
                                        <th className="px-4 py-3 border">Score</th>
                                        <th className="px-4 py-3 border">Players</th>
                                        <th className="px-4 py-3 border">Winner</th>
                                        <th className="px-4 py-3 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matches.map((match) => (
                                        <tr key={match.id}>
                                            <td className="px-4 py-3 border">{formatDate(match.date_played)}</td>
                                            <td className="px-4 py-3 border">{match.match_type}</td>
                                            <td className="px-4 py-3 border">{match.score}</td>
                                            <td className="px-4 py-3 border">
                                                {match.players.map((player) => `${player.name} (Team ${player.pivot.team})`).join(', ')}
                                            </td>
                                            <td className="px-4 py-3 border">Team {match.winning_team}</td>
                                            <td className="px-4 py-3 border border-gray-300">
                                                <div className="flex items-center justify-center gap-4">
                                                    <Link
                                                        href={route('tennis.matches.edit', match.id)}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-red-600 hover:underline"
                                                        onClick={() => deleteMatch(match.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
