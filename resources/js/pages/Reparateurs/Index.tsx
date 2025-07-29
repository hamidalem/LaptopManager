import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Reparateur interface
interface Reparateur {
    nom_rep: string;
    num_tel_rep: string; // Changed to string
    adresse_rep: string;
}

interface IndexProps {
    reparateurs: Reparateur[];
}

export default function Index({ reparateurs }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Reparateurs" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Reparateurs Management</h1>
                                <Link
                                    href={route('reparateurs.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Reparateur
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">Nom Reparateur</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Numéro Téléphone</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Adresse</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {reparateurs.length > 0 ? (
                                        reparateurs.map((reparateur, index) => (
                                            <tr key={reparateur.nom_rep} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparateur.nom_rep}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparateur.num_tel_rep}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparateur.adresse_rep}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('reparateurs.edit', reparateur.nom_rep)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('reparateurs.destroy', reparateur.nom_rep)}
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
                                            <td colSpan={4} className="px-6 py-10 text-center text-xl text-gray-500 font-medium">
                                                No reparateurs found. Please add a new one to get started!
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
