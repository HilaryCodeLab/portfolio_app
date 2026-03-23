<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tennis_match_player', function (Blueprint $table) {
            $table->foreignId('tennis_match_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tennis_player_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('team');
            $table->unique(['tennis_match_id', 'tennis_player_id']);
        });
    }

    public function down(): void
    {
        Schema::table('tennis_match_player', function (Blueprint $table) {
            $table->dropUnique(['tennis_match_id', 'tennis_player_id']);
            $table->dropConstrainedForeignId('tennis_match_id');
            $table->dropConstrainedForeignId('tennis_player_id');
            $table->dropColumn('team');
        });
    }
};
