<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        return Inertia::render('Articles/Index', [
            'articles' => Article::with('fournisseur')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create', [
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_art' => 'required|string|max:255',
            'desc_art' => 'nullable|string',
            'marque_art' => 'required|string|max:255',
            'prix_achat_art' => 'required|numeric|min:0',
            'prix_vente_art' => 'required|numeric|min:0',
            'date_achat_art' => 'nullable|date',
            'quantite_art' => 'required|integer|min:0',
            'nom_fourn' => 'required|exists:fournisseurs,nom_fourn'
            // 'etat_art' is not validated here as it defaults to 'disponible' in the DB
        ]);

        Article::create($request->all());

        return redirect()->route('articles.index')->with('success', 'Article created successfully!');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'nom_art' => 'required|string|max:255',
            'desc_art' => 'nullable|string',
            'marque_art' => 'required|string|max:255',
            'prix_achat_art' => 'required|numeric|min:0',
            'prix_vente_art' => 'required|numeric|min:0',
            'date_achat_art' => 'nullable|date',
            'quantite_art' => 'required|integer|min:0',
            'etat_art' => 'required|in:disponible,vendue', // Added validation for etat_art
            'nom_fourn' => 'required|exists:fournisseurs,nom_fourn'
        ]);

        $article->update($request->all());

        return redirect()->route('articles.index')->with('success', 'Article updated successfully!');
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Article deleted successfully!');
    }
}
