<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Dataset extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_id',
        'name',
        'original_filename',
        'file_path',
        'file_type',
    ];

    protected $appends = ['full_path', 'public_name'];

    /**
     * Retourne le chemin absolu vers le fichier sur le disque.
     */
    public function getFullPathAttribute(): string
    {
        return storage_path('app/' . $this->file_path);
    }

    /**
     * Retourne un nom de fichier lisible avec l'extension.
     */
    public function getPublicNameAttribute(): string
    {
        return $this->name . '.' . $this->file_type;
    }

    /**
     * Vérifie si le fichier existe réellement sur le disque.
     */
    public function existsOnDisk(): bool
    {
        return file_exists($this->full_path);
    }

    /**
     * Define the relationship with the project.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
