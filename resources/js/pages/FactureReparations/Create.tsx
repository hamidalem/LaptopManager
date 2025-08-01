import React from 'react'; // useEffect is no longer needed
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for the dropdown options
interface Client {
    nom_client: string;
    num_tel_client: string; // Assuming phone number can be a string
    // Add other relevant fields for Client if they exist in your data structure
}

// Define the Reparation interface for the dropdown options
interface Reparation {
    id_repar: string;
    nom_repar: string;
    // montant_repar: number | null; // No longer needed for auto-fill
    // Add other relevant fields for Reparation if they exist in your data structure
}

// Define the FactureReparationForm interface for the form data
interface FactureReparationForm {
    montant_facture_repar: string; // Use string for form input
    date_facture_repar: string;
    nom_client: string;
    id_repar: string;
}

interface CreateProps {
    clients: Client[];
    reparations: Reparation[];
}

export default function Create({ clients, reparations }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<FactureReparationForm>({
        montant_facture_repar: '',
        date_facture_repar: '',
        nom_client: '',
        id_repar: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('facture-reparations.store'));
    };

    // Prepare options for the client dropdown
    const clientOptions = clients.map(c => ({
        nom_client: c.nom_client,
        label: `${c.nom_client} (${c.num_tel_client})`
    }));

    // Prepare options for the reparation dropdown
    const reparationOptions = reparations.map(r => ({
        id_repar: r.id_repar,
        label: r.nom_repar,
        // montant_repar: r.montant_repar || 0 // No longer needed for auto-fill
    }));

    return (
        <AppLayout>
            <Head title="Créer une facture de réparation" />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Créer une nouvelle facture de réparation</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields, responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="montant_facture_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Montant
                                        </label>
                                        <input
                                            id="montant_facture_repar"
                                            type="number"
                                            step="0.01"
                                            value={data.montant_facture_repar}
                                            onChange={(e) => setData('montant_facture_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.montant_facture_repar && <p className="mt-2 text-sm text-red-600">{errors.montant_facture_repar}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_facture_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            id="date_facture_repar"
                                            type="date"
                                            value={data.date_facture_repar}
                                            onChange={(e) => setData('date_facture_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.date_facture_repar && <p className="mt-2 text-sm text-red-600">{errors.date_facture_repar}</p>}
                                    </div>

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

                                    <div>
                                        <label htmlFor="id_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Réparation
                                        </label>
                                        <select
                                            id="id_repar"
                                            value={data.id_repar}
                                            onChange={(e) => setData('id_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Sélectionner une réparation</option>
                                            {reparationOptions.map((r) => (
                                                <option key={r.id_repar} value={r.id_repar}>
                                                    {r.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_repar && <p className="mt-2 text-sm text-red-600">{errors.id_repar}</p>}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('facture-reparations.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Création...' : 'Créer une facture de réparation'}
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
