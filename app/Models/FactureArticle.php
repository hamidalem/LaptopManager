<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactureArticle extends Model
{
    use HasFactory;

    protected $table = 'facture_articles';
    protected $primaryKey = 'id_facture_art';
    public $timestamps = false;

    protected $fillable = [
        'montant_facture_art',
        'date_facture_art',
        'nom_client',
        'id_art'
    ];

    protected $casts = [
        'date_facture_art' => 'date',
        'montant_facture_art' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'nom_client', 'nom_client');
    }

    public function article()
    {
        return $this->belongsTo(Article::class, 'id_art', 'id_art');
    }
}
