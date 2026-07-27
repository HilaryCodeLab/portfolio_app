<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeUserAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:make-admin {email} {--revoke : Remove admin instead of granting it}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Grant (or revoke with --revoke) admin rights for the user with the given email';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (! $user) {
            $this->error("No user found with email {$email}.");

            return self::FAILURE;
        }

        // is_admin is intentionally not mass-assignable, so set it directly.
        $user->is_admin = ! $this->option('revoke');
        $user->save();

        $this->info($user->is_admin
            ? "{$user->name} <{$email}> is now an admin."
            : "Admin rights removed from {$user->name} <{$email}>.");

        return self::SUCCESS;
    }
}
