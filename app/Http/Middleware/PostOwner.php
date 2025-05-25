<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PostOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $req, Closure $next): Response
    {
        // Find requested post, and check owner user id
        $post = $req->route('post');

        if ($post->user_id != Auth::user()->id) {
            return abort(403, 'You don\'t have permissions to perform this action');
        }

        return $next($req);
    }
}
