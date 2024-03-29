<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the measurements of the user.
     */
    public function measurements()
    {
        return $this->hasMany(UserMeasurement::class, 'user_id', 'id');
    }

    /**
     * Get the consumptions of the user.
     */
    public function consumptions()
    {
        return $this->hasMany(UserConsumption::class, 'user_id', 'id');
    }

    /**
     * Get the goals of the user.
    */
    public function goals()
    {
        return $this->hasMany(UserGoal::class, 'user_id', 'id');
    }

    /**
     * Get the preferences of the user.
    */
    public function preferences()
    {
        return $this->hasMany(UserPreference::class, 'user_id', 'id');
    }

    /**
     * Get the  exercises of the user.
    */
    public function exercises()
    {
        //
    }

}
