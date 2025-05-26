<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Comment extends Model
{
    use HasFactory;

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

    protected $appends = ['created_at_diff'];

    public function getCreatedAtDiffAttribute(): ?string
    {
        if ($this->created_at) {
            // diffForHumans() provides output like "1 hour ago", "2 days ago"
            return $this->created_at->diffForHumans();
        }
        return null;
    }
}
