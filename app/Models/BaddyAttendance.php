<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BaddyAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_location',
        'session_date',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function members():BelongsToMany
    {
        return $this->belongsToMany(Member::class);
    }
}
