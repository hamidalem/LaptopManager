<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FournisseurController extends Controller
{
    public function index()
    {
        return Inertia::render('Fournisseurs/Index', [
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Fournisseurs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_fourn' => 'required|string|max:255|unique:fournisseurs',
            'num_tel_fourn' => 'required|string|max:20', // Changed to string validation
            'adresse_fourn' => 'required|string|max:255',
        ]);

        Fournisseur::create($request->all());

        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur created successfully!');
    }

    public function edit(Fournisseur $fournisseur)
    {
        return Inertia::render('Fournisseurs/Edit', [
            'fournisseur' => $fournisseur
        ]);
    }

    public function update(Request $request, Fournisseur $fournisseur)
    {
        $request->validate([
            'nom_fourn' => 'required|string|max:255|unique:fournisseurs,nom_fourn,'.$fournisseur->nom_fourn.',nom_fourn',
            'num_tel_fourn' => 'required|string|max:20', // Changed to string validation
            'adresse_fourn' => 'required|string|max:255',
        ]);

        $fournisseur->update($request->all());

        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur updated successfully!');
    }

    public function destroy(Fournisseur $fournisseur)
    {
        $fournisseur->delete();

        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur deleted successfully!');
    }
}
