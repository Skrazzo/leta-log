<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function view()
    {
        return Inertia::render('Dashboard');
    }

    public function create_page()
    {
        // Get all available categories
        $categories = Category::all()->select('id', 'name');
        return Inertia::render('CreatePost', ['categories' => $categories]);
    }


    public function create(Request $req)
    {
        $data = $req->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'text' => 'required|string',
            'categories' => 'required|array',
        ]);

        // Creating new post
        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $data['title'],
            'content' => $data['content'],
            'text' => $data['text'],
        ]);

        // Attaching all categories to the post
        if ($post && !empty($data['categories'])) {
            $post->categories()->attach($data['categories']);
        }

        return redirect(route('posts.view')); // Dashboard
    }

}
