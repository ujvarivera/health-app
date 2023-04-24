<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nutrition extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'category',
        'cal',
        'fat_g',
        'protein_g',
        'carbohydrate_g',
        'sugars_g',
        'fiber_g',
        'cholesterol_mg',
        'saturated_fat_g',
        'calcium_mg',
        'iron_mg',
        'potassium_mg',
        'magnesium_mg',
        'vitamin_c_mg',
        'vitamin_b12_mcg',
        'vitamin_d_mcg',
        'vitamin_e_mg',
        'net_carbs_g',
        'water_g',
    ];
}
