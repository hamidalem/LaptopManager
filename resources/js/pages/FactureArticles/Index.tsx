import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Client {
    nom_client: string;
    num_tel_client: string;
}

interface Article {
    nom_art: string;
    marque_art: string;
}

interface FactureArticle {
    id_facture_art: string;
    montant_facture_art: number;
    date_facture_art: string;
    client: Client | null;
    article: Article | null;
}

interface IndexProps {
    factures: FactureArticle[];
}

export default function Index({ factures }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Facture Articles" />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Gestion des factures d'articles</h1>
                                <Link
                                    href={route('facture-articles.create')}
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
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Article</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {factures.length > 0 ? (
                                        factures.map((facture, index) => (
                                            <tr key={facture.id_facture_art} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.id_facture_art}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.montant_facture_art}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{facture.date_facture_art}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.client ? `${facture.client.nom_client} (${facture.client.num_tel_client})` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {facture.article ? `${facture.article.nom_art} (${facture.article.marque_art})` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                                    {/* Show Button */}
                                                    <Link
                                                        href={route('facture-articles.show', facture.id_facture_art)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                                                    >
                                                        Afficher
                                                    </Link>
                                                    {/* Edit Button */}
                                                    <Link
                                                        href={route('facture-articles.edit', facture.id_facture_art)}
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
                                                Aucune facture d'article trouvée. Veuillez en ajouter une nouvelle pour commencer !
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
