<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function view()
    {
        // Get all available categories
        $categories = Category::select('id', 'name')->orderBy('name', 'asc')->get();
        return Inertia::render('Dashboard', ['categories' => $categories]);
    }

    public function comment(Post $post, Request $req)
    {
        $data = $req->validate([
            'comment' => 'required|string|max:255',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'post_id' => $post->id,
            'comment' => $data['comment'],
        ]);

        return back();
    }

    public function delete_comment(Comment $comment)
    {
        $comment->delete();
        return back();
    }

    public function view_post(Post $post)
    {
        // Load other relationship tables aswell
        $post->load([
            'user:id,name,surname', // post author
            'comments' => function ($q) { // comments, with users sorted by newest
                $q->orderBy('created_at', 'desc')->with('user:id,name,surname');
            },
            'categories' => function ($q) { // Categories in alphabetical order
                $q->orderBy('name', 'asc');
            }
        ])->loadCount('comments');

        return Inertia::render('ViewPost', compact('post'));
    }

    public function delete_post(Post $post)
    {
        $post->delete();
        return redirect(route('posts.view')); // Dashboard
    }

    public function get(Request $req)
    {
        $validatedData = $req->validate([
            'query' => 'nullable|string|max:255',
            'category' => 'nullable|integer',
            'page' => 'nullable|integer|min:1',
            'author' => 'sometimes|integer',
        ]);

        $searchQuery = $validatedData['query'] ?? null;
        $categoryId = $validatedData['category'] ?? null;
        $authorId = $validatedData['author'] ?? null;
        $postsPerPage = 20;

        $query = Post::query()
            ->with([
                'categories',
                'user' => function ($q) {
                    $q->select('id', 'name', 'surname');
                }
            ]) // Eager load relationships, so that query go zoooooom
            ->withCount('comments')
            ->orderBy('created_at', 'desc');


        // Filter search query if provided
        if ($searchQuery && $searchQuery !== "") {
            $query->where(function (Builder $q) use ($searchQuery) {
                $q->where('title', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('text', 'LIKE', "%{$searchQuery}%");
            });
        }

        // Filter category if provided
        if ($categoryId && $categoryId > 0) {
            $query->whereHas('categories', function (Builder $q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        // Filter by author if provided
        if ($authorId && $authorId > 0) {
            $query->whereHas('user', function (Builder $q) use ($authorId) {
                $q->where('user_id', $authorId);
            });
        }

        // Get posts with pagination from $page variable
        $posts = $query->paginate($postsPerPage);
        return response()->json($posts);
    }

    public function edit_post_page(Post $post)
    {
        // Get all available categories
        $post->load('categories');
        $categories = Category::select('id', 'name')->orderBy('name', 'asc')->get();
        return Inertia::render('CreateEditPost', compact('categories', 'post'));
    }

    public function edit_post(Post $post, Request $req)
    {
        $data = $req->validate([
            'title' => 'required|string|max:75',
            'content' => 'required|string',
            'text' => 'required|string',
            'categories' => 'required|array',
            'categories.*' => 'required|integer|exists:categories,id',
        ]);

        // Updating post
        $post->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'text' => $data['text'],
        ]);

        // Sync up categories
        $post->categories()->sync($data['categories']);

        return redirect(route('post.view', $post->id)); // View updated post
    }

    public function create_page()
    {
        // Get all available categories
        $categories = Category::select('id', 'name')->orderBy('name', 'asc')->get();
        return Inertia::render('CreateEditPost', ['categories' => $categories]);
    }


    public function create(Request $req)
    {
        $data = $req->validate([
            'title' => 'required|string|max:75',
            'content' => 'required|string',
            'text' => 'required|string',
            'categories' => 'required|array',
            'categories.*' => 'required|integer|exists:categories,id',
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
