import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import type { PageProps } from '@/types/app';
import { formatDate } from '@/utils/date';

interface ScoringPlayer {
    id: number;
    name: string;
    rating: number;
    pivot: {
        team: number;
    };
}

interface ScoringMatch {
    id: number;
    date_played: string;
    location: string | null;
    match_type: string;
    score: string | null;
    winning_team: number;
    players: ScoringPlayer[];
}

interface PaginatedMatches {
    data: ScoringMatch[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props extends PageProps {
    matches: PaginatedMatches;
}

interface GameScore {
    team1: number;
    team2: number;
}

// Turn a stored score string like "6-4, 6-2" into per-game numbers.
// The left number is Team 1's, the right number is Team 2's.
function parseGameScores(score: string | null): GameScore[] {
    if (!score) return [];

    return score
        .split(',')
        .map((game) => {
            const [team1, team2] = game.trim().split('-').map(Number);
            return { team1, team2 };
        })
        .filter((g) => !Number.isNaN(g.team1) && !Number.isNaN(g.team2));
}

// Small pill used to show a single game's score for one side.
function ScoreChip({ value }: { value: number }) {
    return (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-sm font-semibold text-gray-800">
            {value}
        </span>
    );
}

interface TeamSideProps {
    heading: string;
    players: ScoringPlayer[];
    scores: number[];
    isWinner: boolean;
}

// One side of a match — works for a single player (singles) or a pair (doubles).
function TeamSide({ heading, players, scores, isWinner }: TeamSideProps) {
    return (
        <div
            className={`rounded-xl border p-4 ${isWinner
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
        >
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {heading}
                </span>
                {isWinner && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
                        Winner
                    </span>
                )}
            </div>

            <ul className="space-y-1">
                {players.map((player) => (
                    <li
                        key={player.id}
                        className="flex items-center justify-between"
                    >
                        <span className="font-medium text-gray-800">
                            {player.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            Rank {player.rating}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Scores
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {scores.length > 0 ? (
                        scores.map((value, index) => (
                            <ScoreChip key={index} value={value} />
                        ))
                    ) : (
                        <span className="text-sm text-gray-400">—</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Scoring({ auth, matches }: Props) {
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Scoring
                </h2>
            }
        >
            <Head title="Scoring" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link
                        href={route('tennis.matches.create')}
                        className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                        Add Match
                    </Link>
                    {matches.data.length === 0 && (
                        <p className="text-center text-gray-500">
                            No matches to score yet.
                        </p>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        {matches.data.map((match) => {
                            const games = parseGameScores(match.score);
                            const team1Players = match.players.filter(
                                (p) => p.pivot.team === 1
                            );
                            const team2Players = match.players.filter(
                                (p) => p.pivot.team === 2
                            );
                            const team1Scores = games.map((g) => g.team1);
                            const team2Scores = games.map((g) => g.team2);
                            const isSingles = match.match_type === 'singles';

                            return (
                                <Card
                                    key={match.id}
                                    header={
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    Match #{match.id}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {formatDate(
                                                        match.date_played
                                                    )}
                                                </p>
                                                {match.location && (
                                                    <p className="mt-0.5 text-sm text-gray-500">
                                                        {match.location}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-medium capitalize text-white">
                                                {match.match_type}
                                            </span>
                                        </div>
                                    }
                                    footer={
                                        <div className="flex items-center justify-end gap-4">
                                            <Link
                                                href={route(
                                                    'tennis.matches.edit',
                                                    match.id
                                                )}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteMatch(match.id)
                                                }
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    }
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <TeamSide
                                            heading={
                                                isSingles
                                                    ? 'Player 1'
                                                    : 'Team 1'
                                            }
                                            players={team1Players}
                                            scores={team1Scores}
                                            isWinner={match.winning_team === 1}
                                        />
                                        <TeamSide
                                            heading={
                                                isSingles
                                                    ? 'Player 2'
                                                    : 'Team 2'
                                            }
                                            players={team2Players}
                                            scores={team2Scores}
                                            isWinner={match.winning_team === 2}
                                        />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {matches.data.length > 0 && (
                        <div className="flex items-center justify-center space-x-2 p-4">
                            <button
                                className="rounded-lg bg-black px-3 py-1 text-white transition duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
                                onClick={() =>
                                    matches.prev_page_url &&
                                    router.visit(matches.prev_page_url)
                                }
                                disabled={!matches.prev_page_url}
                            >
                                Previous
                            </button>

                            <span>
                                Page {matches.current_page} of{' '}
                                {matches.last_page}
                            </span>

                            <button
                                className="rounded-lg bg-black px-3 py-1 text-white transition duration-200 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
                                onClick={() =>
                                    matches.next_page_url &&
                                    router.visit(matches.next_page_url)
                                }
                                disabled={!matches.next_page_url}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
