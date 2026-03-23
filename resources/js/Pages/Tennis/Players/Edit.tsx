import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types/app';
import type { Player, PlayerStatus } from '@/types/tennis';
import { route } from 'ziggy-js';

interface Props extends PageProps {
    player: Player;
}

export default function Edit({ auth, player }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        name: player.name,
        rating: player.rating.toFixed(2),
        status: player.status as PlayerStatus,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tennis.players.update', player.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Player - id: {player.id}
                </h2>
            }
        >
            <Head title="Edit Player" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <form className="max-w-md mx-auto" onSubmit={submit}>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="rating"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Rating:
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    step="0.01"
                                    min="0"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', e.target.value)}
                                />
                                <InputError message={errors.rating} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="status"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Status:
                                </label>
                                <select
                                    id="status"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value as PlayerStatus)
                                    }
                                >
                                    <option value="provisional">Provisional</option>
                                    <option value="ranked">Ranked</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Last Played Date:
                                </label>
                                <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    {player.last_played_date ? player.last_played_date.slice(0, 10) : '—'}
                                </p>
                            </div>


                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Wins: {player.wins}
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Losses: {player.losses}
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Matches Played: {player.matches_played}
                                </label>
                            </div>

                            <div className="flex justify-end items-center space-x-4 mt-6">
                                <Link
                                    href={route('tennis.players.index')}
                                    className="text-sm text-gray-600 hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    className="bg-black text-white py-2 px-4 rounded-md shadow hover:bg-gray-800 transition-all"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
