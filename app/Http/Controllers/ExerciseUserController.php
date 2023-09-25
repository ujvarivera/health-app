<?php

namespace App\Http\Controllers;

use App\Models\ExerciseUser;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ExerciseUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myExercises = ExerciseUser::where('user_id', auth()->user()->id)
                        ->orderBy('created_at', 'desc')
                        ->with('exercise')
                        ->get();
        $dates = $myExercises->unique('created_at')->pluck('created_at');
        //dd(json_decode($myExercises));
        $today = Carbon::now()->format("Y-m-d");

        return inertia('Exercises/MyExercises', compact('myExercises', 'dates', 'today'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'exerciseId' => 'required',
            'durationInMin' => 'required',
            'note' => 'nullable',
            'calBurned' => 'nullable',
        ]);

        ExerciseUser::create([
            'user_id' => auth()->user()->id,
            'exercise_id' => $request->get('exerciseId'),
            'duration_in_min' => $request->get('durationInMin'),
            'note' => $request->get('note') !== "" ? $request->get('note') : NULL,
            'cal_burned' => $request->get('calBurned') !== "" ? $request->get('calBurned') : NULL,
            'created_at' => Carbon::now(),
        ]);

        return redirect()->route('exercises.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExerciseUser $exerciseUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExerciseUser $exerciseUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExerciseUser $exerciseUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExerciseUser $exerciseUser)
    {
        //
    }
}
