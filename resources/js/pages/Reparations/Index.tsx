import React, { useState } from 'react';
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
    // State to manage the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Filter reparations based on the search query
    const filteredReparations = reparations.filter(reparation =>
        reparation.nom_repar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reparation.desc_repar && reparation.desc_repar.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (reparation.reparateur && reparation.reparateur.nom_rep.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AppLayout>
            <Head title="Gestion des Réparations" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                                <h1 className="text-3xl font-extrabold text-gray-900">Gestion des Réparations</h1>
                                <Link
                                    href={route('reparations.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 text-center"
                                >
                                    + Ajouter une Nouvelle Réparation
                                </Link>
                            </div>

                            {/* Search bar */}
                            <div className="mb-6">
                                <label htmlFor="search" className="sr-only">Rechercher</label>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="Rechercher par nom, description ou réparateur..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Nom de la Réparation</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Réparateur</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">État</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {filteredReparations.length > 0 ? (
                                        filteredReparations.map((reparation, index) => (
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
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                                                    <Link
                                                        href={route('reparations.edit', reparation.id_repar)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                                        title="Modifier"
                                                    >
                                                        {/* Edit Icon */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.389-8.389-2.828-2.828z" />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('reparations.destroy', reparation.id_repar)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                                        as="button"
                                                        type="button"
                                                        title="Supprimer"
                                                    >
                                                        {/* Delete Icon */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-xl text-gray-500 font-medium">
                                                Aucune réparation trouvée. Veuillez en ajouter une pour commencer !
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
