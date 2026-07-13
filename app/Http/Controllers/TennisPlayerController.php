<?php

namespace App\Http\Controllers;
use App\Models\TennisMatch;
use App\Models\TennisPlayer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;


class TennisPlayerController extends Controller
{
    public function statistics()
    {
        // Load all matches with their participating players in date order
        // so the line chart can plot results across time.
        $matches = TennisMatch::with('players')
            ->orderBy('date_played')
            ->get();

        // Load players with their related matches so we can derive
        // total wins/losses for the bar chart.
        $players = TennisPlayer::with('matches')
            ->orderBy('name')
            ->get();

        // Build the x-axis labels for the line chart from match dates.
        $categories = $matches
            ->pluck('date_played')
            ->map(fn($date) => $date ? $date->format('d-m-Y') : null)
            ->toArray();

        // Build line-chart series:
        // for each player, mark 1 when they won on that match date, otherwise 0.
        $lineSeries = $players->map(function ($player) use ($matches) {
            $data = [];

            foreach ($matches as $match) {
                $playerInMatch = $match->players->firstWhere('id', $player->id);

                // If the player did not participate in this match, record 0 for this date.
                if (!$playerInMatch) {
                    $data[] = 0;
                    continue;
                }

                $isWinner = (int) $playerInMatch->pivot->team === (int) $match->winning_team;
                $data[] = $isWinner ? 1 : 0;
            }

            return [
                'name' => $player->name,
                'data' => $data,
            ];
        })->values();

        // Build bar-chart data:
        // calculate each player's total wins and losses from all recorded matches.
        $playerStats = $players->map(function ($player) {
            $wins = 0;
            $losses = 0;

            foreach ($player->matches as $match) {
                $isWinner = (int) $match->pivot->team === (int) $match->winning_team;

                if ($isWinner) {
                    $wins++;
                } else {
                    $losses++;
                }
            }

            return [
                'id' => $player->id,
                'name' => $player->name,
                'wins' => $wins,
                'losses' => $losses,
            ];
        })->values();

        // Build pie-chart data: count players by status.
        $statusCounts = [
            'labels' => ['Provisional', 'Ranked', 'Inactive'],
            'series' => [
                $players->where('status', 'provisional')->count(),
                $players->where('status', 'ranked')->count(),
                $players->where('status', 'inactive')->count(),
            ],
        ];

        return Inertia::render('Tennis/Players/Statistics', [
            // Data for the line chart: wins by match date.
            'playerWinsChart' => [
                'categories' => $categories,
                'series' => $lineSeries,
            ],

            // Data for the bar chart: total wins/losses by player.
            'players' => $playerStats,
            'statusCounts' => $statusCounts,
        ]);
    }

    public function index()
    {
        $paginatedPlayers = TennisPlayer::with('matches')
            ->orderBy('name')
            ->paginate(10);

        $paginatedPlayers->through(function ($player) {
            $wins = 0;
            $losses = 0;

            foreach ($player->matches as $match) {
                $isWinner = (int) $match->pivot->team === (int) $match->winning_team;

                if ($isWinner) {
                    $wins++;
                } else {
                    $losses++;
                }
            }

            $latestMatch = $player->matches
                ->sortByDesc('date_played')
                ->first();

            return [
                'id' => $player->id,
                'name' => $player->name,
                'rating' => $player->rating,
                'status' => $player->status,
                'wins' => $wins,
                'losses' => $losses,
                'matches_played' => $player->matches->count(),
                'last_played_date' => $latestMatch?->date_played?->toDateString(),
                'last_played_date_overridden' => $player->last_played_date_overridden,
            ];
        });

        return Inertia::render('Tennis/Players/Index', [
            'players' => $paginatedPlayers,
        ]);
    }



    public function create()
    {
        return Inertia::render('Tennis/Players/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'in:provisional,ranked,inactive'],
        ]);

        TennisPlayer::create([
            'name' => $validated['name'],
            'status' => $validated['status'],
            'rating' => $validated['rating'] ?? 0.00,
            'matches_played' => 0,
            'wins' => 0,
            'losses' => 0,
        ]);

        return redirect()
            ->route('tennis.players.index')
            ->with('success', 'Player created successfully.');
    }

    public function edit(TennisPlayer $player)
    {
        $latestMatch = $player->matches()
            ->latest('date_played')
            ->first();

        return Inertia::render('Tennis/Players/Edit', [
            'player' => [
                'id' => $player->id,
                'name' => $player->name,
                'rating' => $player->rating,
                'status' => $player->status,
                'wins' => $player->matches()->get()->filter(function ($match) {
                    return (int) $match->pivot->team === (int) $match->winning_team;
                })->count(),
                'losses' => $player->matches()->count() - $player->matches()->get()->filter(function ($match) {
                    return (int) $match->pivot->team === (int) $match->winning_team;
                })->count(),
                'matches_played' => $player->matches()->count(),
                'last_played_date' => $latestMatch && $latestMatch->date_played instanceof Carbon
                    ? $latestMatch->date_played->format('d-m-Y')
                    : null,


            ],
        ]);
    }


    public function update(Request $request, TennisPlayer $player)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => ['nullable', 'numeric', 'min:0'],
            'status' => 'required|in:provisional,ranked,inactive',
        ]);

        $player->update([
            'name' => $validated['name'],
            'rating' => $validated['rating'] ?? 0.00,
            'status' => $validated['status'],
        ]);

        return redirect()->route('tennis.players.index');
    }

    public function destroy(TennisPlayer $player)
    {
        $player->delete();

        return redirect()->route('tennis.players.index')
            ->with('success', 'Player deleted successfully.');
    }


}
