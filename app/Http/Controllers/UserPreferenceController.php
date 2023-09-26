<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'preferenceProp' => 'required',
            'preferenceValue' => 'required',
        ]);

        UserPreference::create([
            'user_id' => auth()->user()->id,
            'class' => 'exercise',
            'prop' => $request->get('preferenceProp'),
            'value' => $request->get('preferenceValue')
        ]);

        return redirect()->route('exercises.index')->with('success', 'Preference added successfully!');
    }

    public function edit()
    {
        $preferences = auth()->user()->preferences;
        $exerciseProperties = ['body_part', 'equipment', 'target'];
        $bodyParts = array_values(Exercise::pluck('body_part')->unique()->toArray());
        $equipments = array_values(Exercise::pluck('equipment')->unique()->toArray());
        $targets = array_values(Exercise::pluck('target')->unique()->toArray());

        return inertia('UserPreferences/Edit', compact('preferences', 'exerciseProperties', 'bodyParts', 'equipments', 'targets'));
    }

    public function destroy(UserPreference $preference)
    {
        // dd(json_decode($preference));
        $preference->delete();

        return redirect()->route('recommendation.edit')->with('success', 'Preference deleted successfully!');
    }
}
