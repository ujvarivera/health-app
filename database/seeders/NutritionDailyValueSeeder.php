<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NutritionDailyValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nutrition_daily_values')->insert([
            [
                'name' => 'calories',
                'category' => 'macronutrients',
                'dv' => '2000',
                'unit' => 'cal'
            ],
            [
                'name' => 'protein',
                'category' => 'macronutrients',
                'dv' => '50',
                'unit' => 'g'
            ],
            [
                'name' => 'fat',
                'category' => 'macronutrients',
                'dv' => '78',
                'unit' => 'g'
            ],
            [
                'name' => 'saturated_fats',
                'category' => 'macronutrients',
                'dv' => '20',
                'unit' => 'g'
            ],
            [
                'name' => 'carbohydrate',
                'category' => 'macronutrients',
                'dv' => '275',
                'unit' => 'g'
            ],
            [
                'name' => 'net_carbs',
                'category' => 'macronutrients',
                'dv' => '100',
                'unit' => 'g'
            ],
            [
                'name' => 'fiber',
                'category' => 'macronutrients',
                'dv' => '28',
                'unit' => 'g'
            ],
            [
                'name' => 'sugars',
                'category' => 'macronutrients',
                'dv' => '50',
                'unit' => 'g'
            ],
            [
                'name' => 'sodium',
                'category' => 'minerals',
                'dv' => '2300',
                'unit' => 'mg'
            ],
            [
                'name' => 'potassium',
                'category' => 'minerals',
                'dv' => '4700',
                'unit' => 'mg'
            ],
            [
                'name' => 'magnesium',
                'category' => 'minerals',
                'dv' => '420',
                'unit' => 'mg'
            ],
            [
                'name' => 'phosphorus',
                'category' => 'minerals',
                'dv' => '1250',
                'unit' => 'mg'
            ],
            [
                'name' => 'calcium',
                'category' => 'minerals',
                'dv' => '1300',
                'unit' => 'mg'
            ],
            [
                'name' => 'iron',
                'category' => 'minerals',
                'dv' => '18',
                'unit' => 'mg'
            ],
            [
                'name' => 'vitamin_c',
                'category' => 'vitamins',
                'dv' => '90',
                'unit' => 'cmg'
            ],
            [
                'name' => 'vitamin_d',
                'category' => 'vitamins',
                'dv' => '20',
                'unit' => 'mcg'
            ],
            [
                'name' => 'vitamin_b12',
                'category' => 'vitamins',
                'dv' => '2.4',
                'unit' => 'mcg'
            ],
            [
                'name' => 'vitamin_e',
                'category' => 'vitamins',
                'dv' => '15',
                'unit' => 'mg'
            ],
            [
                'name' => 'vitamin_k',
                'category' => 'vitamins',
                'dv' => '120',
                'unit' => 'mcg'
            ],
            [
                'name' => 'cholesterol',
                'category' => 'macronutrients',
                'dv' => '300',
                'unit' => 'mg'
            ],
            [
                'name' => 'water',
                'category' => 'other',
                'dv' => '100',
                'unit' => 'g'
            ],
        ]);
    }
}
