<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\ExerciseUserController;
use App\Http\Controllers\NutritionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeCommentController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeLikesController;
use App\Http\Controllers\UserGoalController;
use App\Http\Controllers\UserMeasurementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/nutrition', NutritionController::class)->only(['index', 'show']);

    Route::resource('/recipes', RecipeController::class)->except(['edit', 'update', 'destroy']);
    Route::delete('/recipes/comments/{comment}', [RecipeCommentController::class, 'destroy'])->name('recipe.comment.destroy');
    Route::post('/recipes/{recipe}/comments', [RecipeCommentController::class, 'store'])->name('recipe.comment.store');
    Route::post('/recipes/{recipe}/likes', [RecipeLikesController::class, 'store'])->name('recipe.likes.store');
    Route::delete('/recipes/{recipe}/likes', [RecipeLikesController::class, 'destroy'])->name('recipe.likes.destroy');
    
    Route::resource('/exercises', ExerciseController::class)->only(['index', 'show']);

    Route::resource('my-exercises', ExerciseUserController::class)->only(['store']);

    Route::resource('/measurements', UserMeasurementController::class)->only('index', 'create', 'store');

    Route::get('/goals', [UserGoalController::class, 'index'])->name('goals.index');
    Route::get('/goals/create', [UserGoalController::class, 'create'])->name('goals.create');
    Route::post('/goals', [UserGoalController::class, 'store'])->name('goals.store');
    Route::put('/goals/{goal}', [UserGoalController::class, 'update'])->name('goals.update');
});

require __DIR__.'/auth.php';
