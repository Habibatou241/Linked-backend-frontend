<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::factory()->create([
            'name' => 'NDJIDDA',
            'email' => 'pipadmin@gmail.com',
            'password' => Hash::make('admin1234'),
            'role' => 'admin'
        ]);

        // Create test user
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'role' => 'user'
        // ]);
    }
}
