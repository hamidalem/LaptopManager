import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the form data interface for the Fournisseur
interface FournisseurForm {
    nom_fourn: string;
    num_tel_fourn: string;
    adresse_fourn: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FournisseurForm>({
        nom_fourn: '',
        num_tel_fourn: '',
        adresse_fourn: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('fournisseurs.store'));
    };

    return (
        <AppLayout>
            <Head title="Créer un fournisseur" />

            <div className="min-h-screen bg-gray-100 py-12"> {/* Modern page background */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden"> {/* Modern card design */}
                        <div className="p-8"> {/* Increased padding */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Créer un nouveau fournisseur</h1> {/* Modern heading */}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_fourn" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom Fournisseur
                                        </label>
                                        <input
                                            id="nom_fourn"
                                            type="text"
                                            value={data.nom_fourn}
                                            onChange={(e) => setData('nom_fourn', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            autoFocus
                                        />
                                        {errors.nom_fourn && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nom_fourn}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="num_tel_fourn" className="block text-sm font-medium text-gray-700 mb-1">
                                            Numéro Téléphone
                                        </label>
                                        <input
                                            id="num_tel_fourn"
                                            type="tel"
                                            value={data.num_tel_fourn}
                                            onChange={(e) => setData('num_tel_fourn', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                        />
                                        {errors.num_tel_fourn && (
                                            <p className="mt-2 text-sm text-red-600">{errors.num_tel_fourn}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="adresse_fourn" className="block text-sm font-medium text-gray-700 mb-1">
                                            Adresse
                                        </label>
                                        <input
                                            id="adresse_fourn"
                                            type="text"
                                            value={data.adresse_fourn}
                                            onChange={(e) => setData('adresse_fourn', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                        />
                                        {errors.adresse_fourn && (
                                            <p className="mt-2 text-sm text-red-600">{errors.adresse_fourn}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('fournisseurs.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Création en cours...' : 'Créer un fournisseur'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
