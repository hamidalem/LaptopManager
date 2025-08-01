import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Changed from AuthenticatedLayout

// Define the Client interface for the dropdown options
interface Client {
    nom_client: string;
    num_tel_client: string; // Assuming phone number can be a string
    // Add other relevant fields for Client if they exist in your data structure
}

// Define the Article interface for the dropdown options
interface Article {
    id_art: string;
    nom_art: string;
    marque_art: string;
    prix_vente_art: number; // Used for auto-filling montant
    // Add other relevant fields for Article if they exist in your data structure
}

// Define the FactureArticle interface for the data passed to the Edit component
interface FactureArticle {
    id_facture_art: string;
    montant_facture_art: number; // Assuming montant is a number
    date_facture_art: string; // Assuming date is a string (e.g., 'YYYY-MM-DD')
    nom_client: string; // The name of the associated client
    id_art: string; // The ID of the associated article
    // Add other relevant fields for FactureArticle if they exist in your data structure
}

// Define the form data interface, using string for inputs that might be numbers
interface FactureArticleForm {
    montant_facture_art: string; // Use string for form input
    date_facture_art: string;
    nom_client: string;
    id_art: string;
}

interface EditProps {
    facture: FactureArticle;
    clients: Client[];
    articles: Article[];
}

export default function Edit({ facture, clients, articles }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<FactureArticleForm>({
        montant_facture_art: facture.montant_facture_art.toString(), // Initialize with current value, formatted
        date_facture_art: facture.date_facture_art,
        nom_client: facture.nom_client,
        id_art: facture.id_art
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('facture-articles.update', facture.id_facture_art));
    };

    // Prepare options for the client dropdown
    const clientOptions = clients.map(c => ({
        nom_client: c.nom_client,
        label: `${c.nom_client} (${c.num_tel_client})`
    }));

    // Prepare options for the article dropdown
    const articleOptions = articles.map(a => ({
        id_art: a.id_art,
        label: `${a.nom_art} (${a.marque_art})`,
        prix_vente_art: a.prix_vente_art // Include for auto-fill logic
    }));

    // Auto-fill montant_facture_art when article is selected, similar to Create page
    useEffect(() => {
        if (data.id_art) {
            const selectedArticle = articles.find(a => a.id_art === data.id_art);
            if (selectedArticle) {
                setData('montant_facture_art', selectedArticle.prix_vente_art.toString()); // Format to 2 decimal places
            }
        } else {
            // Only clear if the current article selection is empty, otherwise retain original value
            // This prevents clearing if the user just loads the page with an existing article selected
            if (data.montant_facture_art !== facture.montant_facture_art.toString()) {
                setData('montant_facture_art', '');
            }
        }
    }, [data.id_art, articles, setData, facture.montant_facture_art]); // Added articles, setData, and facture.montant_facture_art to dependency array

    return (
        <AppLayout>
            <Head title={`Modifier Facture ${facture.id_facture_art}`} />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Modifier la facture de l'article</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields, responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="montant_facture_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Montant
                                        </label>
                                        <input
                                            id="montant_facture_art"
                                            type="number"
                                            step="0.01"
                                            value={data.montant_facture_art}
                                            // Keep readOnly as per original logic, but allow change via article selection
                                            onChange={(e) => setData('montant_facture_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-100 cursor-not-allowed" // Modern input style, disabled appearance
                                            readOnly
                                        />
                                        {errors.montant_facture_art && <p className="mt-2 text-sm text-red-600">{errors.montant_facture_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_facture_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            id="date_facture_art"
                                            type="date"
                                            value={data.date_facture_art}
                                            onChange={(e) => setData('date_facture_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.date_facture_art && <p className="mt-2 text-sm text-red-600">{errors.date_facture_art}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="nom_client" className="block text-sm font-medium text-gray-700 mb-1">
                                            Client
                                        </label>
                                        <select
                                            id="nom_client"
                                            value={data.nom_client}
                                            onChange={(e) => setData('nom_client', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern select style
                                            required
                                        >
                                            <option value="">Sélectionner un client</option>
                                            {clientOptions.map((c) => (
                                                <option key={c.nom_client} value={c.nom_client}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_client && <p className="mt-2 text-sm text-red-600">{errors.nom_client}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="id_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Article
                                        </label>
                                        <select
                                            id="id_art"
                                            value={data.id_art}
                                            onChange={(e) => setData('id_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern select style
                                            required
                                        >
                                            <option value="">Sélectionner un article</option>
                                            {articleOptions.map((a) => (
                                                <option key={a.id_art} value={a.id_art}>
                                                    {a.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_art && <p className="mt-2 text-sm text-red-600">{errors.id_art}</p>}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('facture-articles.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Mise à jour en cours...' : 'Mettre à jour la facture de l\'article'}
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
