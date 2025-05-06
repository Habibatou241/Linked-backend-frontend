<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceUtf8Encoding
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // On s’assure que c’est une réponse JSON
        if (str_contains($response->headers->get('Content-Type'), 'application/json')) {
            $response->headers->set('Content-Type', 'application/json; charset=UTF-8');
        }

        return $response;
    }
}
