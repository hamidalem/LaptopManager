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
        Schema::create('articles', function (Blueprint $table) {
            $table->id('id_art');
            $table->string('nom_art');
            $table->text('desc_art')->nullable();
            $table->string('marque_art');
            $table->decimal('prix_achat_art', 8, 2);
            $table->decimal('prix_vente_art', 8, 2);
            $table->date('date_achat_art')->nullable();
            $table->enum('etat_art', ['disponible', 'vendue'])->default('disponible');
            $table->integer('quantite_art');
            $table->string('nom_fourn');
            $table->foreign('nom_fourn')->references('nom_fourn')->on('fournisseurs')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
