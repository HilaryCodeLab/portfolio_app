<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TennisPlayer extends Model
{
    protected $fillable = [
        'user_id',
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
