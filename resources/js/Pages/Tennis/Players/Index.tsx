import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

import type { PageProps } from '@/types/app';
import type { Player } from '@/types/tennis';
import { STATUS_LABELS } from '@/types/tennis';
import { formatDate } from '@/utils/date';

interface PaginatedPlayers {
    data: Player[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props extends PageProps {
    players: PaginatedPlayers;
}

function deletePlayer(playerId: number) {
    if (!window.confirm('Are you sure you want to delete this player?')) {
        return;
    }

    router.delete(route('tennis.players.destroy', playerId));
}

export default function PlayersIndex({ auth, players }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tennis Players
                </h2>
            }
        >
            <Head title="Tennis Players" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link
                        href={route('tennis.players.create')}
                        className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                    >
                        Add Player
                    </Link>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Mobile: one card per player (below md). The table
                                doesn't fit a phone's width, so stack the fields. */}
                            <div className="space-y-4 md:hidden">
                                {players.data.map((player) => (
                                    <div
                                        key={player.id}
                                        className="rounded-lg border border-gray-300 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-lg font-semibold text-gray-900">
                                                {player.name}
                                            </span>
                                            <span className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                                                {player.rating.toFixed(2)}
                                            </span>
                                        </div>

                                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Wins</dt>
                                                <dd className="font-medium text-gray-900">
                                                    {player.wins}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Losses</dt>
                                                <dd className="font-medium text-gray-900">
                                                    {player.losses}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Status</dt>
                                                <dd className="font-medium text-gray-900">
                                                    {STATUS_LABELS[player.status]}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Last Played</dt>
                                                <dd className="font-medium text-gray-900">
                                                    {formatDate(player.last_played_date)}
                                                    {player.last_played_date_overridden && (
                                                        <span className="ml-1 text-xs font-medium text-yellow-600">
                                                            manual
                                                        </span>
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3">
                                            <Link
                                                href={route('tennis.players.edit', player.id)}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => deletePlayer(player.id)}
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
                                            <th className="px-4 py-3 border border-gray-300">Name</th>
                                            <th className="px-4 py-3 border border-gray-300">Rating</th>
                                            <th className="px-4 py-3 border border-gray-300">Wins</th>
                                            <th className="px-4 py-3 border border-gray-300">Losses</th>
                                            <th className="px-4 py-3 border border-gray-300">Status</th>
                                            <th className="px-4 py-3 border border-gray-300">Last Played</th>
                                            <th className="px-4 py-3 border border-gray-300">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {players.data.map((player) => (
                                            <tr key={player.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 border border-gray-300">
                                                    {player.name}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    {player.rating.toFixed(2)}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    {player.wins}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    {player.losses}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    {STATUS_LABELS[player.status]}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    {formatDate(player.last_played_date)}
                                                    {player.last_played_date_overridden && (
                                                        <span className="ml-2 text-xs font-medium text-yellow-600">
                                                            manual
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-center gap-4">
                                                        <Link
                                                            href={route('tennis.players.edit', player.id)}
                                                            className="font-medium text-blue-600 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => deletePlayer(player.id)}
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

                            {players.data.length === 0 && (
                                <p className="mt-4 text-center text-gray-500">
                                    No players found.
                                </p>
                            )}

                            <div className="flex items-center justify-center space-x-2 p-4">
                                <button
                                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200"
                                    onClick={() =>
                                        players.prev_page_url &&
                                        router.visit(players.prev_page_url)
                                    }
                                    disabled={!players.prev_page_url}
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {players.current_page} of {players.last_page}
                                </span>

                                <button
                                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200"
                                    onClick={() =>
                                        players.next_page_url &&
                                        router.visit(players.next_page_url)
                                    }
                                    disabled={!players.next_page_url}
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
