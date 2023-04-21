<?php

namespace App\Http\Controllers;

use App\Models\MeasurementType;
use App\Models\User;
use App\Models\UserMeasurement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserMeasurementController extends Controller
{
    public function index()
    {
        //$userMeasurements = auth()->user()->measurements;
        $userMeasurements = User::where('id', auth()->user()->id)->with('measurements', 'measurements.measurementTypeName')->first();
        //dd(json_decode($userMeasurements));
        return Inertia::render('Measurements/Index', compact('userMeasurements'));
    }

    public function create()
    {
        $measurementTypes = MeasurementType::all();

        return Inertia::render('Measurements/Create', compact('measurementTypes'));
    }

    // Add user measurements
    public function store(Request $request)
    {

        // Validation
        $request->validate([
            'measurementType' => 'required', // it's the id, not the name itself
            'measurementValue' => 'required',
        ]);

        $userMeasurement = UserMeasurement::create([
            'user_id' => auth()->user()->id,
            'measurement_type_id' => $request->measurementType,
            'value' => $request->measurementValue,
        ]);

        return redirect()->route('measurements.index');

    }
}
