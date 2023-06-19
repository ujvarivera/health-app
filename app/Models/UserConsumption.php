<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserConsumption extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quantity',
        'user_id',
        'nutrition_id',
        'created_at',
    ];

    public $timestamps = false;

    /**
     * Get the user the consumption belongs to.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Get the nutrition the consumption belongs to.
     */
    public function nutrition()
    {
        return $this->belongsTo(Nutrition::class, 'nutrition_id', 'id');
    }
}
