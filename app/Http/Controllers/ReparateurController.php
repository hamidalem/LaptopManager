<?php

namespace App\Http\Controllers;

use App\Models\Reparateur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReparateurController extends Controller
{
    public function index()
    {
        return Inertia::render('Reparateurs/Index', [
            'reparateurs' => Reparateur::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Reparateurs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_rep' => 'required|string|max:255|unique:reparateurs',
            'num_tel_rep' => 'required|string|max:20', // Changed to string validation
            'adresse_rep' => 'required|string|max:255',
        ]);

        Reparateur::create($request->all());

        return redirect()->route('reparateurs.index')->with('success', 'Reparateur created successfully!');
    }

    public function edit(Reparateur $reparateur)
    {
        return Inertia::render('Reparateurs/Edit', [
            'reparateur' => $reparateur
        ]);
    }

    public function update(Request $request, Reparateur $reparateur)
    {
        $request->validate([
            'nom_rep' => 'required|string|max:255|unique:reparateurs,nom_rep,'.$reparateur->nom_rep.',nom_rep',
            'num_tel_rep' => 'required|string|max:20', // Changed to string validation
            'adresse_rep' => 'required|string|max:255',
        ]);

        $reparateur->update($request->all());

        return redirect()->route('reparateurs.index')->with('success', 'Reparateur updated successfully!');
    }

    public function destroy(Reparateur $reparateur)
    {
        $reparateur->delete();

        return redirect()->route('reparateurs.index')->with('success', 'Reparateur deleted successfully!');
    }
}
