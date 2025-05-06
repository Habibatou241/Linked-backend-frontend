<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prediction extends Model
{
    protected $fillable = [
        'user_id',
        'preprocessing_id',
        'features',
        'target',
        'task',
        'best_model_name',
        'best_model_metrics',
        'all_models_comparison',
        'train_test_split',
    ];

    protected $casts = [
        'features' => 'array',
        'best_model_metrics' => 'array',
        'all_models_comparison' => 'array',
        'task' => 'string', // enum dans DB, casté string ici
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec le prétraitement
     */
    public function preprocessing(): BelongsTo
    {
        return $this->belongsTo(Preprocessing::class);
    }
}
