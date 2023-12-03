<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeLike;
use Illuminate\Http\Request;

class RecipeLikesController extends Controller
{
    // Delete specific like from recipe
    public function destroy(Request $request, $recipeId) {
        if (auth()->check()) {
            $likedByUser = RecipeLike::where('recipe_id', $recipeId)->where('user_id', auth()->user()->id);
            $likedByUser->delete();
                
            $recipe = Recipe::where('id', $recipeId)->with('images', 'likes')->first();

            return response()->json($recipe);
        }
    }
    
    // Store likes
    public function store(Request $request)
    {
        if (auth()->check()) {
            RecipeLike::firstOrCreate([
                'recipe_id' => $request->recipeId,
                'user_id' => auth()->user()->id,
            ]);

            $recipe = Recipe::where('id', $request->recipeId)
                                ->with('images', 'likes')
                                ->first();

            return response()->json($recipe);
        }
    }
}
