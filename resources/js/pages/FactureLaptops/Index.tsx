import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for nested data
interface Client {
    nom_client: string;
    num_tel_client: string; // Assuming phone number can be a string
    // Add other relevant fields for Client if they exist in your data structure
}

// Define the Laptop interface for nested data
interface Laptop {
    nom_lap: string;
    marque_lap: string;
    // Add other relevant fields for Laptop if they exist in your data structure
}

// Define the FactureLaptop interface, including nested Client and Laptop
interface FactureLaptop {
    id_facture_lap: string;
    montant_facture_lap: number; // Assuming montant is a number
    date_facture_lap: string; // Assuming date is a string (e.g., 'YYYY-MM-DD')
    client: Client | null; // Facture can have a client or not
    laptop: Laptop | null; // Facture can have a laptop or not
    // Add other relevant fields for FactureLaptop if they exist in your data structure
}

interface IndexProps {
    factures: FactureLaptop[];
}

export default function Index({ factures }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Facture Laptops" />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Gestion des factures de portables</h1>
                                <Link
                                    href={route('facture-laptops.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Ajouter une nouvelle facture
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Montant</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Portable</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {factures.length > 0 ? (
                                        factures.map((facture, index) => (
                                            <tr key={facture.id_facture_lap} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.id_facture_lap}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.montant_facture_lap}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.date_facture_lap}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.client ? `${facture.client.nom_client} (${facture.client.num_tel_client})` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.laptop ? `${facture.laptop.nom_lap} (${facture.laptop.marque_lap})` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                                    {/* Show Button */}
                                                    <Link
                                                        href={route('facture-laptops.show', facture.id_facture_lap)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                                                    >
                                                        Afficher
                                                    </Link>
                                                    {/* Edit Button */}
                                                    <Link
                                                        href={route('facture-laptops.edit', facture.id_facture_lap)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                                    >
                                                        Modifier
                                                    </Link>


                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-xl text-gray-500 font-medium">
                                                Aucune facture de portable trouvée. Veuillez en ajouter une nouvelle pour commencer !
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
