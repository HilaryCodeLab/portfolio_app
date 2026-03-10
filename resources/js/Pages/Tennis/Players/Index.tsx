import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

import { Head, Link } from '@inertiajs/react';

import type { Player } from '@/types/tennis';
import type { PageProps } from '@/types/app';
import { STATUS_LABELS } from '@/types/tennis';
import {route} from 'ziggy-js';

interface Props extends PageProps {
    players: Player[];
}

export default function PlayersIndex({ auth, players }: Props) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tennis Players" />
            <Link
                href={route('tennis.players.create')}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add Player
            </Link>

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Tennis Players
                </h1>

                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Last Played</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>

                                <td>
                                    {player.rating.toFixed(2)}
                                </td>

                                <td>
                                    {STATUS_LABELS[player.status]}
                                </td>

                                <td>
                                    {player.last_played_date ?? '—'}

                                    {player.last_played_date_overridden && (
                                        <span className="ml-2 text-xs text-yellow-600">
                                            manual
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
