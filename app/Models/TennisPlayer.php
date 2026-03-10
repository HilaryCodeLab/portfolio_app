<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TennisPlayer extends Model
{
    protected $fillable = [
        'name',
        'rating',
        'matches_played',
        'wins',
        'losses',
        'last_played_date',
        'last_played_date_overridden',
        'status',
    ];

    protected $casts = [
        'last_played_date' => 'date',
        'last_played_date_overridden' => 'boolean',
        'rating' => 'float',
    ];
}
