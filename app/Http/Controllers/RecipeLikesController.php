<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeLike;
use Illuminate\Http\Request;

class RecipeLikesController extends Controller
{
    // Store likes
    public function store(Recipe $recipe)
    {
        RecipeLike::create([
            'recipe_id' => $recipe->id,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back();
    }

    // delete like from recipe
    public function destroy(Recipe $recipe) {
        $likedByUser = RecipeLike::where('recipe_id', $recipe->id)->where('user_id', auth()->user()->id);
        $likedByUser->delete();

        return redirect()->back();
    }
}
