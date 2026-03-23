<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TennisPlayer extends Model
{
    protected $fillable = [
        'name',
        'rating',
        'status',
        'last_played_date_overridden',
    ];

    protected $casts = [
        'last_played_date' => 'date',
        'last_played_date_overridden' => 'boolean',
        'rating' => 'float',
    ];

    public function matches()
    {
        return $this->belongsToMany(
            TennisMatch::class,
            'tennis_match_player',
            'tennis_player_id',
            'tennis_match_id'
        )->withPivot(['team'])->withTimestamps();
    }
}
