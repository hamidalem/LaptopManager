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
        Schema::create('reparations', function (Blueprint $table) {
            $table->id('id_repar');
            $table->string('nom_repar');
            $table->text('desc_repar')->nullable();
            $table->string('nom_rep');
            $table->enum('etat_repar', ['en attente', 'termine', 'annule'])->default('en attente');
            $table->foreign('nom_rep')->references('nom_rep')->on('reparateurs')->onDelete('restrict');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reparations');
    }
};
