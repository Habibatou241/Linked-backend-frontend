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
    public function merge(Request $request): JsonResponse
    {
        $request->validate([
            'dataset_ids'   => 'required|array|min:2',
            'dataset_ids.*' => 'exists:datasets,id',
            'name'          => 'required|string|max:255',
            'project_id'    => 'required|exists:projects,id',
        ]);

        $datasets   = Dataset::whereIn('id', $request->dataset_ids)
                              ->where('user_id', auth()->id())
                              ->get();
        $mergedData = [];

        foreach ($datasets as $ds) {
            // construit le chemin absolu correct
            $path = storage_path('app/' . $ds->file_path);

            if (! file_exists($path)) {
                return response()->json([
                    'status'  => 'error',
                    'message' => "Fichier introuvable : $path"
                ], 422);
            }

            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            if ($ext === 'csv') {
                $rows = array_map('str_getcsv', file($path));
            } else {
                $sheet = IOFactory::load($path)->getActiveSheet()->toArray();
                $rows  = $sheet;
            }

            if (empty($mergedData)) {
                $mergedData = $rows;
            } else {
                $mergedData = array_merge($mergedData, array_slice($rows, 1));
            }
        }

        // sauvegarde dans private/datasets
        $fileName = Str::random(40) . '_merged.csv';
        $relPath  = "private/datasets/{$fileName}";
        Storage::makeDirectory('private/datasets');
        $fullPath = storage_path("app/{$relPath}");

        $csv = Writer::createFromPath($fullPath, 'w+');
        foreach ($mergedData as $r) {
            $csv->insertOne($r);
        }

        $new = Dataset::create([
            'user_id'           => auth()->id(),
            'project_id'        => $request->project_id,
            'name'              => $request->name,
            'original_filename' => $fileName,
            'file_path'         => $relPath,
            'file_type'         => 'csv',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Jeux fusionnés avec succès.',
            'dataset' => $new,
        ], 201);
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
}


