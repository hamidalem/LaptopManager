<?php

namespace App\Http\Controllers;

use App\Models\Reparation;
use App\Models\Reparateur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReparationController extends Controller
{
    public function index()
    {
        return Inertia::render('Reparations/Index', [
            'reparations' => Reparation::with('reparateur')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Reparations/Create', [
            'reparateurs' => Reparateur::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_repar' => 'required|string|max:255',
            'desc_repar' => 'nullable|string',
            'nom_rep' => 'required|exists:reparateurs,nom_rep'
            // 'etat_repar' is not validated here as it defaults to 'en attente' in the DB
        ]);

        Reparation::create($request->all());

        return redirect()->route('reparations.index')->with('success', 'Reparation created successfully!');
    }

    public function edit(Reparation $reparation)
    {
        return Inertia::render('Reparations/Edit', [
            'reparation' => $reparation,
            'reparateurs' => Reparateur::all()
        ]);
    }

    public function update(Request $request, Reparation $reparation)
    {
        $request->validate([
            'nom_repar' => 'required|string|max:255',
            'desc_repar' => 'nullable|string',
            'nom_rep' => 'required|exists:reparateurs,nom_rep',
            'etat_repar' => 'required|in:en attente,termine,annule' // Added validation for etat_repar
        ]);

        $reparation->update($request->all());

        return redirect()->route('reparations.index')->with('success', 'Reparation updated successfully!');
    }

    public function destroy(Reparation $reparation)
    {
        $reparation->delete();
        return redirect()->route('reparations.index')->with('success', 'Reparation deleted successfully!');
    }
}
