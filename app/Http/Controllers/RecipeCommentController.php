<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeComment;
use Illuminate\Http\Request;

class RecipeCommentController extends Controller
{
    /* Store comment for a specific recipe */
    public function store(Request $request)
    {
        if (auth()->check()) {
            $request->validate([
                'comment' => 'required',
            ]);
            
            RecipeComment::create([
                'comment' => $request->comment,
                'recipe_id' => $request->recipeId,
                'user_id' => auth()->user()->id,
            ]);
            
            $recipe = Recipe::where('id', $request->recipeId)->with('images', 'comments', 'comments.user', 'ingredients')->first();

            return response()->json($recipe);
        }
    }

    /* Delete comment */
    public function destroy(Request $request, $commentId)
    {
        if (auth()->check()) {
            $comment = RecipeComment::where('id', $commentId)->first();
            $recipe = $comment->recipe;
            if(auth()->user()->id === $comment->user_id) {
                $comment->delete();
                $recipe->load('images', 'comments', 'comments.user', 'ingredients');
            }
            return response()->json($recipe);
        }
    }
}
