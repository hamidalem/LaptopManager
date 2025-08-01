<?php

namespace App\Http\Controllers;

use App\Models\FactureLaptop;
use App\Models\FactureReparation;
use App\Models\Client;
use App\Models\Reparation;
use Dompdf\Dompdf;
use Dompdf\Options;
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


    public function show(FactureReparation $factureReparation)
    {
        return Inertia::render('FactureReparations/Show', [
            'facture' => $factureReparation->load(['client', 'reparation'])
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

    public function exportPdf($id)
    {
        // Get the facture with related client and reparation
        $facture = FactureReparation::with(['client', 'reparation'])->findOrFail($id);

        // HTML content from your template
        $html = view('pdf.facture-reparation', compact('facture'))->render();

        // Setup Dompdf options
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $options->set('defaultFont', 'DejaVu Sans');

        // Instantiate Dompdf with options
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Generate the PDF file name
        $fileName = "facture-reparation-{$facture->id_facture_repar}.pdf";

        // Return the PDF as a download
        return $dompdf->stream($fileName, [
            'Attachment' => true // This will force download instead of displaying
        ]);
    }
}
