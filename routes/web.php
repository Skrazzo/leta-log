<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
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
    // CRUD for posts
    Route::controller(PostsController::class)->group(function () {
        Route::get('/', 'view')->name('posts.view');
        Route::get('/new', 'create_page')->name('posts.create.page');
        Route::post('/new', 'create')->name('posts.create');
    });
});
