<?php

namespace App\Policies;

use App\Models\TennisPlayer;
use App\Models\User;

class TennisPlayerPolicy
{
    /**
     * Anyone signed in can browse the player list.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Anyone signed in can view an individual player.
     */
    public function view(User $user, TennisPlayer $tennisPlayer): bool
    {
        return true;
    }

    /**
     * Any signed-in user can create their own players.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * The creator may edit a player; an admin may edit any player.
     */
    public function update(User $user, TennisPlayer $tennisPlayer): bool
    {
        return $user->is_admin || $tennisPlayer->user_id === $user->id;
    }

    /**
     * The creator may delete a player; an admin may delete any player.
     */
    public function delete(User $user, TennisPlayer $tennisPlayer): bool
    {
        return $user->is_admin || $tennisPlayer->user_id === $user->id;
    }
}
