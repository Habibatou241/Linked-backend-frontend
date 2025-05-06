<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;
use App\Models\Preprocessing;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class PredictionController extends Controller
{
    /**
     * Force toutes les chaînes d’un tableau à l’UTF-8 valide.
     */
    protected function utf8ize($mixed)
    {
        if (is_array($mixed)) {
            foreach ($mixed as $key => $value) {
                // on reencode aussi la clé si nécessaire
                unset($mixed[$key]);
                $newKey = is_string($key) ? utf8_encode($key) : $key;
                $mixed[$newKey] = $this->utf8ize($value);
            }
        } elseif (is_string($mixed)) {
            return utf8_encode($mixed);
        }
        return $mixed;
    }

    public function predict(Request $request, int $preprocessing_id): JsonResponse
    {
        $request->validate([
            'features'    => 'required|array|min:1',
            'target'      => 'required|string',
            'task'        => 'required|in:classification,regression',
            'split_ratio' => 'required|numeric|between:0.1,0.9',
        ]);

        $preprocessing = Preprocessing::find($preprocessing_id);
        if (!$preprocessing) {
            return response()->json(['error' => 'Prétraitement introuvable'], 404);
        }

        // résolution du chemin
        $fp = $preprocessing->file_path;
        if (Str::startsWith($fp, storage_path())) {
            $filePath = $fp;
        } else {
            $filePath = storage_path('app/private/' . ltrim($fp, '/'));
        }
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'Fichier prétraité introuvable.'], 404);
        }

        // appel Python
        $scriptPath = base_path('ml-python/predict.py');
        $process = new Process([
            'python3',
            $scriptPath,
            $filePath,
            json_encode($request->input('features'), JSON_UNESCAPED_UNICODE),
            $request->input('target'),
            $request->input('task'),
            $request->input('split_ratio'),
        ]);
        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json([
                'error'   => 'Erreur lors de l’exécution du script Python',
                'details' => $process->getErrorOutput(),
            ], 500);
        }

        // nettoyage de la sortie
        $raw   = $process->getOutput();
        $utf8  = mb_convert_encoding($raw, 'UTF-8', 'UTF-8');
        $clean = preg_replace('/[[:^print:]]/', '', $utf8);
        $data  = json_decode($clean, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json([
                'error'      => 'Erreur JSON: ' . json_last_error_msg(),
                'raw_output' => $clean,
            ], 500);
        }

        // on force tous les strings en UTF-8
        $data = $this->utf8ize($data);

        return response()
            ->json($data, 200, [], JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
    }
}
