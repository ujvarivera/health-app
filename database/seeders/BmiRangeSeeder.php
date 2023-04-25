<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BmiRangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bmi_ranges')->insert([
            [
                'status' => 'Underweight',
                'lower' => NULL,
                'upper' => 18.5,
                'classes' => 'text-blue-500'
            ],
            [
                'status' => 'Normal weight',
                'lower' => 18.5,
                'upper' => 24.9,
                'classes' => 'text-green-500'
            ],
            [
                'status' => 'Underweight',
                'lower' => 25,
                'upper' => 29.9,
                'classes' => 'text-yellow-500'
            ],
            [
                'status' => 'Obesity (Class I.)',
                'lower' => 30,
                'upper' => 34.9,
                'classes' => 'text-orange-400'
            ],
            [
                'status' => 'Obesity (Class II.)',
                'lower' => 35,
                'upper' => 39.9,
                'classes' => 'text-orange-500'
            ],
            [
                'status' => 'Obesity (Class III.)',
                'lower' => 40,
                'upper' => NULL,
                'classes' => 'text-red-500'
            ],
        ]);
    }
}
