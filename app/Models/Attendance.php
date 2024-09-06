<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    public function user():BelongsTo
    {
      return $this->belongsTo(User::class);  
    }

    protected $fillable = [
        'session_location',
        'members',
        'session_date',
        // 'session_date',
        // 'session_date'=> 'datetime: d-m-Y',
    ];
}
