import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Reparateur interface for the dropdown options
interface Reparateur {
    nom_rep: string;
    num_tel_rep: number;
    adresse_rep: string;
}

// Define the Reparation interface for the data passed to the Edit component
interface Reparation {
    id_repar: string;
    nom_repar: string;
    desc_repar: string | null;
    nom_rep: string;
    etat_repar: 'en attente' | 'termine' | 'annule'; // Added etat_repar
}

// Define the form data interface
interface ReparationForm {
    nom_repar: string;
    desc_repar: string;
    nom_rep: string;
    etat_repar: 'en attente' | 'termine' | 'annule'; // Added etat_repar
}

interface EditProps {
    reparation: Reparation;
    reparateurs: Reparateur[];
}

export default function Edit({ reparation, reparateurs }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<ReparationForm>({
        nom_repar: reparation.nom_repar,
        desc_repar: reparation.desc_repar || '',
        nom_rep: reparation.nom_rep,
        etat_repar: reparation.etat_repar, // Initialize with existing reparation's etat_repar
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('reparations.update', reparation.id_repar));
    };

    const reparateurOptions = reparateurs.map(r => ({
        nom_rep: r.nom_rep,
        label: `${r.nom_rep} (${r.num_tel_rep})`
    }));

    return (
        <AppLayout>
            <Head title={`Edit ${reparation.nom_repar}`} />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Reparation</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom Reparation
                                        </label>
                                        <input
                                            id="nom_repar"
                                            type="text"
                                            value={data.nom_repar}
                                            onChange={(e) => setData('nom_repar', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
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
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            rows={3}
                                        />
                                        {errors.desc_repar && <p className="mt-2 text-sm text-red-600">{errors.desc_repar}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="etat_repar" className="block text-sm font-medium text-gray-700 mb-1">
                                            État de la Réparation
                                        </label>
                                        <select
                                            id="etat_repar"
                                            value={data.etat_repar}
                                            onChange={(e) => setData('etat_repar', e.target.value as 'en attente' | 'termine' | 'annule')}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="en attente">En attente</option>
                                            <option value="termine">Terminé</option>
                                            <option value="annule">Annulé</option>
                                        </select>
                                        {errors.etat_repar && <p className="mt-2 text-sm text-red-600">{errors.etat_repar}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="nom_rep" className="block text-sm font-medium text-gray-700 mb-1">
                                            Reparateur
                                        </label>
                                        <select
                                            id="nom_rep"
                                            value={data.nom_rep}
                                            onChange={(e) => setData('nom_rep', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="">Select Reparateur</option>
                                            {reparateurOptions.map((r) => (
                                                <option key={r.nom_rep} value={r.nom_rep}>
                                                    {r.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_rep && <p className="mt-2 text-sm text-red-600">{errors.nom_rep}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('reparations.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Reparation'}
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
