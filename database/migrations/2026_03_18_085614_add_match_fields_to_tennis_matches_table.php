<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tennis_matches', function (Blueprint $table) {
            //
            $table->string('match_type')->after('date_played');
            $table->string('score')->after('match_type');
            $table->unsignedTinyInteger('winning_team')->after('score');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tennis_matches', function (Blueprint $table) {
            //
            $table->dropColumn(['match_type', 'score', 'winning_team']);
        });
    }
};
