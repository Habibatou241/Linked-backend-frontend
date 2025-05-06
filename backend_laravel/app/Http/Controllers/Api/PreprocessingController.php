<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Preprocessing;
use App\Models\Dataset;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class PreprocessingController extends Controller
{
    public function applyPreprocessing(Request $request, int $dataset_id): JsonResponse
    {
        $request->validate([
            'preprocessings'          => 'required|array|min:1',
            'preprocessings.*.type'   => 'required|string',
            'preprocessings.*.method' => 'nullable|string',
        ]);

        $ds = Dataset::where('id', $dataset_id)
                     ->where('user_id', auth()->id())
                     ->first();
        if (! $ds) {
            return response()->json(['status'=>'error','message'=>'Dataset not found'],404);
        }

        // CHEMIN DU CSV ORIGINE (relative en BDD)
        $in = storage_path('app/'.$ds->file_path);
        Log::debug('[PREPROCESSING] Input: '.$in);
        if (! file_exists($in)) {
            return response()->json([
                'status'=>'error',
                'message'=>"Fichier introuvable : $in"
            ],404);
        }

        try {
            $py    = base_path('ml_python/venv/Scripts/python.exe');
            $script= base_path('ml_python/preprocessing_script.py');
            $steps = array_map(function($s){
                return array_filter([
                    'type'=>$s['type'],
                    'method'=>$s['method'] ?? null
                ]);
            }, $request->preprocessings);

            $cmd = [
                $py, $script,
                $in,
                json_encode($steps, JSON_UNESCAPED_UNICODE)
            ];
            Log::info('[PREPROCESSING] Running: '.implode(' ',$cmd));

            $p = new Process($cmd);
            $p->run();
            if (! $p->isSuccessful()) {
                Log::error('[PREPROCESSING] STDERR: '.$p->getErrorOutput());
                throw new ProcessFailedException($p);
            }

            $out    = json_decode($p->getOutput(), true);
            if (! isset($out['file_path'], $out['summary'])) {
                Log::error('[PREPROCESSING] Bad JSON: '.$p->getOutput());
                return response()->json(['status'=>'error','message'=>'Invalid script output'],500);
            }

            // Extraction du chemin relatif sous storage/app
            $absNew = $out['file_path'];
            $base   = storage_path('app').DIRECTORY_SEPARATOR;
            $rel    = str_replace('\\','/', Str::after($absNew, $base));

            $rec = Preprocessing::create([
                'dataset_id'=> $ds->id,
                'name'      => 'Preprocessing_'.now()->format('Ymd_His'),
                'file_path' => $rel,              // e.g. "private/datasets/xxx_preprocessed.csv"
                'summary'   => $out['summary'],
            ]);

            return response()->json([
                'status'=>'success',
                'preprocessing'=>$rec
            ],201);

        } catch (\Throwable $e) {
            Log::error('[PREPROCESSING] '.$e->getMessage());
            return response()->json([
                'status'=>'error',
                'message'=>'An error occurred during preprocessing.'
            ],500);
        }
    }
}
