<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BmiRange;

class CalculatorController extends Controller
{
    public function index()
    {
        $bmiRanges = BmiRange::all();

        return inertia('Calculators/Bmi', compact('bmiRanges'));
    }
}
