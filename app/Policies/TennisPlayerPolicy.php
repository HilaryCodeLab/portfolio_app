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
     * Only the creator may edit a player. (An admin override will be added
     * here in a later phase.)
     */
    public function update(User $user, TennisPlayer $tennisPlayer): bool
    {
        return $tennisPlayer->user_id === $user->id;
    }

    /**
     * Only the creator may delete a player.
     */
    public function delete(User $user, TennisPlayer $tennisPlayer): bool
    {
        return $tennisPlayer->user_id === $user->id;
    }
}
