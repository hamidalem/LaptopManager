<?php

namespace App\Http\Controllers;

use App\Models\FactureLaptop;
use App\Models\Client;
use App\Models\Laptop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactureLaptopController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureLaptops/Index', [
            'factures' => FactureLaptop::with(['client', 'laptop'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('FactureLaptops/Create', [
            'clients' => Client::all(),
            'laptops' => Laptop::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'montant_facture_lap' => 'required|numeric|min:0',
            'date_facture_lap' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_lap' => 'required|exists:laptops,id_lap'
        ]);

        FactureLaptop::create($request->all());

        return redirect()->route('facture-laptops.index')->with('success', 'Facture created successfully!');
    }

    public function edit(FactureLaptop $factureLaptop)
    {
        return Inertia::render('FactureLaptops/Edit', [
            'facture' => $factureLaptop,
            'clients' => Client::all(),
            'laptops' => Laptop::all()
        ]);
    }

    public function update(Request $request, FactureLaptop $factureLaptop)
    {
        $request->validate([
            'montant_facture_lap' => 'required|numeric|min:0',
            'date_facture_lap' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_lap' => 'required|exists:laptops,id_lap'
        ]);

        $factureLaptop->update($request->all());

        return redirect()->route('facture-laptops.index')->with('success', 'Facture updated successfully!');
    }

    public function destroy(FactureLaptop $factureLaptop)
    {
        $factureLaptop->delete();
        return redirect()->route('facture-laptops.index')->with('success', 'Facture deleted successfully!');
    }

    public function getLaptopPrice($id)
    {
        $laptop = Laptop::findOrFail($id);
        return response()->json(['prix_vente_lap' => $laptop->prix_vente_lap]);
    }
}


