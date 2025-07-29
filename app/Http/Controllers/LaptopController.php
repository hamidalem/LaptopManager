<?php

namespace App\Http\Controllers;

use App\Models\Laptop;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaptopController extends Controller
{
    public function index()
    {
        return Inertia::render('Laptops/Index', [
            'laptops' => Laptop::with('fournisseur')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Laptops/Create', [
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_lap' => 'required|string|max:255',
            'marque_lap' => 'required|string|max:255',
            'prix_achat_lap' => 'required|numeric|min:0',
            'prix_vente_lap' => 'required|numeric|min:0',
            'date_achat_lap' => 'nullable|date',
            'quantite_lap' => 'required|integer|min:0',
            'desc_lap' => 'nullable|string',
            'nom_fourn' => 'required|exists:fournisseurs,nom_fourn'
            // 'etat_lap' is no longer validated here as it defaults to 'disponible' in the DB
        ]);

        Laptop::create($request->all());

        return redirect()->route('laptops.index')->with('success', 'Laptop created successfully!');
    }

    public function edit(Laptop $laptop)
    {
        return Inertia::render('Laptops/Edit', [
            'laptop' => $laptop,
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function update(Request $request, Laptop $laptop)
    {
        $request->validate([
            'nom_lap' => 'required|string|max:255',
            'marque_lap' => 'required|string|max:255',
            'prix_achat_lap' => 'required|numeric|min:0',
            'prix_vente_lap' => 'required|numeric|min:0',
            'date_achat_lap' => 'nullable|date',
            'quantite_lap' => 'required|integer|min:0',
            'etat_lap' => 'required|in:disponible,vendue', // Added validation for etat_lap
            'desc_lap' => 'nullable|string',
            'nom_fourn' => 'required|exists:fournisseurs,nom_fourn'
        ]);

        $laptop->update($request->all());

        return redirect()->route('laptops.index')->with('success', 'Laptop updated successfully!');
    }

    public function destroy(Laptop $laptop)
    {
        $laptop->delete();
        return redirect()->route('laptops.index')->with('success', 'Laptop deleted successfully!');
    }
}
