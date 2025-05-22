<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    protected $fillable = [
        'name',
    ];


    // M2M for posts that belong to the category
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }
}
