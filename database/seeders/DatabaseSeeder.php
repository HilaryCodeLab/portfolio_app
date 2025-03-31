<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\BaddyAttendance;
use App\Models\Member;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'hilary',
        //     'email' => 'hilarysoong@gmail.com',
        //     'password' => bcrypt('admin123'),
        //     'email_verified_at' => time(),
        // ]);

       $baddyAttendances= BaddyAttendance::factory(20)->create();

        $members = Member::factory(10)->create();

        foreach($baddyAttendances as $baddyAttendance)
        {
            $baddyAttendance->members()->attach(
                $members->random(rand(4,10))->pluck('id')->toArray()
            );
        }

    }
}
