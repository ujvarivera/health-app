<?php

namespace Database\Seeders;

use App\Imports\NutritionImport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;

class NutritionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Excel::import(new NutritionImport, public_path('nutrition_5000.xlsx'));
    }
}
