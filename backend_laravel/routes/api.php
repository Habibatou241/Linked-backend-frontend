<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\DataImportController;

Route::middleware(['api'])->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'Connected successfully!']);
    });
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected project routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::get('/projects/{id}/details', [ProjectController::class, 'show']);
        Route::get('/datasets', [DataImportController::class, 'list']);
    });
});
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    Route::post('/datasets/upload', [DataImportController::class, 'upload']);
});