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
                'name' => 'Calories',
                'code' => 'cal',
                'category' => 'macronutrients',
                'dv' => '2000',
                'unit' => 'cal'
            ],
            [
                'name' => 'Protein',
                'code' => 'protein_g',
                'category' => 'macronutrients',
                'dv' => '50',
                'unit' => 'g'
            ],
            [
                'name' => 'Fat',
                'code' => 'fat_g',
                'category' => 'macronutrients',
                'dv' => '78',
                'unit' => 'g'
            ],
            [
                'name' => 'Saturated Fats',
                'code' => 'saturated_fat_g',
                'category' => 'macronutrients',
                'dv' => '20',
                'unit' => 'g'
            ],
            [
                'name' => 'Carbohydrate',
                'code' => 'carbohydrate_g',
                'category' => 'macronutrients',
                'dv' => '275',
                'unit' => 'g'
            ],
            [
                'name' => 'Net Carbs',
                'code' => 'net_carbs_g',
                'category' => 'macronutrients',
                'dv' => '100',
                'unit' => 'g'
            ],
            [
                'name' => 'Fiber',
                'code' => 'fiber_g',
                'category' => 'macronutrients',
                'dv' => '28',
                'unit' => 'g'
            ],
            [
                'name' => 'Sugars',
                'code' => 'sugars_g',
                'category' => 'macronutrients',
                'dv' => '50',
                'unit' => 'g'
            ],
            /*
            [
                'name' => 'Sodium',
                'code' => 'sodium',
                'category' => 'minerals',
                'dv' => '2300',
                'unit' => 'mg'
            ],
            */
            [
                'name' => 'Potassium',
                'code' => 'potassium_mg',
                'category' => 'minerals',
                'dv' => '4700',
                'unit' => 'mg'
            ],
            [
                'name' => 'Magnesium',
                'code' => 'magnesium_mg',
                'category' => 'minerals',
                'dv' => '420',
                'unit' => 'mg'
            ],
            /*
            [
                'name' => 'Phosphorus',
                'code' => 'phosphorus',
                'category' => 'minerals',
                'dv' => '1250',
                'unit' => 'mg'
            ],
            */
            [
                'name' => 'Calcium',
                'code' => 'calcium_mg',
                'category' => 'minerals',
                'dv' => '1300',
                'unit' => 'mg'
            ],
            [
                'name' => 'Iron',
                'code' => 'iron_mg',
                'category' => 'minerals',
                'dv' => '18',
                'unit' => 'mg'
            ],
            [
                'name' => 'Vitamin C',
                'code' => 'vitamin_c_mg',
                'category' => 'vitamins',
                'dv' => '90',
                'unit' => 'mg'
            ],
            [
                'name' => 'Vitamin D',
                'code' => 'vitamin_d_mcg',
                'category' => 'vitamins',
                'dv' => '20',
                'unit' => 'mcg'
            ],
            [
                'name' => 'Vitamin B12',
                'code' => 'vitamin_b12_mcg',
                'category' => 'vitamins',
                'dv' => '2.4',
                'unit' => 'mcg'
            ],
            [
                'name' => 'Vitamin E',
                'code' => 'vitamin_e_mg',
                'category' => 'vitamins',
                'dv' => '15',
                'unit' => 'mg'
            ],
            /*
            [
                'name' => 'Vitamin K',
                'code' => 'vitamin_k',
                'category' => 'vitamins',
                'dv' => '120',
                'unit' => 'mcg'
            ],
            */
            [
                'name' => 'Cholesterol',
                'code' => 'cholesterol_mg',
                'category' => 'macronutrients',
                'dv' => '300',
                'unit' => 'mg'
            ],
            /*
            [
                'name' => 'Water',
                'code' => 'water_g',
                'category' => 'other',
                'dv' => '100',
                'unit' => 'g'
            ],
            */
        ]);
    }
}
