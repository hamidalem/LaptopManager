<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactureMenuController extends Controller
{
    public function index()
    {
        return Inertia::render('FactureMenu');
    }
}
