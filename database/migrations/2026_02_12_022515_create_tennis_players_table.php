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
        Schema::create('tennis_players', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->decimal('rating', 8, 2)
                ->default(0.00);

            $table->integer('matches_played')->default(0);
            $table->integer('wins')->default(0);
            $table->integer('losses')->default(0);

            $table->date('last_played_date')->nullable();

            $table->boolean('last_played_date_overridden')
                ->default(false);

            $table->enum('status', [
                'provisional',
                'ranked',
                'inactive',
            ])->default('provisional');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tennis_players');
    }
};
