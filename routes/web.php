<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ClientController;
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
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
