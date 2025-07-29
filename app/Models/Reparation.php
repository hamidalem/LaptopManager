<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;

    protected $table = 'reparations';
    protected $primaryKey = 'id_repar';
    public $timestamps = false;

    protected $fillable = [
        'nom_repar',
        'desc_repar',
        'nom_rep',
        'etat_repar',
    ];

    public function reparateur()
    {
        return $this->belongsTo(Reparateur::class, 'nom_rep', 'nom_rep');
    }
}
