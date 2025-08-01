<?php

namespace App\Http\Controllers;

use App\Models\FactureLaptop;
use App\Models\FactureReparation;
use App\Models\Laptop;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $currentMonth = Carbon::now()->startOfMonth();

        // Fetch statistics
        $availableLaptops = Laptop::where('etat_lap', 'disponible')->sum('quantite_lap');;
        $monthlyLaptopInvoices = FactureLaptop::where('date_facture_lap', '>=', $currentMonth)->count();
        $monthlyRepairInvoices = FactureReparation::where('date_facture_repar', '>=', $currentMonth)->count();

        // Calculate monthly profit
        // This now uses the singular 'laptop' relationship and iterates directly on the invoice
        $monthlyProfit = FactureLaptop::where('date_facture_lap', '>=', $currentMonth)
            ->with('laptop')
            ->get()
            ->sum(fn($invoice) =>
            $invoice->laptop
                ? $invoice->laptop->prix_vente_lap - $invoice->laptop->prix_achat_lap
                : 0
            );

        // Fetch laptops for the table
        $laptops = Laptop::with('fournisseur')->where('etat_lap' , 'disponible')->get();

        // Pass all data to the Inertia view
        return Inertia::render('dashboard', [
            'laptops' => $laptops,
            'availableLaptops' => $availableLaptops,
            'monthlyLaptopInvoices' => $monthlyLaptopInvoices,
            'monthlyRepairInvoices' => $monthlyRepairInvoices,
            'monthlyProfit' => $monthlyProfit,
        ]);
    }
}
