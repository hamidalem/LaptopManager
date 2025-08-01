import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Fournisseur interface for the dropdown options
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string;
}

// Define the Article interface for the data passed to the Edit component
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
    nom_fourn: string;
}

// Define the form data interface
interface ArticleForm {
    nom_art: string;
    desc_art: string;
    marque_art: string;
    prix_achat_art: string;
    prix_vente_art: string;
    date_achat_art: string;
    quantite_art: string;
    etat_art: 'disponible' | 'vendue'; // Added etat_art
    nom_fourn: string;
}

interface EditProps {
    article: Article;
    fournisseurs: Fournisseur[];
}

export default function Edit({ article, fournisseurs }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<ArticleForm>({
        nom_art: article.nom_art,
        desc_art: article.desc_art || '',
        marque_art: article.marque_art,
        prix_achat_art: article.prix_achat_art.toString(),
        prix_vente_art: article.prix_vente_art.toString(),
        date_achat_art: article.date_achat_art || '',
        quantite_art: article.quantite_art.toString(),
        etat_art: article.etat_art, // Initialize with existing article's etat_art
        nom_fourn: article.nom_fourn
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('articles.update', article.id_art));
    };

    // Prepare options for the fournisseur dropdown
    const fournisseurOptions = fournisseurs.map(f => ({
        nom_fourn: f.nom_fourn,
        label: `${f.nom_fourn} (${f.num_tel_fourn})`
    }));

    return (
        <AppLayout>
            <Head title={`Modifier ${article.nom_art}`} />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Modifier l'article</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom de l'article
                                        </label>
                                        <input
                                            id="nom_art"
                                            type="text"
                                            value={data.nom_art}
                                            onChange={(e) => setData('nom_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.marque_art && <p className="mt-2 text-sm text-red-600">{errors.marque_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_achat_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix d'achat
                                        </label>
                                        <input
                                            id="prix_achat_art"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_achat_art}
                                            onChange={(e) => setData('prix_achat_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.prix_achat_art && <p className="mt-2 text-sm text-red-600">{errors.prix_achat_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_vente_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix de vente
                                        </label>
                                        <input
                                            id="prix_vente_art"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_vente_art}
                                            onChange={(e) => setData('prix_vente_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.prix_vente_art && <p className="mt-2 text-sm text-red-600">{errors.prix_vente_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_achat_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date d'achat
                                        </label>
                                        <input
                                            id="date_achat_art"
                                            type="date"
                                            value={data.date_achat_art}
                                            onChange={(e) => setData('date_achat_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.quantite_art && <p className="mt-2 text-sm text-red-600">{errors.quantite_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="etat_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            État
                                        </label>
                                        <select
                                            id="etat_art"
                                            value={data.etat_art}
                                            onChange={(e) => setData('etat_art', e.target.value as 'disponible' | 'vendue')}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="disponible">Disponible</option>
                                            <option value="vendue">Vendue</option>
                                        </select>
                                        {errors.etat_art && <p className="mt-2 text-sm text-red-600">{errors.etat_art}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="desc_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc_art"
                                            value={data.desc_art}
                                            onChange={(e) => setData('desc_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            rows={3}
                                        />
                                        {errors.desc_art && <p className="mt-2 text-sm text-red-600">{errors.desc_art}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="nom_fourn" className="block text-sm font-medium text-gray-700 mb-1">
                                            Fournisseur
                                        </label>
                                        <select
                                            id="nom_fourn"
                                            value={data.nom_fourn}
                                            onChange={(e) => setData('nom_fourn', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Sélectionner un fournisseur</option>
                                            {fournisseurOptions.map((f) => (
                                                <option key={f.nom_fourn} value={f.nom_fourn}>
                                                    {f.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_fourn && <p className="mt-2 text-sm text-red-600">{errors.nom_fourn}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('articles.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Mise à jour en cours...' : 'Mettre à jour l\'article'}
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
