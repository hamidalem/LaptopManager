<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facture_laptops', function (Blueprint $table) {
            $table->id('id_facture_lap');
            $table->decimal('montant_facture_lap', 10, 2);
            $table->date('date_facture_lap');
            $table->string('nom_client');
            $table->foreign('nom_client')->references('nom_client')->on('clients')->onDelete('restrict');
            $table->foreignId('id_lap')->constrained('laptops', 'id_lap')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facture_laptops');
    }
};
