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
        Schema::create('bmi_ranges', function (Blueprint $table) {
            $table->id();
            $table->string('status', 30);
            $table->float('lower', 3, 1)->nullable();
            $table->float('upper', 3, 1)->nullable();
            $table->string('classes', 40);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bmi_ranges');
    }
};
