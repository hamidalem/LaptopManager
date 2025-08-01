import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Client {
    nom_client: string;
    num_tel_client: string;
}

interface Laptop {
    id_lap: string;
    nom_lap: string;
    marque_lap: string;
    prix_vente_lap: number;
    etat_lap: string; // Add this field
}

interface FactureLaptopForm {
    montant_facture_lap: string;
    date_facture_lap: string;
    nom_client: string;
    id_lap: string;
}

interface CreateProps {
    clients: Client[];
    laptops: Laptop[];
}

export default function Create({ clients, laptops }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<FactureLaptopForm>({
        montant_facture_lap: '',
        date_facture_lap: '',
        nom_client: '',
        id_lap: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('facture-laptops.store'));
    };

    const clientOptions = clients.map(c => ({
        nom_client: c.nom_client,
        label: `${c.nom_client} (${c.num_tel_client})`
    }));

    // Filtrer les portables pour n'afficher que ceux qui sont disponibles
    const availableLaptops = laptops.filter(l => l.etat_lap === 'disponible');

    const laptopOptions = availableLaptops.map(l => ({
        id_lap: l.id_lap,
        label: `${l.nom_lap} (${l.marque_lap}) - ${l.prix_vente_lap} DA`,
        prix_vente_lap: l.prix_vente_lap
    }));

    useEffect(() => {
        if (data.id_lap) {
            const selectedLaptop = availableLaptops.find(l => l.id_lap.toString() === data.id_lap);
            if (selectedLaptop) {
                // Mettre à jour le montant uniquement si la valeur est différente pour éviter les re-rendus inutiles
                if (data.montant_facture_lap !== selectedLaptop.prix_vente_lap.toString()) {
                    setData('montant_facture_lap', selectedLaptop.prix_vente_lap.toString());
                }
            }
        } else if (data.montant_facture_lap !== '') {
            setData('montant_facture_lap', '');
        }
    }, [data.id_lap]); // Dépend uniquement de data.id_lap

    return (
        <AppLayout>
            <Head title="Créer une facture de portable" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Créer une nouvelle facture de portable</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    {/* Champ Montant */}
                                    <div>
                                        <label htmlFor="montant_facture_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Montant
                                        </label>
                                        <input
                                            id="montant_facture_lap"
                                            type="number"
                                            step="0.01"
                                            value={data.montant_facture_lap}
                                            onChange={(e) => setData('montant_facture_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-100 cursor-not-allowed"
                                            readOnly
                                        />
                                        {errors.montant_facture_lap && <p className="mt-2 text-sm text-red-600">{errors.montant_facture_lap}</p>}
                                    </div>

                                    {/* Champ Date */}
                                    <div>
                                        <label htmlFor="date_facture_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            id="date_facture_lap"
                                            type="date"
                                            value={data.date_facture_lap}
                                            onChange={(e) => setData('date_facture_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.date_facture_lap && <p className="mt-2 text-sm text-red-600">{errors.date_facture_lap}</p>}
                                    </div>

                                    {/* Champ Client */}
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
                                        {errors.nom_client && <p className="mt-2 text-sm text-red-600">{errors.nom_client}</p>}
                                    </div>

                                    {/* Champ Portable - N'affiche que les portables disponibles */}
                                    <div>
                                        <label htmlFor="id_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Portables disponibles
                                        </label>
                                        <select
                                            id="id_lap"
                                            value={data.id_lap}
                                            onChange={(e) => setData('id_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Sélectionner un portable</option>
                                            {laptopOptions.map((l) => (
                                                <option key={l.id_lap} value={l.id_lap}>
                                                    {l.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_lap && <p className="mt-2 text-sm text-red-600">{errors.id_lap}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('facture-laptops.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Création en cours...' : 'Créer une facture de portable'}
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
