<?php

namespace App\Http\Controllers;

use App\Http\Resources\BaddyAttendanceResource;
use App\Http\Requests\StoreBaddyAttendanceRequest;
use App\Models\Member;
use App\Models\BaddyAttendance;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class BaddyAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        //
        // $data = BaddyAttendance::all();
        $query = BaddyAttendance::query();
        $attendances = $query->paginate(10)->onEachSide(1);
       
        return Inertia::render("BaddyAttendances/Index", [
            "baddyAttendances" => BaddyAttendanceResource::collection($attendances),
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
    public function store(StoreBaddyAttendanceRequest $request): RedirectResponse
    {
        //
        try
        {
            $baddyAttendance = BaddyAttendance::create([
                'session_date' => $request->input('session_date'),
                'session_location' => $request->input('session_location'),
            ]);
            console.log("success");
            $baddyAttendance->members()->attach($request->input('members'));
            
            return redirect(route('baddy_attendances.index'));
            
            // return Inertia::render('BaddyAttendances/Index');
            // return \Inertia\Inertia::location(route('baddy_attendances.index'));
            // return redirect()->route('baddy_attendances.index')->with('success', 'Baddy Attendance created successfully!');

        }
        catch(\Exception $e)
        {
            Log::error('Error creating attendance: ' . $e->getMessage());
            return back()->with('error', 'There was an issue creating the attendance.');
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
    public function edit(BaddyAttendance $baddyAttendance)
    {
        return Inertia::render('BaddyAttendances/Edit',[
            'baddyAttendance' => $baddyAttendance,
        ]);
     
        // return Inertia::render('BaddyAttendances/Edit',[
        //     'baddyAttendance' => new BaddyAttendanceResource($baddyAttendance),
        // ]);
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
            'members' => 'required | string | max: 255', 
        ]);

        $baddyAttendance->update($data);
        
     
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
