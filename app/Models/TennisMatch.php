<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TennisMatch extends Model
{
    protected $fillable = [
        'user_id',
        'date_played',
        'location',
        'match_type',
        'score',
        'winning_team',
    ];

    protected $casts = [
        'date_played' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function players()
    {
        return $this->belongsToMany(
            TennisPlayer::class,
            'tennis_match_player',
            'tennis_match_id',
            'tennis_player_id'
        )->withPivot(['team'])->withTimestamps();
    }
}
