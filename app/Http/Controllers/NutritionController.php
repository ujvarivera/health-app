<?php

namespace App\Http\Controllers;

use App\Models\Nutrition;
use Illuminate\Http\Request;

class NutritionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nutritionList = Nutrition::orderBy('name')->get();

        return inertia('Nutrition/Index', compact('nutritionList'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Nutrition $nutrition)
    {
        return inertia('Nutrition/Show', compact('nutrition'));
    }

}
