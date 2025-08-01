<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactureReparation extends Model
{
    use HasFactory;

    protected $table = 'facture_reparations';
    protected $primaryKey = 'id_facture_repar';
    public $timestamps = false;

    protected $fillable = [
        'montant_facture_repar',
        'date_facture_repar',
        'nom_client',
        'id_repar'
    ];

    protected $casts = [
        'date_facture_repar' => 'date',
        'montant_facture_repar' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'nom_client', 'nom_client');
    }


    public function reparation()
    {
        return $this->belongsTo(Reparation::class, 'id_repar', 'id_repar');
    }

}
