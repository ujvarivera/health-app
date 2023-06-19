<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'time_in_min',
        'difficulty',
        'quantity',
    ];

    /**
     * Get the images for the recipes.
     */
    public function images()
    {
        return $this->hasMany(RecipeImage::class, 'recipe_id', 'id');
    }

    /**
     * Get the comments for the recipes.
     */
    public function comments()
    {
        return $this->hasMany(RecipeComment::class, 'recipe_id', 'id');
    }

    /**
     * Get the likes for the recipes.
     */
    public function likes()
    {
        return $this->hasMany(RecipeLike::class, 'recipe_id', 'id');
    }

    /**
     * Get the ingredients for the recipes.
     */
    public function ingredients()
    {
        return $this->hasMany(RecipeIngredient::class, 'recipe_id', 'id');
    }

    /**
     * Get the user that owns the recipe.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
