<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BaddyAttendance>
 */
class BaddyAttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_date' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'session_location' => fake()->text(15),
            'user_id' => 1,
            

        ];
    }
}
