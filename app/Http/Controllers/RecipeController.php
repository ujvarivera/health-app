<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeImage;
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
        $recipes = Recipe::with('images')->get();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes
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
        // dd(auth()->user()->id);
        // dd($request->all());
        $request->validate([
            'recipeName' => 'required',
            'description' => 'required|max:255',
            'time' => 'required',
            'difficulty' => 'required|min:0|max:5',
            'quantity' => 'required',
            'images' => 'required' // |mimes:jpeg,jpg,png
        ]);

        $recipe = Recipe::create([
            'name' => $request->recipeName,
            'description' => $request->description,
            'time_in_min' => $request->time,
            'difficulty' => $request->difficulty,
            'quantity' => $request->quantity,
            'user_id' => auth()->user()->id,
        ]);

        foreach ($request->images as $img) {
            // $filename = auth()->user()->id + Str::random(10);
            // $fileName = time() . '.' . $img->getClientOriginalExtension();
            $storedPath = Storage::disk('public')->put('recipes', $img);
            // $storedPath = $img->store('recipes/');
            // $path = $img->storeAs('images', Str::random(10) . '.jpg');
            // dd($stored);
            RecipeImage::create([
                'recipe_id' => $recipe->id,
                'image' => $storedPath // image path
            ]);
        }

        return redirect()->route('recipes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        // dd(json_decode($recipe->load('images', 'comments', 'comments.user')));
        // dd($recipe->images);
        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe->load('images', 'comments', 'comments.user')
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
