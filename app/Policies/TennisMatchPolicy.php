<?php

namespace App\Policies;

use App\Models\TennisMatch;
use App\Models\User;

class TennisMatchPolicy
{
    /**
     * Anyone signed in can browse the match list.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Anyone signed in can view an individual match.
     */
    public function view(User $user, TennisMatch $tennisMatch): bool
    {
        return true;
    }

    /**
     * Any signed-in user can create their own matches.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Only the creator may edit a match. (An admin override will be added
     * here in a later phase.)
     */
    public function update(User $user, TennisMatch $tennisMatch): bool
    {
        return $tennisMatch->user_id === $user->id;
    }

    /**
     * Only the creator may delete a match.
     */
    public function delete(User $user, TennisMatch $tennisMatch): bool
    {
        return $tennisMatch->user_id === $user->id;
    }
}
