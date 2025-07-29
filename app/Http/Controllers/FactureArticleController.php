<?php

namespace App\Http\Controllers;

use App\Models\FactureArticle;
use App\Models\Client;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactureArticleController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureArticles/Index', [
            'factures' => FactureArticle::with(['client', 'article'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('FactureArticles/Create', [
            'clients' => Client::all(),
            'articles' => Article::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'montant_facture_art' => 'required|numeric|min:0',
            'date_facture_art' => 'required|date',
            'nom_client' => 'required|exists:clients,nom_client',
            'id_art' => 'required|exists:articles,id_art'
        ]);

        FactureArticle::create($request->all());

        return redirect()->route('facture-articles.index')->with('success', 'Facture created successfully!');
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
}
