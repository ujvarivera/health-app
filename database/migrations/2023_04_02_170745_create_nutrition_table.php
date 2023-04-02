<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nutrition', function (Blueprint $table) {
            $table->id();
            $table->string('name', 80);
            $table->string('category', 40)->nullable();
            $table->float('cal')->nullable();
            $table->float('fat_g')->nullable();
            $table->float('protein_g')->nullable();
            $table->float('carbohydrate_g')->nullable();
            $table->float('sugar_g')->nullable();
            $table->float('fiber_g')->nullable();
            $table->float('cholesterol_mg')->nullable();
            $table->float('saturated_fat_g')->nullable();
            $table->float('calcium_mg')->nullable();
            $table->float('iron_mg')->nullable();
            $table->float('potassium_mg')->nullable();
            $table->float('magnesium_mg')->nullable();
            $table->float('vitamin_c_mg')->nullable();
            $table->float('vitamin_b12_mcg')->nullable();
            $table->float('vitamin_d_mcg')->nullable();
            $table->float('vitamin_e_mg')->nullable();
            $table->float('net_carbs_g')->nullable();
            $table->float('water_g')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition');
    }
};
