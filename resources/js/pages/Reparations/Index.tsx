import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Reparateur interface for nested data
interface Reparateur {
    nom_rep: string;
    num_tel_rep: number;
    adresse_rep: string;
}

// Define the Reparation interface, including the nested Reparateur
interface Reparation {
    id_repar: string;
    nom_repar: string;
    desc_repar: string | null;
    nom_rep: string;
    etat_repar: 'en attente' | 'termine' | 'annule'; // Added etat_repar
    reparateur: Reparateur | null;
}

interface IndexProps {
    reparations: Reparation[];
}

export default function Index({ reparations }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Reparations" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Reparations Management</h1>
                                <Link
                                    href={route('reparations.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Reparation
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Nom Reparation</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Reparateur</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">État</th> {/* Added Etat header */}
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {reparations.length > 0 ? (
                                        reparations.map((reparation, index) => (
                                            <tr key={reparation.id_repar} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparation.id_repar}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparation.nom_repar}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{reparation.desc_repar}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {reparation.reparateur ? `${reparation.reparateur.nom_rep}` : 'N/A'}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        reparation.etat_repar === 'en attente' ? 'bg-yellow-100 text-yellow-800' :
                                                            reparation.etat_repar === 'termine' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'
                                                    }`}>
                                                        {reparation.etat_repar}
                                                    </span>
                                                </td> {/* Added Etat data cell with conditional styling */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('reparations.edit', reparation.id_repar)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('reparations.destroy', reparation.id_repar)}
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
                                            <td colSpan={6} className="px-6 py-10 text-center text-xl text-gray-500 font-medium"> {/* Updated colspan */}
                                                No reparations found. Please add a new one to get started!
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
