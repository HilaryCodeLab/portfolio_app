<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\BaddyAttendance;
use App\Http\Resources\BaddyAttendanceResource;
use App\Http\Requests\StoreBaddyAttendanceRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class BaddyAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        //
        // $data = BaddyAttendance::all();
        // $query = BaddyAttendance::query();
        // $attendances = $query->paginate(10)->onEachSide(1);
        // $baddyAttendances = BaddyAttendance::with('members')->get();
        $baddyAttendances = BaddyAttendance::with('members')
        ->orderBy('created_at', 'desc')    
        ->paginate(10)
        ->onEachSide(1);
       
        return Inertia::render("BaddyAttendances/Index", [
            "baddyAttendances" => $baddyAttendances,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $members = Member::all();
        return Inertia::render('BaddyAttendances/Create', ['members' => $members]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try
        {
            Log::info($request->all());
            Log::info('Form Submitted');

            $validated = $request->validate([
                'session_date' => 'required|date',
                'session_location' => 'required|string|max:50',
                'members' => 'required|array|min:2',
                'members.*' => 'exists:members,id',
            ]);

            $validated['session_date'] = Carbon::parse($validated['session_date'])->format('Y-m-d');
            $user = $request->user();
            \Log::info('Authenticated user: ', [$user]);
          
            // If it reaches here, validation has passed
            \Log::info('Validation passed:', $validated);
            
            $baddyAttendance = BaddyAttendance::create([
                'session_date' => $validated['session_date'],
                'session_location' => $validated['session_location'],
                'user_id' => $user->id,
            ]);
    
            // dd($baddyAttendance);
            $baddyAttendance->members()->attach($validated['members']);

            return redirect(route('baddy_attendances.index'));
    
        }
        catch(\Illuminate\Validation\ValidationException $e)
        {
            // Log validation errors
            \Log::info('Validation failed:', $e->errors());
            return back()->withErrors($e->errors())->withInput();
        }
       
    }

    /**
     * Display the specified resource.
     */
    public function show(BaddyAttendance $baddyAttendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $baddyAttendance = BaddyAttendance::with('members')->findOrFail($id);
        $members = Member::all();

        return Inertia::render('BaddyAttendances/Edit',[
            'baddyAttendance' => $baddyAttendance,
            'members' => $members, 
        ]);
     
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BaddyAttendance $baddyAttendance):RedirectResponse
    {
        Gate::authorize('update', $baddyAttendance);
        $data = $request->validate([

            'session_date' => 'required | date',  
            'session_location' => 'required | string | max: 50',
            'members' => 'required|array|min:2',
            'members.*' => 'exists:members,id',
        ]);

        // $baddyAttendance->update($data);
        $baddyAttendance->update([
            'session_date' => $data['session_date'],
            'session_location' => $data['session_location'],
        ]);

        $baddyAttendance->members()->sync($data['members']);
        
     
        return redirect(route('baddy_attendances.index')); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BaddyAttendance $baddyAttendance)
    {
        $baddyAttendance->delete();
        return redirect(route('baddy_attendances.index')); 
    }
}
