<?php

namespace App\Http\Controllers;

use App\Models\FactureReparation;
use App\Models\Client;
use App\Models\Reparation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactureReparationController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureReparations/Index', [
            'factures' => FactureReparation::with(['client', 'reparation'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('FactureReparations/Create', [
            'clients' => Client::all(),
            'reparations' => Reparation::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'montant_facture_repar' => 'required|numeric|min:0',
            'date_facture_repar' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_repar' => 'required|exists:reparations,id_repar'
        ]);

        FactureReparation::create($request->all());

        return redirect()->route('facture-reparations.index')->with('success', 'Facture created successfully!');
    }

    public function edit(FactureReparation $factureReparation)
    {
        return Inertia::render('FactureReparations/Edit', [
            'facture' => $factureReparation,
            'clients' => Client::all(),
            'reparations' => Reparation::all()
        ]);
    }

    public function update(Request $request, FactureReparation $factureReparation)
    {
        $request->validate([
            'montant_facture_repar' => 'required|numeric|min:0',
            'date_facture_repar' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_repar' => 'required|exists:reparations,id_repar'
        ]);

        $factureReparation->update($request->all());

        return redirect()->route('facture-reparations.index')->with('success', 'Facture updated successfully!');
    }

    public function destroy(FactureReparation $factureReparation)
    {
        $factureReparation->delete();
        return redirect()->route('facture-reparations.index')->with('success', 'Facture deleted successfully!');
    }
}
