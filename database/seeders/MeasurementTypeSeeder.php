<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('measurement_types')->insert([
            [
                'name' => 'weight',
                'unit' => 'kg'
            ],
            [
                'name' => 'hips',
                'unit' => 'cm'
            ],
            [
                'name' => 'waist',
                'unit' => 'cm'
            ],
            [
                'name' => 'chest / bust',
                'unit' => 'cm'
            ],
            [
                'name' => 'upper arm',
                'unit' => 'cm'
            ],
            [
                'name' => 'thigh',
                'unit' => 'cm'
            ],
            [
                'name' => 'abdomen',
                'unit' => 'cm'
            ],
            /*
            [
                'name' => 'height',
                'unit' => 'cm'
            ],
            
            [
                'name' => 'body mass index (BMI)',
                'unit' => NULL
            ],
            [
                'name' => 'body fat percentage (BFP)',
                // 'description' => 'Body fat percentage (BFP) is a good indicator of your body composition and indicates the amount of fat you have in your body. Body Fat Calculator helps you to find out your body fat percentage, your body type and the number of calories you have to burn, to lose 1% of your body fat.',
                'unit' => NULL
            ],
            */
        ]);
    }
}
