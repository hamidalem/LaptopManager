<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laptop extends Model
{
    use HasFactory;

    protected $table = 'laptops';
    protected $primaryKey = 'id_lap';
    public $timestamps = false;

    protected $fillable = [
        'nom_lap',
        'marque_lap',
        'prix_achat_lap',
        'prix_vente_lap',
        'date_achat_lap',
        'etat_lap',
        'quantite_lap',
        'desc_lap',
        'nom_fourn'
    ];

    protected $casts = [
        'date_achat_lap' => 'date',
        'prix_achat_lap' => 'decimal:2',
        'prix_vente_lap' => 'decimal:2',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'nom_fourn', 'nom_fourn');
    }
}
