<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * '/' has no page of its own — it sends first-time visitors to registration
     * so the very first account can be created (routes/web.php:28).
     */
    public function test_the_root_route_redirects_to_registration_when_there_are_no_users(): void
    {
        $this->get('/')->assertRedirect(route('register'));
    }

    public function test_the_root_route_redirects_to_login_once_a_user_exists(): void
    {
        User::factory()->create();

        $this->get('/')->assertRedirect(route('login'));
    }
}
