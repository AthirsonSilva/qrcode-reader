<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScanModel extends Model
{
    use HasFactory;

    protected $table = 'scans';

    protected $fillable = [
        'data',
        'type'
    ];
}