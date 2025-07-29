import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Fournisseur } from '@/types';

interface EditProps {
    fournisseur: Fournisseur;
}

export default function Edit({ fournisseur }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        nom_fourn: fournisseur.nom_fourn,
        num_tel_fourn: fournisseur.num_tel_fourn.toString(),
        adresse_fourn: fournisseur.adresse_fourn,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('fournisseurs.update', fournisseur.nom_fourn));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${fournisseur.nom_fourn}`} />

            <div className="min-h-screen bg-gray-100 py-12"> {/* Modern page background */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden"> {/* Modern card design */}
                        <div className="p-8"> {/* Increased padding */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Fournisseur</h1> {/* Modern heading */}

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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-100 cursor-not-allowed" // Modern input style, read-only
                                            readOnly
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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                        />
                                        {errors.adresse_fourn && (
                                            <p className="mt-2 text-sm text-red-600">{errors.adresse_fourn}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('fournisseurs.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Updating...' : 'Update Fournisseur'}
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
