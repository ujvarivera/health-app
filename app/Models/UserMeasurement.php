<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserMeasurement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'measurement_type_id',
        'user_id',
        'value',
    ];

    /**
     * Get the measurement type name.
     */
    public function measurementTypeName(): BelongsTo
    {
        return $this->belongsTo(MeasurementType::class, 'measurement_type_id', 'id');
    }
}
