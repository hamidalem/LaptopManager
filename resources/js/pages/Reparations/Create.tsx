import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Reparateur interface for the dropdown options
interface Reparateur {
    nom_rep: string;
    num_tel_rep: number;
    // Add other relevant fields for Reparateur if they exist in your data structure
}

// Define the ReparationForm interface for the form data, without etat_repar
interface ReparationForm {
    nom_repar: string;
    desc_repar: string;
    nom_rep: string; // This will hold the selected reparateur's name
}

interface CreateProps {
    reparateurs: Reparateur[];
}

export default function Create({ reparateurs }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<ReparationForm>({
        nom_repar: '',
        desc_repar: '',
        nom_rep: '' // Initialize with empty string for no selection
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('reparations.store'));
    };

    // Prepare options for the reparateur dropdown
    const reparateurOptions = reparateurs.map(r => ({
        nom_rep: r.nom_rep,
        label: `${r.nom_rep} (${r.num_tel_rep})`
    }));

    return (
        <AppLayout>
            <Head title="Créer une réparation" />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Créer une nouvelle réparation</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields */}
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom de la réparation
                                        </label>
                                        <input
                                            id="nom_repar"
                                            type="text"
                                            value={data.nom_repar}
                                            onChange={(e) => setData('nom_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            autoFocus
                                            required
                                        />
                                        {errors.nom_repar && <p className="mt-2 text-sm text-red-600">{errors.nom_repar}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="desc_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc_repar"
                                            value={data.desc_repar}
                                            onChange={(e) => setData('desc_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            rows={3}
                                        />
                                        {errors.desc_repar && <p className="mt-2 text-sm text-red-600">{errors.desc_repar}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="nom_rep" className="block text-sm font-medium text-gray-700 mb-1">
                                            Réparateur
                                        </label>
                                        <select
                                            id="nom_rep"
                                            value={data.nom_rep}
                                            onChange={(e) => setData('nom_rep', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern select style
                                            required
                                        >
                                            <option value="">Sélectionnez un réparateur</option>
                                            {reparateurOptions.map((r) => (
                                                <option key={r.nom_rep} value={r.nom_rep}>
                                                    {r.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_rep && <p className="mt-2 text-sm text-red-600">{errors.nom_rep}</p>}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('reparations.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Création en cours...' : 'Créer la réparation'}
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
