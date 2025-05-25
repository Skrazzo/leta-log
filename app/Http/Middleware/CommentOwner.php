<?php

namespace App\Http\Middleware;

use App\Models\Comment;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CommentOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $req, Closure $next): Response
    {
        // Find requested comment, and check owner user id
        $comment = $req->route('comment');

        if ($comment->user_id != Auth::user()->id) {
            return abort(403, 'You don\'t have permissions to perform this action');
        }

        return $next($req);
    }
}
