<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function view()
    {
        return Inertia::render('Dashboard');
    }

    public function create_page()
    {
        return Inertia::render('CreatePost');
    }

}
