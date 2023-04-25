<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'username' => 'testuser1',
            'email' => 'test@demo.com'
        ]);
        

        $this->call([
            ExerciseSeeder::class,
            NutritionSeeder::class,
            NutritionDailyValueSeeder::class,
            MeasurementTypeSeeder::class,
            BmiRangeSeeder::class,
        ]);

    }
}
