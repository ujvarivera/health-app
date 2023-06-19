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
        Schema::create('user_consumptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('nutrition_id');
            $table->float('quantity')->default(1); // 1 means 100 g
            $table->date('created_at');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('nutrition_id')->references('id')->on('nutrition')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_consumptions');
    }
};
