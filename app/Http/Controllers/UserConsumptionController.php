<?php

namespace App\Http\Controllers;

use App\Models\UserConsumption;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserConsumptionController extends Controller
{
    public function store(Request $request) {
        if (auth()->check()) {
            UserConsumption::create([
                'quantity' => $request->quantity,
                'nutrition_id' => $request->nutrition_id,
                'user_id' => auth()->user()->id,
                'created_at' => Carbon::now(),
            ]);

            return response()->json(['message' => 'Added Successfully']);
        }
    }
}
