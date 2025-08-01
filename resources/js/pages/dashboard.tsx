import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the BreadcrumbItem type
interface BreadcrumbItem {
    title: string;
    href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Page Principale',
        href: '/mainpage',
    },
];

// Define the Fournisseur interface
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string;
}

// Define the Laptop interface, including the nested Fournisseur
interface Laptop {
    id_lap: string;
    nom_lap: string;
    desc_lap: string;
    prix_achat_lap: number;
    prix_vente_lap: number;
    quantite_lap: number;
    etat_lap: 'disponible' | 'vendue';
    fournisseur: Fournisseur | null;
}

// Update the DashboardProps interface to match the data from your controller
interface DashboardProps {
    laptops: Laptop[];
    availableLaptops: number;
    monthlyLaptopInvoices: number;
    monthlyRepairInvoices: number;
    monthlyProfit: number;
}

// Destructure the new props in the function signature
function Dashboard({
                       laptops,
                       availableLaptops,
                       monthlyLaptopInvoices,
                       monthlyRepairInvoices,
                       monthlyProfit
                   }: DashboardProps) {

    // Populate the stats array with dynamic data from the props
    const stats = [
        {
            name: 'Laptops Disponibles',
            value: availableLaptops.toString(),
            icon: '💻',
            color: 'bg-red-500'
        },
        {
            name: 'Factures Laptops (Ce Mois)',
            value: monthlyLaptopInvoices.toString(),
            icon: '📄',
            color: 'bg-indigo-500'
        },
        {
            name: 'Factures Réparations (Ce Mois)',
            value: monthlyRepairInvoices.toString(),
            icon: '🛠️',
            color: 'bg-purple-500'
        },
        {
            name: 'Total des Profits (Ce Mois)',
            value: `${monthlyProfit.toFixed(2)} DZD`,
            icon: '💰',
            color: 'bg-orange-500'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Page Principale" />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                            Bienvenue sur votre <span className="text-indigo-600">Tableau de Bord</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Aperçu rapide de vos activités et statistiques clés.
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200 ease-in-out"
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${stat.color} text-white text-2xl`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activities / Quick Links Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Laptop Liste Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
                                Laptops Liste
                            </h2>
                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Prix Vente</th>

                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {laptops.length > 0 ? (
                                        laptops.map((laptop, index) => (
                                            <tr
                                                key={laptop.id_lap}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}
                                            >
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.nom_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.desc_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.prix_vente_lap}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-10 text-center text-xl text-gray-500 font-medium">
                                                No laptops found. Please add a new one to get started!
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Links Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
                                Liens Rapides
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    href={route('facture-laptops.create')}
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                                >
                                    Créer une Facture (Laptop)
                                </Link>
                                <Link
                                    href={route('facture-reparations.create')}
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ease-in-out"
                                >
                                    Créer une Facture (Réparation)
                                </Link>
                                <Link
                                    href={route('clients.index')}
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 ease-in-out"
                                >
                                    Gérer les Clients
                                </Link>
                                <Link
                                    href={route('reparations.index')}
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out"
                                >
                                    Voir les Réparations
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;
