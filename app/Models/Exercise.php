<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function scopeFilter($query, array $filters) {
        if ($filters['body_part'] ?? false) {
            $query->where('body_part', 'like', '%' . $filters['body_part']  . '%');
        }
        if ($filters['equipment'] ?? false) {
            $query->where('equipment', 'like', '%' . $filters['equipment']  . '%');
        }
        if ($filters['target'] ?? false) {
            $query->where('target', 'like', '%' . $filters['target']  . '%');
        }
    }
    
}
