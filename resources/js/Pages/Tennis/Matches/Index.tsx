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
    score: string | null;
    winning_team: number;
    players: MatchPlayer[];
}

interface PaginatedMatches {
    data: TennisMatch[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props extends PageProps {
    matches: PaginatedMatches;
}

export default function Index({ auth, matches }: Props) {
    function deleteMatch(matchId: number) {
        if (!window.confirm('Are you sure you want to delete this match?')) {
            return;
        }

        router.delete(route('tennis.matches.destroy', matchId));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Matches
                </h2>
            }
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
                            {/* Mobile: one card per match (below md). The table
                                doesn't fit a phone's width, so stack the fields. */}
                            <div className="space-y-4 md:hidden">
                                {matches.data.map((match) => (
                                    <div
                                        key={match.id}
                                        className="rounded-lg border border-gray-300 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-lg font-semibold text-gray-900">
                                                {formatDate(match.date_played)}
                                            </span>
                                            <span className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                                                {match.match_type}
                                            </span>
                                        </div>

                                        <dl className="mt-3 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Score</dt>
                                                <dd className="font-medium text-gray-900">
                                                    {match.score ?? '—'}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Winner</dt>
                                                <dd className="font-medium text-gray-900">
                                                    Team {match.winning_team}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-500">Players</dt>
                                                <dd className="mt-1 space-y-0.5 font-medium text-gray-900">
                                                    {match.players.map((player) => (
                                                        <div key={player.id}>
                                                            {player.name}{' '}
                                                            <span className="text-gray-500">
                                                                (Team {player.pivot.team})
                                                            </span>
                                                        </div>
                                                    ))}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3">
                                            <Link
                                                href={route('tennis.matches.edit', match.id)}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => deleteMatch(match.id)}
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop: the full table (md and up). overflow-x-auto
                                keeps it from breaking the layout on mid widths. */}
                            <div className="hidden overflow-x-auto md:block">
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
                                        {matches.data.map((match) => (
                                            <tr key={match.id}>
                                                <td className="px-4 py-3 border">
                                                    {formatDate(match.date_played)}
                                                </td>
                                                <td className="px-4 py-3 border">
                                                    {match.match_type}
                                                </td>
                                                <td className="px-4 py-3 border">
                                                    {match.score ?? '—'}
                                                </td>
                                                <td className="px-4 py-3 border">
                                                    {match.players
                                                        .map(
                                                            (player) =>
                                                                `${player.name} (Team ${player.pivot.team})`
                                                        )
                                                        .join(', ')}
                                                </td>
                                                <td className="px-4 py-3 border">
                                                    Team {match.winning_team}
                                                </td>
                                                <td className="px-4 py-3 border">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link
                                                            href={route('tennis.matches.edit', match.id)}
                                                            className="font-medium text-blue-600 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteMatch(match.id)}
                                                            className="font-medium text-red-600 hover:underline"
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

                            <div className="flex items-center justify-center space-x-2 p-4">
                                <button
                                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200"
                                    onClick={() => matches.prev_page_url && router.visit(matches.prev_page_url)}
                                    disabled={!matches.prev_page_url}
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {matches.current_page} of {matches.last_page}
                                </span>

                                <button
                                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200"
                                    onClick={() => matches.next_page_url && router.visit(matches.next_page_url)}
                                    disabled={!matches.next_page_url}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
