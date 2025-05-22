<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'post_id',
        'comment',
    ];

    // Belongs to user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Belongs to post
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

}
