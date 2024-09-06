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
        Schema::table('members', function (Blueprint $table) {
            //
            $table->dropForeign('members_baddy_attendance_id_foreign');
            $table->dropColumn('baddy_attendance_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('baddy_attendance_id');
            $table->foreignId('baddy_attendance_id')->constrained()->cascadeOnDelete();
        });
    }
};
