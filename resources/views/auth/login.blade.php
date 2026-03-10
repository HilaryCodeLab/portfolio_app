@extends('layouts.guest')

@section('title', 'Login')

@section('content')
<div class="w-full max-w-sm bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    @if($errors->any())
        <div class="text-red-500 mb-2">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf
        <input type="email" name="email" placeholder="Email" required class="w-full p-2 mb-4 border rounded">
        <input type="password" name="password" placeholder="Password" required class="w-full p-2 mb-4 border rounded">

        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
</div>
@endsection

