import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for nested data
interface Client {
    nom_client: string;
    num_tel_client: string; // Assuming phone number can be a string
    // Add other relevant fields for Client if they exist in your data structure
}

// Define the Reparation interface for nested data
interface Reparation {
    nom_repar: string;
    // Add other relevant fields for Reparation if they exist in your data structure
}

// Define the FactureReparation interface, including nested Client and Reparation
interface FactureReparation {
    id_facture_repar: string;
    montant_facture_repar: number; // Assuming montant is a number
    date_facture_repar: string; // Assuming date is a string (e.g., 'YYYY-MM-DD')
    client: Client | null; // Facture can have a client or not
    reparation: Reparation | null; // Facture can have a reparation or not
    // Add other relevant fields for FactureReparation if they exist in your data structure
}

interface IndexProps {
    factures: FactureReparation[];
}

export default function Index({ factures }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Facture Reparations" />

            {/* Consistent page background and padding */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    {/* Main content container with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Header section with title and add button */}
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Facture Reparations Management</h1>
                                <Link
                                    href={route('facture-reparations.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Facture
                                </Link>
                            </div>

                            {/* Table container with stronger shadow and border */}
                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    {/* Table header with solid blue background */}
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Montant</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Reparation</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    {/* Table body with alternating row colors and distinct hover */}
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {factures.length > 0 ? (
                                        factures.map((facture, index) => (
                                            <tr key={facture.id_facture_repar} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.id_facture_repar}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.montant_facture_repar}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.date_facture_repar}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.client ? `${facture.client.nom_client} (${facture.client.num_tel_client})` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.reparation ? facture.reparation.nom_repar : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('facture-reparations.edit', facture.id_facture_repar)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('facture-reparations.destroy', facture.id_facture_repar)}
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
                                            <td colSpan={6} className="px-6 py-10 text-center text-xl text-gray-500 font-medium">
                                                No facture reparations found. Please add a new one to get started!
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

