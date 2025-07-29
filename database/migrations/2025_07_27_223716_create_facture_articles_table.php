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
        Schema::create('facture_articles', function (Blueprint $table) {
            $table->id('id_facture_art');
            $table->decimal('montant_facture_art', 10, 2);
            $table->date('date_facture_art')->nullable();
            $table->string('nom_client');
            $table->foreign('nom_client')->references('nom_client')->on('clients')->onDelete('restrict');
            $table->foreignId('id_art')->constrained('articles', 'id_art')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facture_articles');
    }
};
