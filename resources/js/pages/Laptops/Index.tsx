import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Fournisseur interface for nested data
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string; // Added for completeness, though not used in Laptop table
}

// Define the Laptop interface, including the nested Fournisseur
interface Laptop {
    id_lap: string; // Assuming ID can be a string or number, using string as per original code
    nom_lap: string;
    desc_lap: string;
    prix_achat_lap: number;
    prix_vente_lap: number;
    quantite_lap: number;
    etat_lap: 'disponible' | 'vendue'; // Added etat_lap
    fournisseur: Fournisseur | null; // Laptop can have a supplier or not
}

interface IndexProps {
    laptops: Laptop[];
}

export default function Index({ laptops }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Laptops" />
            {/* Consistent page background and padding */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    {/* Main content container with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            {/* Header section with title and add button */}
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Laptops Management</h1>
                                <Link
                                    href={route('laptops.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Laptop
                                </Link>
                            </div>

                            {/* Table container with stronger shadow and border */}
                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    {/* Table header with solid blue background */}
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Prix Achat</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Prix Vente</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Quantité</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">État</th> {/* Added Etat header */}
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Fournisseur</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    {/* Table body with alternating row colors and distinct hover */}
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {laptops.length > 0 ? (
                                        laptops.map((laptop, index) => (
                                            <tr key={laptop.id_lap} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.id_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.nom_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.desc_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.prix_achat_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.prix_vente_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{laptop.quantite_lap}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        laptop.etat_lap === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {laptop.etat_lap}
                                                    </span>
                                                </td> {/* Added Etat data cell with conditional styling */}
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {laptop.fournisseur ? `${laptop.fournisseur.nom_fourn}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('laptops.edit', laptop.id_lap)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('laptops.destroy', laptop.id_lap)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                                        as="button"
                                                        type="button"
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-10 text-center text-xl text-gray-500 font-medium"> {/* Updated colspan */}
                                                No laptops found. Please add a new one to get started!
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
