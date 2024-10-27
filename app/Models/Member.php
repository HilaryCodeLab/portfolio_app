<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Member extends Model
{
    use HasFactory;

    protected $fillable = [
      'name', 
      'gender',
      'amount',
      'addOnAmount',
      'total', 
      'user_id'
    ];

    public function user():BelongsTo
   {
    
    return $this->belongsTo(User::class);

   }
   
    public function baddyAttendances():BelongsToMany
   {
     //    return $this->belongsToMany(BaddyAttendance::class);
     return $this->belongsToMany(BaddyAttendance::class, 'baddy_attendance_member', 'member_id', 'baddy_attendance_id'); 
   }

   public function updateTotal()
   {
      $this->total = ($this->amount * $this->baddyAttendances()->count()) + $this->addOnAmount;
      $this->save();
   }
  
   
}

