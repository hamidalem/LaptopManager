<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FactureArticleController;
use App\Http\Controllers\FactureLaptopController;
use App\Http\Controllers\FactureMenuController;
use App\Http\Controllers\FactureReparationController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\LaptopController;
use App\Http\Controllers\ReparateurController;
use App\Http\Controllers\ReparationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::get('/facture', [FactureMenuController::class, 'index']);

Route::resource('fournisseurs', FournisseurController::class);
Route::resource('reparateurs', ReparateurController::class);
Route::resource('laptops', LaptopController::class);
Route::resource('reparations', ReparationController::class);
Route::resource('clients', ClientController::class);
Route::resource('articles', ArticleController::class);

Route::resource('facture-laptops', FactureLaptopController::class);
Route::get('/laptops/{id}/price', [FactureLaptopController::class, 'getLaptopPrice']);

Route::resource('facture-articles', FactureArticleController::class);
Route::get('/articles/{id}/price', [FactureArticleController::class, 'getArticlePrice']);

Route::resource('facture-reparations', FactureReparationController::class);



Route::get('facture-laptops/{factureLaptop}/export-pdf', [FactureLaptopController::class, 'exportPdf'])
    ->name('facture-laptops.export-pdf');

Route::get('facture-articles/{factureArticle}/export-pdf', [FactureArticleController::class, 'exportPdf'])
    ->name('facture-articles.export-pdf');

Route::get('facture-reparations/{factureReparation}/export-pdf', [FactureReparationController::class, 'exportPdf'])
    ->name('facture-reparations.export-pdf');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
