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

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // User routes
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // Project routes
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::get('/projects/{id}/details', [ProjectController::class, 'show']);
        Route::put('/projects/{id}', [ProjectController::class, 'update']);
        Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
        
        // Dataset routes
        Route::get('/datasets', [DataImportController::class, 'list']);
        Route::post('/datasets/upload', [DataImportController::class, 'upload']);
        Route::post('/datasets/merge', [DataImportController::class, 'merge']);
        Route::delete('/datasets/{id}', [DataImportController::class, 'destroy']);
        
        // Admin only routes
        Route::middleware(['role:admin'])->group(function () {
            Route::get('/admin/users', [AuthController::class, 'listUsers']);
            Route::put('/admin/users/{user}', [AuthController::class, 'updateUser']);
            Route::delete('/admin/users/{user}', [AuthController::class, 'deleteUser']);
        });
    });
});
 