<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CommentOwner;
use App\Http\Middleware\PostOwner;
use Illuminate\Support\Facades\Route;

// Routes for authorisation
Route::controller(UserController::class)->group(function () {
    // index/login
    Route::prefix('login')->group(function () {
        Route::get('/', 'login_index')->name('login');
        Route::post('/', 'login')->name('post.login');
    });

    // index/register
    Route::prefix('register')->group(function () {
        Route::get('/', 'register_index')->name('register');
        Route::post('/', 'register')->name('post.register');
    });

    Route::get('/logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function () {
    // CRUD for posts/comments
    Route::controller(PostsController::class)->group(function () {
        // Posts
        Route::get('/', 'view')->name('posts.view'); // view all posts
        Route::get('/new', 'create_page')->name('posts.create.page'); // create post page
        Route::get('/posts', 'get')->name('get.posts.data'); // Api route to get posts in dashboard
        Route::prefix('post')->group(function () {
            Route::post('/', 'create')->name('posts.create'); // create post
            Route::get('/{post}', 'view_post')->name('post.view'); // view single post

            Route::middleware(PostOwner::class)->group(function () {
                Route::delete('/{post}', 'delete_post')->name('post.delete'); // delete post
                // Edit post page
                // Edit post
            });
        });

        // Comments
        Route::post('/comment/{post}', 'comment')->name('post.comment'); // comment on post
        Route::delete('/comment/{comment}', 'delete_comment')->name('post.delete.comment')->middleware(CommentOwner::class); // delete comment
    });
});
