import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Client {
    nom_client: string;
    num_tel_client: string;
}

interface Article {
    id_art: string;
    nom_art: string;
    marque_art: string;
    prix_vente_art: number;
    quantite_art: number;
}

interface FactureArticleForm {
    montant_facture_art: string;
    date_facture_art: string;
    nom_client: string;
    id_art: string;
}

interface CreateProps {
    clients: Client[];
    articles: Article[];
}

export default function Create({ clients, articles }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<FactureArticleForm>({
        montant_facture_art: '',
        date_facture_art: '',
        nom_client: '',
        id_art: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (!data.id_art) {
            alert('Veuillez sélectionner un article');
            return;
        }

        post(route('facture-articles.store'), {
            onError: (errors) => {
                console.error('Erreurs de soumission du formulaire :', errors);

                // Handle specific error cases
                if (errors.id_art) {
                    alert('L\'article sélectionné n\'est plus disponible. Veuillez en choisir un autre.');
                    // You might want to refresh the articles list here
                } else {
                    alert('Veuillez vérifier le formulaire pour les erreurs');
                }
            },
            onSuccess: () => {
                // Optional: Add any success handling
            },
        });
    };

    const clientOptions = clients.map(c => ({
        nom_client: c.nom_client,
        label: `${c.nom_client} (${c.num_tel_client})`
    }));

    // Filter available articles (quantity > 0)
    const availableArticles = articles.filter(a => a.quantite_art > 0);

    const articleOptions = availableArticles.map(a => ({
        id_art: a.id_art,
        label: `${a.nom_art} (${a.marque_art}) - ${a.prix_vente_art} DA (Stock: ${a.quantite_art})`,
        prix_vente_art: a.prix_vente_art
    }));

    const handleArticleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const articleId = e.target.value;
        setData('id_art', articleId);

        if (articleId) {
            const selectedArticle = availableArticles.find(a => a.id_art.toString() === articleId);
            if (selectedArticle) {
                setData('montant_facture_art', selectedArticle.prix_vente_art.toString());
            }
        } else {
            setData('montant_facture_art', '');
        }
    };

    return (
        <AppLayout>
            <Head title="Créer une facture d'article" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Créer une nouvelle facture d'article</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    {/* Montant Field */}
                                    <div>
                                        <label htmlFor="montant_facture_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Montant (DA)
                                        </label>
                                        <input
                                            id="montant_facture_art"
                                            type="number"
                                            step="0.01"
                                            value={data.montant_facture_art}
                                            onChange={(e) => setData('montant_facture_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-100 cursor-not-allowed"
                                            readOnly
                                        />
                                        {errors.montant_facture_art && (
                                            <p className="mt-2 text-sm text-red-600">{errors.montant_facture_art}</p>
                                        )}
                                    </div>

                                    {/* Date Field */}
                                    <div>
                                        <label htmlFor="date_facture_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            id="date_facture_art"
                                            type="date"
                                            value={data.date_facture_art}
                                            onChange={(e) => setData('date_facture_art', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.date_facture_art && (
                                            <p className="mt-2 text-sm text-red-600">{errors.date_facture_art}</p>
                                        )}
                                    </div>

                                    {/* Client Field */}
                                    <div>
                                        <label htmlFor="nom_client" className="block text-sm font-medium text-gray-700 mb-1">
                                            Client
                                        </label>
                                        <select
                                            id="nom_client"
                                            value={data.nom_client}
                                            onChange={(e) => setData('nom_client', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Sélectionner un client</option>
                                            {clientOptions.map((c) => (
                                                <option key={c.nom_client} value={c.nom_client}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_client && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nom_client}</p>
                                        )}
                                    </div>

                                    {/* Article Field */}
                                    <div>
                                        <label htmlFor="id_art" className="block text-sm font-medium text-gray-700 mb-1">
                                            Articles disponibles
                                        </label>
                                        <select
                                            id="id_art"
                                            value={data.id_art}
                                            onChange={handleArticleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Sélectionner un article</option>
                                            {articleOptions.map((a) => (
                                                <option key={a.id_art} value={a.id_art}>
                                                    {a.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_art && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.id_art.includes('exist')
                                                    ? 'L\'article sélectionné est invalide ou n\'est plus disponible'
                                                    : errors.id_art}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('facture-articles.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Création en cours...' : 'Créer une facture d\'article'}
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
