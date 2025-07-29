<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';
    protected $primaryKey = 'id_art';
    public $timestamps = false;

    protected $fillable = [
        'nom_art',
        'desc_art',
        'marque_art',
        'prix_achat_art',
        'prix_vente_art',
        'date_achat_art',
        'etat_art',
        'quantite_art',
        'nom_fourn'
    ];

    protected $casts = [
        'date_achat_art' => 'date',
        'prix_achat_art' => 'decimal:2',
        'prix_vente_art' => 'decimal:2',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'nom_fourn', 'nom_fourn');
    }
}
