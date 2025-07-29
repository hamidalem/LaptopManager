<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparateur extends Model
{
    use HasFactory;

    protected $table = 'reparateurs';
    protected $primaryKey = 'nom_rep';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'nom_rep',
        'num_tel_rep',
        'adresse_rep'
    ];
}
