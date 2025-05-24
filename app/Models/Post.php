<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'text',
    ];


    // M2M relationship
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    // Many comments
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // Belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
