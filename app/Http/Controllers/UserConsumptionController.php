<?php

namespace App\Http\Controllers;

use App\Models\UserConsumption;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserConsumptionController extends Controller
{
    public function index()
    {
        // $consumptions = auth()->user()->consumptions->groupBy('created_at');
        // $consumptions = auth()->user()->consumptions->sortByDesc('created_at');
        $consumptions = UserConsumption::where('user_id', auth()->user()->id)->with('nutrition')->orderBy('created_at', 'desc')->get();
        $dates = $consumptions->pluck('created_at');
        //dd(json_decode($consumptions));
        // dd($dates);
        return inertia('Consumption/Index', compact('consumptions', 'dates'));
    }

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
