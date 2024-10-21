<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\BaddyAttendance;
use App\Http\Resources\MemberResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $members = Member::withCount('baddyAttendances')->get()->map(function ($member){
            // $member->total = $member->amount * $member->baddy_attendaces_count;
            $member->updateTotal();
            \Log::info($member);
            return $member;                
        });

        return Inertia::render("Members/Index", [
            'members' => $members,
        ]);

        // $query = Member::query();
        // $members = $query->paginate(20)->onEachSide(1);
        
        // return Inertia::render("Members/Index", [
        //     "members" => MemberResource::collection($members),
        // ]);

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
            'amount' => 'required|numeric|min:0',
            'addOnAmount' => 'required|numeric|min:0',
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
    public function edit($id)
    {
        //
        $member = Member::with('baddyAttendances')->findOrFail($id);
       
        return Inertia::render('Members/Edit',[
            'member'=> $member,
            'baddyAttendances' => $member->baddyAttendances,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member):RedirectResponse
    {
        //
        // Gate::authorize('update', $member);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'gender'=>'required|string|max:15',
            'amount' => 'required|numeric|min:0',
            'addOnAmount' => 'numeric|min:0',
        ]);

        $member->update($data);
      
        return redirect(route('members.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        //
        $member->delete();
        return redirect(route('members.index'));
    }
}
