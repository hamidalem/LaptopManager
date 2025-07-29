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
        Schema::create('facture_reparations', function (Blueprint $table) {
            $table->id('id_facture_repar');
            $table->decimal('montant_facture_repar', 10, 2);
            $table->date('date_facture_repar')->nullable();
            $table->string('nom_client');
            $table->foreign('nom_client')->references('nom_client')->on('clients')->onDelete('restrict');
            $table->foreignId('id_repar')->constrained('reparations', 'id_repar')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facture_reparations');
    }
};
