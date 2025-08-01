<?php

namespace App\Http\Controllers;

use App\Models\FactureLaptop;
use App\Models\Client;
use App\Models\Laptop;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FactureLaptopController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureLaptops/Index', [
            'factures' => FactureLaptop::with(['client', 'laptop'])->get()
        ]);
    }

    public function show(FactureLaptop $factureLaptop)
    {
        return Inertia::render('FactureLaptops/Show', [
            'facture' => $factureLaptop->load(['client', 'laptop'])
        ]);
    }

    public function create()
    {
        return Inertia::render('FactureLaptops/Create', [
            'clients' => Client::all(),
            'laptops' => Laptop::where('etat_lap', 'disponible')->get()
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

        // Start a database transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Create the invoice first
            $facture = FactureLaptop::create($request->all());

            // Get the associated laptop
            $laptop = Laptop::findOrFail($request->id_lap);

            // Decrease the quantity
            $laptop->quantite_lap -= 1;

            // If quantity reaches 0, mark as sold
            if ($laptop->quantite_lap <= 0) {
                $laptop->quantite_lap = 0;
                $laptop->etat_lap = 'vendue'; // Assuming you have this field
            }

            // Save the laptop changes
            $laptop->save();

            // Commit the transaction
            DB::commit();

            return redirect()->route('facture-laptops.index')->with('success', 'Facture created successfully!');

        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();
            return redirect()->back()->with('error', 'Error creating facture: ' . $e->getMessage());
        }
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

    public function exportPdf($id)
    {
        // Get the facture with related client and laptop
        $facture = FactureLaptop::with(['client', 'laptop'])->findOrFail($id);

        // HTML content from your template
        $html = view('pdf.facture-laptop', compact('facture'))->render();

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
        $fileName = "facture-laptop-{$facture->id_facture_lap}.pdf";

        // Return the PDF as a download
        return $dompdf->stream($fileName, [
            'Attachment' => true // This will force download instead of displaying
        ]);
    }


}


