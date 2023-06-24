<?php

namespace App\Http\Controllers;

use App\Models\MeasurementType;
use App\Models\UserGoal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserGoalController extends Controller
{
    public function index()
    {
        $userGoals = UserGoal::where('user_id', auth()->user()->id)->with('measurementTypeName')->get();
        // dd(json_decode($userGoals));
        return inertia('Goals/Index', compact('userGoals'));
    }

    public function create()
    {
        $measurementTypes = MeasurementType::all();
        return inertia('Goals/Create', compact('measurementTypes'));
    }

    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'measurementTypeId' => 'required',
            'goalValue' => 'required',
        ]);

        UserGoal::create([
            'measurement_type_id' => $request->get('measurementTypeId'),
            'name' => $request->get('goalName'),
            'value' => $request->get('goalValue'),
            'user_id' => auth()->user()->id,
            'completed_at' => NULL, // goal is not completed yet
        ]);

        return redirect()->route('goals.index');
    }

    /* Mark goal as completed */
    public function update(UserGoal $goal)
    {
        // $goal = UserGoal::where('id', $goalId)->first();
        $goal->completed_at = Carbon::now()->toDateTimeString();
        $goal->save();

        return redirect()->route('goals.index');
    }

}
