<?php

namespace App\Http\Controllers;

use App\Models\TennisMatch;
use App\Models\TennisPlayer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TennisMatchController extends Controller
{
    public function index()
    {
        return Inertia::render('Tennis/Matches/Index', [
            'matches' => TennisMatch::with('players')
                ->latest('date_played')
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function scoring()
    {
        return Inertia::render('Tennis/Matches/Scoring', [
            // Each match's players carry their rating (shown as "rank") and team via the pivot.
            'matches' => TennisMatch::with('players')
                ->latest('date_played')
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tennis/Matches/Create', [
            // Send players to the form so users can assign them to teams.
            'players' => TennisPlayer::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date_played' => ['required', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'match_type' => ['required', 'in:singles,doubles'],
            'score' => ['nullable', 'regex:/^\d+-\d+(,\s?\d+-\d+)*$/'],
            'winning_team' => ['required', 'in:1,2'],
            'players' => ['required', 'array'],
            'players.*.id' => ['required', 'exists:tennis_players,id'],
            'players.*.team' => ['required', 'in:1,2'],
        ]);

        $players = $validated['players'];
        $playerIds = array_column($players, 'id');
        $teamCounts = array_count_values(array_column($players, 'team'));

        // Prevent the same player from being selected twice in one match.
        if (count($playerIds) !== count(array_unique($playerIds))) {
            return back()
                ->withErrors(['players' => 'A player can only be selected once per match.'])
                ->withInput();
        }

        // Singles must be a 1 vs 1 match.
        if ($validated['match_type'] === 'singles') {
            if (count($players) !== 2 || ($teamCounts['1'] ?? 0) !== 1 || ($teamCounts['2'] ?? 0) !== 1) {
                return back()
                    ->withErrors(['players' => 'Singles must have 1 player on each team.'])
                    ->withInput();
            }
        }

        // Doubles must be a 2 vs 2 match.
        if ($validated['match_type'] === 'doubles') {
            if (count($players) !== 4 || ($teamCounts['1'] ?? 0) !== 2 || ($teamCounts['2'] ?? 0) !== 2) {
                return back()
                    ->withErrors(['players' => 'Doubles must have 2 players on each team.'])
                    ->withInput();
            }
        }

        DB::transaction(function () use ($validated, $players) {
            // Create the main match record.
            $match = TennisMatch::create([
                'date_played' => $validated['date_played'],
                'location' => $validated['location'] ?? null,
                'match_type' => $validated['match_type'],
                'score' => $validated['score'],
                'winning_team' => (int) $validated['winning_team'],
            ]);

            // Build pivot data so each selected player is attached with a team number.
            $pivotData = [];
            foreach ($players as $player) {
                $pivotData[$player['id']] = [
                    'team' => (int) $player['team'],
                ];
            }

            // Save the player-team assignments to the pivot table.
            $match->players()->attach($pivotData);
        });

        return redirect()->route('tennis.matches.index');
    }

    public function edit(TennisMatch $match)
    {
        return Inertia::render('Tennis/Matches/Edit', [
            // Load current player assignments for the edit form.
            'match' => $match->load('players'),
            'players' => TennisPlayer::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, TennisMatch $match)
    {
        $validated = $request->validate([
            'date_played' => ['required', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'match_type' => ['required', 'in:singles,doubles'],
            'score' => ['nullable', 'regex:/^\d+-\d+(,\s?\d+-\d+)*$/'],
            'winning_team' => ['required', 'in:1,2'],
            'players' => ['required', 'array'],
            'players.*.id' => ['required', 'exists:tennis_players,id'],
            'players.*.team' => ['required', 'in:1,2'],
        ]);

        $players = $validated['players'];
        $playerIds = array_column($players, 'id');
        $teamCounts = array_count_values(array_column($players, 'team'));

        // Prevent duplicate player selection within the same match.
        if (count($playerIds) !== count(array_unique($playerIds))) {
            return back()
                ->withErrors(['players' => 'A player can only be selected once per match.'])
                ->withInput();
        }

        // Singles must remain 1 vs 1.
        if ($validated['match_type'] === 'singles') {
            if (count($players) !== 2 || ($teamCounts['1'] ?? 0) !== 1 || ($teamCounts['2'] ?? 0) !== 1) {
                return back()
                    ->withErrors(['players' => 'Singles must have 1 player on each team.'])
                    ->withInput();
            }
        }

        // Doubles must remain 2 vs 2.
        if ($validated['match_type'] === 'doubles') {
            if (count($players) !== 4 || ($teamCounts['1'] ?? 0) !== 2 || ($teamCounts['2'] ?? 0) !== 2) {
                return back()
                    ->withErrors(['players' => 'Doubles must have 2 players on each team.'])
                    ->withInput();
            }
        }

        DB::transaction(function () use ($match, $validated, $players) {
            // Update the match record itself.
            $match->update([
                'date_played' => $validated['date_played'],
                'location' => $validated['location'] ?? null,
                'match_type' => $validated['match_type'],
                'score' => $validated['score'],
                'winning_team' => (int) $validated['winning_team'],
            ]);

            // Rebuild the pivot data for the edited player-team assignments.
            $pivotData = [];
            foreach ($players as $player) {
                $pivotData[$player['id']] = [
                    'team' => (int) $player['team'],
                ];
            }

            // Replace the old pivot rows with the new ones.
            $match->players()->sync($pivotData);
        });

        return redirect()->route('tennis.matches.index');
    }

    public function destroy(TennisMatch $match)
    {
        DB::transaction(function () use ($match) {
            // Remove all pivot relationships before deleting the match.
            $match->players()->detach();
            $match->delete();
        });

        return redirect()->route('tennis.matches.index');
    }
}
