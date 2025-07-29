import React from 'react';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string;
}

interface IndexProps {
    fournisseurs: Fournisseur[];
}

export default function Index({ fournisseurs }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Fournisseurs" />
            <div className="min-h-screen bg-gray-100 py-12"> {/* Consistent page background */}
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Fournisseurs Management</h1>
                                <Link
                                    href={route('fournisseurs.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Fournisseur
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200"> {/* Stronger shadow for the table container */}
                                <table className="min-w-full divide-y divide-gray-300"> {/* Slightly darker divider */}
                                    <thead className="bg-blue-600"> {/* Solid blue header background */}
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">Nom</th> {/* White text, rounded top-left */}
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Téléphone</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Adresse</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th> {/* Rounded top-right */}
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100"> {/* Lighter divider */}
                                    {fournisseurs.length > 0 ? (
                                        fournisseurs.map((fournisseur, index) => (
                                            <tr key={fournisseur.nom_fourn} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}> {/* Alternating row colors and more distinct hover */}
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{fournisseur.nom_fourn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{fournisseur.num_tel_fourn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{fournisseur.adresse_fourn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('fournisseurs.edit', fournisseur.nom_fourn)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2" // Rounded full, slightly lighter indigo
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('fournisseurs.destroy', fournisseur.nom_fourn)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out" // Rounded full, slightly lighter red
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
                                            <td colSpan={4} className="px-6 py-10 text-center text-xl text-gray-500 font-medium"> {/* Increased padding, larger text, medium font weight */}
                                                No fournisseurs found. Please add a new one to get started!
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
