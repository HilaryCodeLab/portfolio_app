import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import type { PageProps } from '@/types/app';

interface PlayerOption {
    id: number;
    name: string;
}

interface MatchPlayerInput {
    id: string;
    team: '1' | '2';
}

interface Props extends PageProps {
    players: PlayerOption[];
}

export default function Create({ auth, players }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        date_played: '',
        location: '',
        match_type: 'singles',
        score: '',
        winning_team: '1',
        players: [
            { id: '', team: '1' },
            { id: '', team: '2' },
        ] as MatchPlayerInput[],
    });

    function handleMatchTypeChange(value: 'singles' | 'doubles') {
        setData(
            'players',
            value === 'singles'
                ? [
                      { id: '', team: '1' },
                      { id: '', team: '2' },
                  ]
                : [
                      { id: '', team: '1' },
                      { id: '', team: '1' },
                      { id: '', team: '2' },
                      { id: '', team: '2' },
                  ]
        );

        setData('match_type', value);
    }

    function updatePlayer(index: number, field: 'id' | 'team', value: string) {
        const updated = [...data.players];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setData('players', updated);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('tennis.matches.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Match
                </h2>
            }
        >
            <Head title="Create Match" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <form className="max-w-md mx-auto" onSubmit={submit}>
                            <div className="mb-5">
                                <label htmlFor="date_played" className="block mb-2 text-sm font-medium text-gray-900">
                                    Date Played:
                                </label>
                                <input
                                    id="date_played"
                                    type="date"
                                    value={data.date_played}
                                    onChange={(e) => setData('date_played', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                />
                                <InputError message={errors.date_played} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                                    Location:
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="e.g. Central Park Courts"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="match_type" className="block mb-2 text-sm font-medium text-gray-900">
                                    Match Type:
                                </label>
                                <select
                                    id="match_type"
                                    value={data.match_type}
                                    onChange={(e) => handleMatchTypeChange(e.target.value as 'singles' | 'doubles')}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                >
                                    <option value="singles">Singles</option>
                                    <option value="doubles">Doubles</option>
                                </select>
                                <InputError message={errors.match_type} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="score" className="block mb-2 text-sm font-medium text-gray-900">
                                    Score:
                                </label>
                                <input
                                    id="score"
                                    type="text"
                                    placeholder="e.g. 6-4"
                                    value={data.score}
                                    onChange={(e) => setData('score', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                />
                                <InputError message={errors.score} className="mt-2" />
                            </div>

                            {data.players.map((player, index) => (
                                <div key={index} className="mb-5 border rounded-lg p-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Player {index + 1}
                                    </label>
                                    <select
                                        value={player.id}
                                        onChange={(e) => updatePlayer(index, 'id', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-3"
                                    >
                                        <option value="">Select Player</option>
                                        {players.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={player.team}
                                        onChange={(e) => updatePlayer(index, 'team', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    >
                                        <option value="1">Team 1</option>
                                        <option value="2">Team 2</option>
                                    </select>
                                </div>
                            ))}

                            <InputError message={errors.players} className="mt-2" />

                            <div className="mb-5">
                                <label htmlFor="winning_team" className="block mb-2 text-sm font-medium text-gray-900">
                                    Winning Team:
                                </label>
                                <select
                                    id="winning_team"
                                    value={data.winning_team}
                                    onChange={(e) => setData('winning_team', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                >
                                    <option value="1">Team 1</option>
                                    <option value="2">Team 2</option>
                                </select>
                                <InputError message={errors.winning_team} className="mt-2" />
                            </div>

                            <div className="flex justify-end items-center space-x-4 mt-6">
                                <Link
                                    href={route('tennis.matches.index')}
                                    className="text-sm text-gray-600 hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
