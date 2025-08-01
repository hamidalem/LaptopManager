import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for nested data
interface Client {
    nom_client: string;
    num_tel_client: string;
}

// Define the Laptop interface for nested data
interface Laptop {
    marque_lap: string;
    nom_lap: string;
    desc_lap: string;
    prix_vente_lap: number;
}

// Define the FactureLaptop interface, including nested Client and Laptop
interface FactureLaptop {
    id_facture_lap: string | number;
    montant_facture_lap: number;
    date_facture_lap: string;
    client: Client;
    laptop: Laptop;
}

interface ShowProps {
    facture: FactureLaptop;
}

const Show: React.FC<ShowProps> = ({ facture }) => {
    return (
        <AppLayout>
            <Head title={`Détails de la Facture - ${facture.id_facture_lap}`} />

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 md:p-10">
                        {/* Section d'en-tête */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
                                Détails de la Facture <span className="text-indigo-600">#{facture.id_facture_lap}</span>
                            </h1>
                            <a
                                href={route('facture-laptops.export-pdf', facture.id_facture_lap)}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Exporter en PDF
                            </a>
                        </div>

                        {/* Grille d'informations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

                            {/* Carte des informations de la facture */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    Détails de la Facture
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">ID Facture :</dt>
                                        <dd className="mt-1 text-lg font-semibold text-indigo-700">#{facture.id_facture_lap}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Montant :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.montant_facture_lap} DA</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date :</dt>
                                        <dd className="mt-1 text-lg font-semibold">
                                            {new Date(facture.date_facture_lap).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Carte des informations du client */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
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

                            {/* Carte des informations de l'ordinateur portable */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    Détails de l'Ordinateur Portable
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Marque :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.laptop.marque_lap}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Modèle :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.laptop.nom_lap}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Caractéristiques :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.laptop.desc_lap}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
                            <Link
                                href={route('facture-laptops.index')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
                            >
                                Retour à la Liste
                            </Link>
                            <Link
                                href={route('facture-laptops.edit', facture.id_facture_lap)}
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
