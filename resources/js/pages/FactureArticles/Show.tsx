import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Les définitions d'interface restent inchangées
interface Client {
    nom_client: string;
    num_tel_client: string;
}

interface Article {
    marque_art: string;
    nom_art: string;
    desc_art: string;
    prix_vente_art: number;
}

interface FactureArticle {
    id_facture_art: string | number;
    montant_facture_art: number;
    date_facture_art: string;
    client: Client;
    article: Article;
}

interface ShowProps {
    facture: FactureArticle;
}

const Show: React.FC<ShowProps> = ({ facture }) => {
    return (
        <AppLayout>
            <Head title={`Détails de la Facture - ${facture.id_facture_art}`} />

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 md:p-10">
                        {/* Section d'en-tête */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
                                Détails de la Facture <span className="text-indigo-600">#{facture.id_facture_art}</span>
                            </h1>
                            <a
                                href={route('facture-articles.export-pdf', facture.id_facture_art)}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* Vous pouvez ajouter une icône ici, par exemple <i className="fas fa-file-pdf mr-2"></i> */}
                                Exporter en PDF
                            </a>
                        </div>

                        {/* Grille d'informations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

                            {/* Carte des informations de la facture */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    {/* Icône optionnelle : <i className="fas fa-file-invoice text-indigo-500 mr-3"></i> */}
                                    Détails de la Facture
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">ID Facture :</dt>
                                        <dd className="mt-1 text-lg font-semibold text-indigo-700">#{facture.id_facture_art}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Montant :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.montant_facture_art} DA</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date :</dt>
                                        <dd className="mt-1 text-lg font-semibold">
                                            {new Date(facture.date_facture_art).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Carte des informations du client */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    {/* Icône optionnelle : <i className="fas fa-user-tie text-blue-500 mr-3"></i> */}
                                    Informations Client
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Nom :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.client.nom_client}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Téléphone :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.client.num_tel_client}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Carte des informations de l'article */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    {/* Icône optionnelle : <i className="fas fa-laptop text-purple-500 mr-3"></i> */}
                                    Détails de l'Article
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Marque :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.article.marque_art}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Nom :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.article.nom_art}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Description :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.article.desc_art}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
                            <Link
                                href={route('facture-articles.index')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
                            >
                                Retour à la Liste
                            </Link>
                            <Link
                                href={route('facture-articles.edit', facture.id_facture_art)}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                            >
                                Modifier la Facture
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
