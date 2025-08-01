<?php

namespace App\Http\Controllers;

use App\Models\FactureArticle;
use App\Models\Client;
use App\Models\Article;
use App\Models\FactureLaptop;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FactureArticleController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureArticles/Index', [
            'factures' => FactureArticle::with(['client', 'article'])->get()
        ]);
    }

    public function show(FactureArticle $factureArticle)
    {
        return Inertia::render('FactureArticles/Show', [
            'facture' => $factureArticle->load(['client', 'article'])
        ]);
    }

    public function create()
    {
        return Inertia::render('FactureArticles/Create', [
            'clients' => Client::all(),
            'articles' => Article::where('quantite_art', '>', 0)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'montant_facture_art' => 'required|numeric|min:0',
            'date_facture_art' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_art' => 'required|exists:articles,id_art'
        ]);

        DB::beginTransaction();

        try {
            // Lock the article for update to prevent race conditions
            $article = Article::where('id_art', $request->id_art)
                ->where('quantite_art', '>', 0)
                ->lockForUpdate()
                ->first();

            if (!$article) {
                throw new \Exception('The selected article is no longer available or out of stock');
            }

            // Create the invoice
            $facture = FactureArticle::create($validated);

            // Update the article quantity
            $article->quantite_art -= 1;

            if ($article->quantite_art <= 0) {
                $article->quantite_art = 0;
                $article->etat_art = 'vendue';
            }

            $article->save();

            DB::commit();

            return redirect()->route('facture-articles.index')->with('success', 'Facture created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->withErrors(['id_art' => $e->getMessage()])
                ->withInput();
        }
    }

    public function edit(FactureArticle $factureArticle)
    {
        return Inertia::render('FactureArticles/Edit', [
            'facture' => $factureArticle,
            'clients' => Client::all(),
            'articles' => Article::all()
        ]);
    }

    public function update(Request $request, FactureArticle $factureArticle)
    {
        $request->validate([
            'montant_facture_art' => 'required|numeric|min:0',
            'date_facture_art' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_art' => 'required|exists:articles,id_art'
        ]);

        $factureArticle->update($request->all());

        return redirect()->route('facture-articles.index')->with('success', 'Facture updated successfully!');
    }

    public function destroy(FactureArticle $factureArticle)
    {
        $factureArticle->delete();
        return redirect()->route('facture-articles.index')->with('success', 'Facture deleted successfully!');
    }

    public function getArticlePrice($id)
    {
        $article = Article::findOrFail($id);
        return response()->json(['prix_vente_art' => $article->prix_vente_art]);
    }


    public function exportPdf($id)
    {
        // Get the facture with related client and article
        $facture = FactureArticle::with(['client', 'article'])->findOrFail($id);

        // HTML content from your template
        $html = view('pdf.facture-article', compact('facture'))->render();

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
        $fileName = "facture-article-{$facture->id_facture_art}.pdf";

        // Return the PDF as a download
        return $dompdf->stream($fileName, [
            'Attachment' => true // This will force download instead of displaying
        ]);
    }
}
