<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeComment;
use Illuminate\Http\Request;

class RecipeCommentController extends Controller
{
    /* Store comment for a specific recipe */
    public function store(Request $request, Recipe $recipe)
    {
        $request->validate([
            'comment' => 'required|min:1',
        ]);

        RecipeComment::create([
            'comment' => $request->comment,
            'recipe_id' => $recipe->id,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back();
    }

    /* Delete comment */
    public function destroy($commentId)
    {
        $comment = RecipeComment::where('id', $commentId);
        $comment->delete();

        return redirect()->back();
    }
}
