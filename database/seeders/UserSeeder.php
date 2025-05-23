<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Random acc
        User::factory()->count(10)->create();

        // Mine acc
        User::create([
            'name' => 'Leons',
            'surname' => 'Aleksandrovs',
            'email' => 'admin@admin.com',
            'password' => Hash::make('labdien123'),
        ]);
    }
}
