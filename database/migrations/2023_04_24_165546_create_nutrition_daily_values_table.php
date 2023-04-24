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
        Schema::create('nutrition_daily_values', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->unique();
            $table->string('category', 30)->nullable();
            $table->float('dv'); // daily value
            $table->char('unit', 3);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_daily_values');
    }
};
