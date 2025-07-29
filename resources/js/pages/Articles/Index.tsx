import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Fournisseur interface for nested data
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string;
}

// Define the Article interface, including the nested Fournisseur
interface Article {
    id_art: string;
    nom_art: string;
    desc_art: string | null;
    marque_art: string;
    prix_achat_art: number;
    prix_vente_art: number;
    date_achat_art: string | null;
    quantite_art: number;
    etat_art: 'disponible' | 'vendue'; // Added etat_art
    fournisseur: Fournisseur | null;
}

interface IndexProps {
    articles: Article[];
}

export default function Index({ articles }: IndexProps) {
    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-900">Articles Management</h1>
                                <Link
                                    href={route('articles.create')}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    + Add New Article
                                </Link>
                            </div>

                            <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-blue-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tl-lg">ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Marque</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Prix Achat</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Prix Vente</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Quantité</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">État</th> {/* Added Etat header */}
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Fournisseur</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider rounded-tr-lg">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {articles.length > 0 ? (
                                        articles.map((article, index) => (
                                            <tr key={article.id_art} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-100 transition-colors duration-200 ease-in-out`}>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.id_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.nom_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.desc_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.marque_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.prix_achat_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.prix_vente_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">{article.quantite_art}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        article.etat_art === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {article.etat_art}
                                                    </span>
                                                </td> {/* Added Etat data cell with conditional styling */}
                                                <td className="px-4 py-4 whitespace-nowrap text-base text-gray-800">
                                                    {article.fournisseur ? `${article.fournisseur.nom_fourn}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={route('articles.edit', article.id_art)}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        method="delete"
                                                        href={route('articles.destroy', article.id_art)}
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
                                            <td colSpan={10} className="px-6 py-10 text-center text-xl text-gray-500 font-medium"> {/* Updated colspan */}
                                                No articles found. Please add a new one to get started!
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
