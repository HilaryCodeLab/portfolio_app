<?php

namespace App\Http\Controllers;

use App\Models\TennisPlayer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TennisPlayerController extends Controller
{
    public function index()
    {
        return Inertia::render('Tennis/Players/Index', [
            'players' => TennisPlayer::orderBy('rating', 'desc')->get(),
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
            'status' => ['required', 'in:provisional,ranked,inactive'],
        ]);

        TennisPlayer::create([
            'name' => $validated['name'],
            'status' => $validated['status'],
            'rating' => 0.00,
            'matches_played' => 0,
            'wins' => 0,
            'losses' => 0,
        ]);

        return redirect()
            ->route('tennis.players.index')
            ->with('success', 'Player created successfully.');
    }

    public function update(Request $request, TennisPlayer $player)
    {
        $validated = $request->validate([
            'last_played_date' => 'nullable|date',
        ]);

        $player->update([
            'last_played_date' => $validated['last_played_date'],
            'last_played_date_overridden' => true,
        ]);

        return redirect()->route('tennis.players.index');
    }
}
