import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Reparateur interface for the data passed to the Edit component
interface Reparateur {
    nom_rep: string;
    num_tel_rep: string; // Changed to string
    adresse_rep: string;
}

// Define the ReparateurForm interface for the form data
interface ReparateurForm {
    nom_rep: string;
    num_tel_rep: string; // Changed to string
    adresse_rep: string;
}

interface EditProps {
    reparateur: Reparateur;
}

export default function Edit({ reparateur }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<ReparateurForm>({
        nom_rep: reparateur.nom_rep,
        num_tel_rep: reparateur.num_tel_rep, // Initialize as string
        adresse_rep: reparateur.adresse_rep
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('reparateurs.update', reparateur.nom_rep));
    };

    return (
        <AppLayout>
            <Head title={`Edit ${reparateur.nom_rep}`} />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Reparateur</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_rep" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom Reparateur
                                        </label>
                                        <input
                                            id="nom_rep"
                                            type="text"
                                            value={data.nom_rep}
                                            onChange={(e) => setData('nom_rep', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                            readOnly // Assuming nom_rep is a primary key and shouldn't be changed after creation
                                        />
                                        {errors.nom_rep && <p className="mt-2 text-sm text-red-600">{errors.nom_rep}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="num_tel_rep" className="block text-sm font-medium text-gray-700 mb-1">
                                            Numéro Téléphone
                                        </label>
                                        <input
                                            id="num_tel_rep"
                                            type="tel" // Use type="tel"
                                            value={data.num_tel_rep}
                                            onChange={(e) => setData('num_tel_rep', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.num_tel_rep && <p className="mt-2 text-sm text-red-600">{errors.num_tel_rep}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="adresse_rep" className="block text-sm font-medium text-gray-700 mb-1">
                                            Adresse
                                        </label>
                                        <input
                                            id="adresse_rep"
                                            type="text"
                                            value={data.adresse_rep}
                                            onChange={(e) => setData('adresse_rep', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.adresse_rep && <p className="mt-2 text-sm text-red-600">{errors.adresse_rep}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('reparateurs.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Reparateur'}
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
