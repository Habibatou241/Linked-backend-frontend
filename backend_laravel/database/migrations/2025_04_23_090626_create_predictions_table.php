<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('predictions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('preprocessing_id')->constrained()->onDelete('cascade');
        $table->json('features');
        $table->string('target');
        $table->enum('task', ['classification', 'regression']);
        $table->string('best_model_name');
        $table->json('best_model_metrics');
        $table->json('all_models_comparison');
        $table->string('train_test_split');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predictions');
    }
};
