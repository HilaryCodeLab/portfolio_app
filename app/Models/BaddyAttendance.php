<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BaddyAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_location',
        'session_date',
        'user_id',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function members():BelongsToMany
    {
        return $this->belongsToMany(Member::class,'baddy_attendance_member', 'baddy_attendance_id', 'member_id');
    }
}
