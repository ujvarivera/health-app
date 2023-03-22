<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exercise;
use Illuminate\Support\Facades\Http;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::withHeaders([
            'X-RapidAPI-Key' => env('RAPID_API_KEY'),
            'X-RapidAPI-Host' => env('RAPID_API_HOST')
        ])->get('https://exercisedb.p.rapidapi.com/exercises');
    
        $exercises = $response->json();

        foreach ($exercises as $exercise) {
            Exercise::create([
                'name' => $exercise["name"],
                'body_part' => $exercise["bodyPart"],
                'equipment' => $exercise["equipment"],
                'gif_url' => $exercise["gifUrl"],
                'target' => $exercise["target"],
            ]);
        }
    }
}
