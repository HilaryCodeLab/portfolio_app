<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tennis_matches', function (Blueprint $table) {
            $table->id();
            $table->date('date_played');
            $table->string('match_type'); // singles, doubles
            $table->string('score');
            $table->unsignedTinyInteger('winning_team'); // 1 or 2
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tennis_matches');
    }
};
