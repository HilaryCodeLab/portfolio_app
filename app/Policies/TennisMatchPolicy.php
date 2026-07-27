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
     * The creator may edit a match; an admin may edit any match.
     */
    public function update(User $user, TennisMatch $tennisMatch): bool
    {
        return $user->is_admin || $tennisMatch->user_id === $user->id;
    }

    /**
     * The creator may delete a match; an admin may delete any match.
     */
    public function delete(User $user, TennisMatch $tennisMatch): bool
    {
        return $user->is_admin || $tennisMatch->user_id === $user->id;
    }
}
