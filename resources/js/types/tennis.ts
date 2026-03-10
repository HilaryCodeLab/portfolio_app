// Player status options
export type PlayerStatus =
    | 'provisional'
    | 'ranked'
    | 'inactive';

export type Rating = number;

// Core Player domain model
export interface Player {
    id: number;
    name: string;

    rating: Rating;

    matches_played: number;
    wins: number;
    losses: number;

    last_played_date: string | null;
    last_played_date_overridden: boolean;

    status: PlayerStatus;

    created_at: string;
    updated_at: string;
}

export const STATUS_LABELS: Record<PlayerStatus, string> = {
    provisional: 'Provisional',
    ranked: 'Ranked',
    inactive: 'Inactive',
};

export interface Match {
    id: number;

    player_one_id: number;
    player_two_id: number;

    played_at: string;

    created_at: string;
    updated_at: string;
}

export type MatchType = 'single' | 'double';

export interface MatchPlayerInput {
    player_id: number;
    team: 1 | 2;
}

export interface CreateMatchForm {
    type: MatchType;
    played_at: string;
    players: MatchPlayerInput[];
}

