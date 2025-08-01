<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactureLaptop extends Model
{
    use HasFactory;

    protected $table = 'facture_laptops';
    protected $primaryKey = 'id_facture_lap';
    public $timestamps = false;

    protected $fillable = [
        'montant_facture_lap',
        'date_facture_lap',
        'nom_client',
        'id_lap'
    ];

    protected $casts = [
        'date_facture_lap' => 'date',
        'montant_facture_lap' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'nom_client', 'nom_client');
    }

    public function laptop()
    {
        return $this->belongsTo(Laptop::class, 'id_lap', 'id_lap');
    }


}
