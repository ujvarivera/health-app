<?php

namespace App\Imports;

use App\Models\Nutrition;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class NutritionImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Nutrition([
            'name' => $row['name'],
            'category' => $row['food_group'],
            'cal' => $row['calories'],
            'fat_g' => $row['fat_g'],
            'protein_g' => $row['protein_g'],
            'carbohydrate_g' => $row['carbohydrate_g'],
            'sugar_g' => $row['sugars_g'],
            'fiber_g' => $row['fiber_g'],
            'cholesterol_mg' => $row['cholesterol_mg'],
            'saturated_fat_g' => $row['saturated_fats_g'],
            'calcium_mg' => $row['calcium_mg'],
            'iron_mg' => $row['iron_mg'],
            'potassium_mg' => $row['potassium_mg'],
            'magnesium_mg' => $row['magnesium_mg'],
            'vitamin_c_mg' => $row['vitamin_c_mg'],
            'vitamin_b12_mcg' => $row['vitamin_b12_mcg'],
            'vitamin_d_mcg' => $row['vitamin_d_mcg'],
            'vitamin_e_mg' => $row['vitamin_e_mg'],
            'net_carbs_g' => $row['net_carbs_g'],
            'water_g' => $row['water_g'],
        ]);
    }

    public function headingRow(): int
    {
        return 1;
    }
}
