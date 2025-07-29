import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Fournisseur interface for the dropdown options
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    // Add other relevant fields for Fournisseur if they exist in your data structure
}

// Define the ArticleForm interface for the form data, without etat_art
interface ArticleForm {
    nom_art: string;
    desc_art: string;
    marque_art: string;
    prix_achat_art: string;
    prix_vente_art: string;
    date_achat_art: string;
    quantite_art: string;
    nom_fourn: string; // This will hold the selected supplier's name
}

interface CreateProps {
    fournisseurs: Fournisseur[];
}

export default function Create({ fournisseurs }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<ArticleForm>({
        nom_art: '',
        desc_art: '',
        marque_art: '',
        prix_achat_art: '',
        prix_vente_art: '',
        date_achat_art: '',
        quantite_art: '1', // Default quantity to 1
        nom_fourn: '' // Initialize with empty string for no selection
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    // Prepare options for the fournisseur dropdown
    const fournisseurOptions = fournisseurs.map(f => ({
        nom_fourn: f.nom_fourn,
        label: `${f.nom_fourn} (${f.num_tel_fourn})`
    }));

    return (
        <AppLayout>
            <Head title="Create Article" />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Create New Article</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields, responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom Article
                                        </label>
                                        <input
                                            id="nom_art"
                                            type="text"
                                            value={data.nom_art}
                                            onChange={(e) => setData('nom_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            autoFocus
                                            required
                                        />
                                        {errors.nom_art && <p className="mt-2 text-sm text-red-600">{errors.nom_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="marque_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Marque
                                        </label>
                                        <input
                                            id="marque_art"
                                            type="text"
                                            value={data.marque_art}
                                            onChange={(e) => setData('marque_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.marque_art && <p className="mt-2 text-sm text-red-600">{errors.marque_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_achat_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix Achat
                                        </label>
                                        <input
                                            id="prix_achat_art"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_achat_art}
                                            onChange={(e) => setData('prix_achat_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.prix_achat_art && <p className="mt-2 text-sm text-red-600">{errors.prix_achat_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_vente_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix Vente
                                        </label>
                                        <input
                                            id="prix_vente_art"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_vente_art}
                                            onChange={(e) => setData('prix_vente_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.prix_vente_art && <p className="mt-2 text-sm text-red-600">{errors.prix_vente_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_achat_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Achat
                                        </label>
                                        <input
                                            id="date_achat_art"
                                            type="date"
                                            value={data.date_achat_art}
                                            onChange={(e) => setData('date_achat_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                        />
                                        {errors.date_achat_art && <p className="mt-2 text-sm text-red-600">{errors.date_achat_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="quantite_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantité
                                        </label>
                                        <input
                                            id="quantite_art"
                                            type="number"
                                            min="1"
                                            value={data.quantite_art}
                                            onChange={(e) => setData('quantite_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.quantite_art && <p className="mt-2 text-sm text-red-600">{errors.quantite_art}</p>}
                                    </div>

                                    <div className="md:col-span-2"> {/* Span two columns for description */}
                                        <label htmlFor="desc_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc_art"
                                            value={data.desc_art}
                                            onChange={(e) => setData('desc_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            rows={3}
                                        />
                                        {errors.desc_art && <p className="mt-2 text-sm text-red-600">{errors.desc_art}</p>}
                                    </div>

                                    <div className="md:col-span-2"> {/* Span two columns for supplier dropdown */}
                                        <label htmlFor="nom_fourn" className="block text-sm font-medium text-gray-700 mb-1">
                                            Fournisseur
                                        </label>
                                        <select
                                            id="nom_fourn"
                                            value={data.nom_fourn}
                                            onChange={(e) => setData('nom_fourn', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern select style
                                            required
                                        >
                                            <option value="">Select Fournisseur</option>
                                            {fournisseurOptions.map((f) => (
                                                <option key={f.nom_fourn} value={f.nom_fourn}>
                                                    {f.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_fourn && <p className="mt-2 text-sm text-red-600">{errors.nom_fourn}</p>}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('articles.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Creating...' : 'Create Article'}
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
