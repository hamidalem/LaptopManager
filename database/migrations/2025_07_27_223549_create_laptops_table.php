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
        Schema::create('laptops', function (Blueprint $table) {
            $table->id('id_lap');
            $table->string('nom_lap');
            $table->string('marque_lap');
            $table->decimal('prix_achat_lap', 8, 2);
            $table->decimal('prix_vente_lap', 8, 2);
            $table->date('date_achat_lap')->nullable();
            $table->integer('quantite_lap');
            $table->enum('etat_lap', ['disponible', 'vendue'])->default('disponible');
            $table->text('desc_lap')->nullable();
            $table->string('nom_fourn');
            $table->foreign('nom_fourn')->references('nom_fourn')->on('fournisseurs')->onDelete('restrict');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
