<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tennis_matches', function (Blueprint $table) {
            // Nullable: matches that predate this column have no known creator.
            // nullOnDelete keeps a match if its creator's account is removed.
            $table->foreignId('user_id')->nullable()->after('id')
                ->constrained()->nullOnDelete();
        });

        // Backfill existing matches to the primary account (user 1) so they
        // stay editable. New matches get their creator stamped at create time.
        $firstUserId = DB::table('users')->min('id');
        if ($firstUserId !== null) {
            DB::table('tennis_matches')->whereNull('user_id')->update(['user_id' => $firstUserId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tennis_matches', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });
    }
};
