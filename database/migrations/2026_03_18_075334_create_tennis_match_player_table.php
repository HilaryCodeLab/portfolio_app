<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tennis_match_player', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tennis_match_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tennis_player_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('team'); // 1 or 2
            $table->timestamps();

            $table->unique(['tennis_match_id', 'tennis_player_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tennis_match_player');
    }
};
