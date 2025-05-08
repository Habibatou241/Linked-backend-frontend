<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dataset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\Csv\Writer;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Auth;


class DataImportController extends Controller
{
    /**
     * Upload d’un fichier unique.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file'       => 'required|file|mimes:csv,txt,xlsx|max:10240',
            'name'       => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
        ]);

        return $this->storeFile($request->file('file'), $request->name, $request->project_id);
    }

    /**
     * Upload de plusieurs fichiers.
     */
    public function importMultipleFiles(Request $request): JsonResponse
    {
        $request->validate([
            'files'      => 'required|array',
            'files.*'    => 'file|mimes:csv,txt,xlsx|max:10240',
            'project_id' => 'required|exists:projects,id',
        ]);

        $datasets = [];
        foreach ($request->file('files') as $file) {
            $name   = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $resp   = $this->storeFile($file, $name, $request->project_id);
            if ($resp->getStatusCode() === 201) {
                $datasets[] = $resp->getData()->dataset;
            }
        }

        return response()->json([
            'status'   => 'success',
            'message'  => 'Fichiers importés avec succès.',
            'datasets' => $datasets,
        ], 201);
    }

    /**
     * Fusionne plusieurs jeux en un seul CSV.
     */
    public function merge(Request $request)
{
    $request->validate([
        'dataset_ids' => 'required|array|min:2',
        'dataset_ids.*' => 'exists:datasets,id',
        'project_id' => 'required|exists:projects,id',
    ]);

    $user = Auth::user();
    $mergedContent = '';
    $headersAdded = false;
    $headerReference = null;

    foreach ($request->dataset_ids as $id) {
        $dataset = Dataset::find($id);

        // Sécurité : vérifier que le dataset appartient à l'utilisateur
        if (!$dataset || $dataset->user_id !== $user->id) {
            return response()->json(['error' => "Dataset #$id non autorisé ou introuvable."], 403);
        }

        $path = storage_path('app/private/' . $dataset->file_path);

        // Vérification de l'existence du fichier
        if (!file_exists($path)) {
            return response()->json(['error' => "Fichier manquant pour le dataset #$id."], 404);
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if (empty($lines)) {
            continue; // Ignore fichiers vides
        }

        $header = array_shift($lines); // En-tête

        if (!$headersAdded) {
            $mergedContent .= $header . "\n";
            $headersAdded = true;
            $headerReference = $header;
        } else {
            if ($header !== $headerReference) {
                return response()->json([
                    'error' => "Les en-têtes des fichiers ne correspondent pas (dataset #$id)."
                ], 422);
            }
        }

        $mergedContent .= implode("\n", $lines) . "\n";
    }

    if (trim($mergedContent) === '') {
        return response()->json(['error' => 'Aucune donnée à fusionner.'], 422);
    }

    $mergedFileName = 'merged_' . time() . '.csv';
    $mergedFilePath = 'datasets/' . $mergedFileName;

    Storage::disk('private')->put($mergedFilePath, $mergedContent);

    $mergedDataset = Dataset::create([
        'user_id' => $user->id,
        'project_id' => $request->project_id,
        'file_name' => $mergedFileName,
        'file_path' => $mergedFilePath,
    ]);

    return response()->json([
        'message' => 'Fichiers fusionnés avec succès',
        'dataset' => $mergedDataset
    ]);
}


    /**
     * Liste les datasets de l'utilisateur.
     */
    public function list(Request $request): JsonResponse
    {
        $datasets = Dataset::where('project_id', $request->project_id)
                          ->where('user_id', auth()->id())
                          ->get();
    
        return response()->json([
            'status' => 'success',
            'datasets' => $datasets
        ]);
    }

    /**
     * Stocke un fichier et crée l'enregistrement.
     */
    private function storeFile($file, string $name, int $projectId): JsonResponse
    {
        // stocke physiquement dans storage/app/private/datasets
        $relPath = $file->store('private/datasets');
        if (! $relPath) {
            return response()->json(['status'=>'error','message'=>'Enregistrement échoué.'],500);
        }

        $dataset = Dataset::create([
            'user_id' => auth()->id(),
            'project_id' => $projectId,
            'name' => $name,
            'original_filename' => $file->getClientOriginalName(),
            'file_path' => $relPath,
            'file_type' => $file->getClientOriginalExtension(),
        ]);

        return response()->json(['status'=>'success','dataset'=>$dataset],201);
    }

    public function destroy($id)
    {
        $dataset = Dataset::findOrFail($id);

        // Supprimer le fichier du stockage
        if (Storage::disk('private')->exists($dataset->file_path)) {
            Storage::disk('private')->delete($dataset->file_path);
        }

        $dataset->delete();

        return response()->json([
            'message' => 'Dataset supprimé avec succès'
        ]);
    }
}