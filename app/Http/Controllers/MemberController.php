<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Http\Resources\MemberResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        //
        $query = Member::query();
        $members = $query->paginate(20)->onEachSide(1);
        
        return Inertia::render("Members/Index", [
            "members" => MemberResource::collection($members),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("Members/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request):RedirectResponse
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'gender' => ['required', Rule::in(['Male', 'Female', 'Other'])],
        ]);

        $request->user()->members()->create($validated);
        return redirect(route('members.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        //
    }
}
