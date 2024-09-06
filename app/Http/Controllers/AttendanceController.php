<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        //
        return Inertia::render('Attendances/Index',[
            // 'attendances' => Attendance::with('user:id, name')->latest()->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        //
        $validated = $request->validate([
            
            'session_date' => 'required | date',  
            'session_location' => 'required | string | max: 50',
            'members' => 'required | string | max: 255', 
        ]);

        $request->user()->attendances()->create($validated);
        
        return redirect(route('attendances.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
