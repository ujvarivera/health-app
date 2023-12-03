<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->check()) {
            try {
                $preferences = auth()->user()->preferences->where('class', 'exercise');
                //$preference = auth()->user()->preferences->where('class', 'exercise')->first();
                $length = count($preferences);
                if ($length > 0 ) {
                    $random = random_int(0, $length-1);
    
                    $recommendedExercises = [];
                    $recommendedExercises = Exercise::where(
                        $preferences[$random]->prop, $preferences[$random]->value
                    )->inRandomOrder()->limit(5)->get();
                } else {
                    // random 5 exercises
                    $recommendedExercises = Exercise::inRandomOrder()->limit(5)->get();
                }
        
            } catch (\Exception $e) {
                // random 5 exercises
                $recommendedExercises = Exercise::inRandomOrder()->limit(5)->get();
            }

        } else {
            $recommendedExercises = Exercise::inRandomOrder()->limit(5)->get();
        }

        $filters = request(['body_part', 'target', 'equipment']);
        $exercises = Exercise::filter($filters)->get();
        // dd($exercises);
        return Inertia::render('Exercises/Index', compact('exercises', 'recommendedExercises'));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
        return Inertia::render('Exercises/Show', [
            'exercise' => $exercise
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exercise $exercise)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exercise $exercise)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
        //
    }
}
