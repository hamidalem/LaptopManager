import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for nested data
interface Client {
    nom_client: string;
    num_tel_client: string;
}

// Define the Reparation interface for nested data
interface Reparation {
    id_repar: number | string;
    nom_repar: string;
    desc_repar: string;
    nom_rep: string;
    etat_repar: string;
}

// Define the FactureReparation interface, including nested Client and Reparation
interface FactureReparation {
    id_facture_repar: number;
    montant_facture_repar: number;
    date_facture_repar: string;
    client: Client | null;
    reparation: Reparation | null;
}

interface ShowProps {
    facture: FactureReparation;
}

const Show: React.FC<ShowProps> = ({ facture }) => {
    // Handle case where facture data might be missing
    if (!facture) {
        return (
            <AppLayout>
                <Head title="Facture introuvable" />
                <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">
                    Erreur : Facture introuvable.
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`Détails de la Facture - ${facture.id_facture_repar}`} />

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 md:p-10">
                        {/* Section d'en-tête avec titre et bouton d'exportation */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
                                Détails de la Facture <span className="text-indigo-600">#{facture.id_facture_repar}</span>
                            </h1>
                            <a
                                href={route('facture-reparations.export-pdf', facture.id_facture_repar)}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Exporter en PDF
                            </a>
                        </div>

                        {/* Grille d'informations pour la facture, le client et la réparation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

                            {/* Carte des informations de la facture */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    Détails de la Facture
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">ID Facture :</dt>
                                        <dd className="mt-1 text-lg font-semibold text-indigo-700">#{facture.id_facture_repar}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Montant :</dt>
                                        <dd className="mt-1 text-lg font-semibold">{facture.montant_facture_repar} DA</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date :</dt>
                                        <dd className="mt-1 text-lg font-semibold">
                                            {new Date(facture.date_facture_repar).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                                    {facture.client ? (
                                        <>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Nom :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.client.nom_client}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Téléphone :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.client.num_tel_client}</dd>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-lg text-gray-700 italic">Aucun client associé</p>
                                    )}
                                </dl>
                            </div>

                            {/* Carte des informations de la réparation */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transform hover:scale-102 transition-transform duration-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    Détails de la Réparation
                                </h2>
                                <dl className="space-y-3 text-gray-700">
                                    {facture.reparation ? (
                                        <>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Nom :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.reparation.nom_repar}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Description :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.reparation.desc_repar}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Réparateur :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.reparation.nom_rep}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">État :</dt>
                                                <dd className="mt-1 text-lg font-semibold">{facture.reparation.etat_repar}</dd>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-lg text-gray-700 italic">Aucune réparation associée</p>
                                    )}
                                </dl>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
                            <Link
                                href={route('facture-reparations.index')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out shadow-sm"
                            >
                                Retour à la Liste
                            </Link>
                            <Link
                                href={route('facture-reparations.edit', facture.id_facture_repar)}
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
