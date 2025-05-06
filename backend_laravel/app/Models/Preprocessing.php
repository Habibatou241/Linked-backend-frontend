<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preprocessing extends Model
{
    use HasFactory;

    /**
     * Les attributs modifiables en masse.
     *
     * @var array
     */
    protected $fillable = [
        'dataset_id',   // ID du dataset d'origine
        'name',         // Nom du prétraitement (ex: "Remplissage des valeurs manquantes")
        'file_path',    // Chemin du fichier résultant après prétraitement
        'summary',      // Résumé/statistiques du prétraitement (JSON)
    ];

    /**
     * Cast automatique des attributs.
     *
     * @var array
     */
    protected $casts = [
        'summary' => 'array', // On convertit automatiquement le champ 'summary' en tableau PHP
    ];

    /**
     * Relation : un prétraitement appartient à un dataset.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function dataset()
    {
        return $this->belongsTo(Dataset::class);
    }

    /**
     * Relation : un prétraitement peut être lié à une analyse (analyse exploratoire ou prédictive).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function analysis()
    {
        return $this->hasOne(Analysis::class);
    }
}
