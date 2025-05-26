<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryNames = [
            'Programming',
            'Food',
            'Travel',
            'Technology',
            'Lifestyle',
            'Fashion',
            'Business',
            'Health & Fitness',
            'Parenting',
            'Education',
            'Personal Development',
            'Finance',
            'DIY & Crafts',
            'Book Reviews',
            'Movie Reviews',
            'Gaming',
            'Photography',
            'Music',
            'Sports',
            'Home Decor',
            'Science',
            'Art & Design',
            'Environment',
            'History',
            'Culture',
            'Automotive',
        ];

        foreach ($categoryNames as $name) {
            Category::create([
                'name' => $name,
            ]);
        }
    }
}
