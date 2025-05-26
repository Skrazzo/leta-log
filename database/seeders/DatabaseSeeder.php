<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $this->call([
            CategorySeeder::class,
        ]);

        // Create test user / random users
        $testUser = User::factory()->create([
            'name' => 'John',
            'surname' => 'Doe',
            'email' => 'test@example.com',
            'password' => Hash::make('labdien123'),
        ]);

        $users = User::factory()->count(10)->create(); // Create 10 random users
        $users[] = $testUser; // Add test user to the list

        // Generate posts with comments
        foreach ($users as $user) {
            // Create 50 posts for each user, then attach random categories to each post
            $posts = Post::factory()->count(50)->create(['user_id' => $user->id]);

            foreach ($posts as $post) {
                $categories = Category::all();
                $randomCategories = $categories->random(rand(1, 3))->pluck('id')->toArray();

                $post->categories()->attach($randomCategories);
            }

            // Each user has 500 comments on random posts
            for ($i = 0; $i < 500; $i++) {
                $posts = Post::all();
                $post = $posts->random(1)->first();
                Comment::factory()->create(['user_id' => $user->id,'post_id' => $post->id]);
            }
        }


        // Create small blog post about this project
        $coolPost = Post::create([
            'user_id' => $testUser->id,
            'title' => "Leta Log - A blogging platform built with Laravel",
            'content' => "<h2>Hello world</h2><p>I wanted to share some insights and highlights from a recent project I've been working on – a full-featured blogging platform. This endeavor has been a fantastic journey through modern web development practices, leveraging a powerful stack to create a seamless and interactive user experience.</p><h2>The Vision: More Than Just a Blog</h2><p>The goal was to build more than just a static blog. We aimed for a dynamic platform where users can:</p><ul><li><p>Create, read, update, and delete blog posts.</p></li><li><p>Categorize posts using a flexible many-to-many system.</p></li><li><p>Engage with content through comments.</p></li><li><p>Experience a smooth, app-like interface without full page reloads.</p></li></ul><h2>Our Tech Stack Powerhouse 🚀</h2><p>Choosing the right tools is crucial, and for this project, we landed on a combination that offers robustness, developer productivity, and a great end-user experience:</p><ul><li><p><strong>Backend</strong>: Laravel (PHP) - For its elegant syntax, powerful ORM (Eloquent), built-in features like authentication, and overall developer-friendliness.</p></li><li><p><strong>Frontend</strong>: React (TypeScript) - For building interactive and reusable UI components with the benefits of static typing.</p></li><li><p><strong>The Bridge</strong>: Inertia.js - The magic that connects our Laravel backend to our React frontend, allowing us to build a modern SPA (Single Page Application) without building a separate API in the traditional sense.</p></li><li><p><strong>Styling</strong>: Tailwind CSS (v4) - For utility-first CSS that enables rapid UI development and customization.</p></li><li><p><strong>Icons</strong>: Lucide React - For a clean and comprehensive set of SVG icons.</p></li></ul><h2>Conclusion</h2><p>Building this blogging platform has been a rewarding experience, showcasing how Laravel, React, and Inertia.js can come together to create modern, efficient, and enjoyable web applications. The focus on clean backend logic, reusable frontend components, and efficient data handling has resulted in a project that's both powerful and maintainable.</p><p>Thanks for reading, and I hope this gives you some insight into the development process!</p>",
            'text' => "Hello world. I wanted to share some insights and highlights from a recent project I've been working on – a full-featured blogging platform. This endeavor has been a fantastic journey through modern web development practices, leveraging a powerful stack to create a seamless and interactive user experience. The Vision: More Than Just a Blog"
        ]);

        $coolPost->categories()->attach([1]);
    }
}
