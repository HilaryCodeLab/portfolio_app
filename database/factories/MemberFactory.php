<?php


namespace Database\Factories;

use App\Models\BaddyAttendance;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'gender' => fake()->randomElement(['Male', 'Female', 'Other']),
            'amount' => 10,
            'user_id' => 1,
            
          
            
        ];
    }
}
