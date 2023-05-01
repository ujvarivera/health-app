<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeImage;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $csrfToken = csrf_token();
        $recipes = Recipe::with('images', 'likes')->get();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes,
            // 'csrfToken' => $csrfToken,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'recipeName' => 'required',
            'ingredients' => 'required',
            'description' => 'required|max:255',
            'time' => 'required',
            'difficulty' => 'required|min:0|max:5',
            'quantity' => 'required|max:10',
            'images' => 'required' // |mimes:jpeg,jpg,png
        ]);

        // Create the recipe
        $recipe = Recipe::create([
            'name' => $request->recipeName,
            'description' => $request->description,
            'time_in_min' => $request->time,
            'difficulty' => $request->difficulty,
            'quantity' => $request->quantity,
            'user_id' => auth()->user()->id,
        ]);

        // Add images
        foreach ($request->images as $img) {
            $storedPath = Storage::disk('public')->put('recipes', $img);
            RecipeImage::create([
                'recipe_id' => $recipe->id,
                'image' => $storedPath // image path
            ]);
        }

        // Add ingredients
        $ingredients = $request->ingredients;
        $ingredientsList = explode(',', $ingredients);
        foreach ($ingredientsList as $ingredient) {
            if (trim($ingredient) != "") {                
                RecipeIngredient::create([
                    'recipe_id' => $recipe->id,
                    'ingredient' => trim($ingredient),
                ]);
            }
        }

        return redirect()->route('recipes.index')->with('success', 'Recipe added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        // dd(json_decode($recipe->load('images', 'comments', 'comments.user')));
        // dd($recipe->images);
        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe->load('images', 'comments', 'comments.user', 'ingredients')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        //
    }
}
