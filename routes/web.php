<?php

use App\Http\Controllers\BaddyAttendanceController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)

    ->only(['index', 'store', 'update', 'destroy'])

    ->middleware(['auth', 'verified']);

Route::resource('attendances', AttendanceController::class)

    ->only(['index','store','update','destroy'])
    
    ->middleware(['auth','verified']);

Route::resource('baddy_attendances', BaddyAttendanceController::class)

    ->only(['index', 'create', 'store', 'update', 'edit','destroy'])

    ->middleware(['auth', 'verified']);

Route::resource('members', MemberController::class)

    ->only(['index', 'create', 'store', 'update', 'edit','destroy'])

    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
