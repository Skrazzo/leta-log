<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function logout()
    {
        Auth::logout();
        return redirect(route('login'));
    }

    public function register(Request $req)
    {
        $data = $req->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|min:3',
            'surname' => 'required',
            'password' => 'required|min:8'
        ]);

        User::create($data);
        return back();
    }

    public function login(Request $req)
    {
        $credentials = $req->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (auth()->attempt($credentials)) {
            $req->session()->regenerate();
            return redirect(route('dashboard'));
        }

        return back()->withErrors([
            'error' => 'Username or password is incorrect!',
        ]);
    }
}
