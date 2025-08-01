import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Client interface for the data passed to the Edit component
interface Client {
    nom_client: string;
    num_tel_client: string; // Changed to string
    adresse_client: string;
}

// Define the ClientForm interface for the form data
interface ClientForm {
    nom_client: string;
    num_tel_client: string; // Changed to string
    adresse_client: string;
}

interface EditProps {
    client: Client;
}

export default function Edit({ client }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<ClientForm>({
        nom_client: client.nom_client,
        num_tel_client: client.num_tel_client, // Initialize as string
        adresse_client: client.adresse_client
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('clients.update', client.nom_client));
    };

    return (
        <AppLayout>
            <Head title={`Modifier ${client.nom_client}`} />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Modifier le client</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_client" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom du client
                                        </label>
                                        <input
                                            id="nom_client"
                                            type="text"
                                            value={data.nom_client}
                                            onChange={(e) => setData('nom_client', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                            readOnly // Assuming nom_client is a primary key and shouldn't be changed after creation
                                        />
                                        {errors.nom_client && <p className="mt-2 text-sm text-red-600">{errors.nom_client}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="num_tel_client" className="block text-sm font-medium text-gray-700 mb-1">
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            id="num_tel_client"
                                            type="tel" // Use type="tel"
                                            value={data.num_tel_client}
                                            onChange={(e) => setData('num_tel_client', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.num_tel_client && <p className="mt-2 text-sm text-red-600">{errors.num_tel_client}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="adresse_client" className="block text-sm font-medium text-gray-700 mb-1">
                                            Adresse
                                        </label>
                                        <input
                                            id="adresse_client"
                                            type="text"
                                            value={data.adresse_client}
                                            onChange={(e) => setData('adresse_client', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        />
                                        {errors.adresse_client && <p className="mt-2 text-sm text-red-600">{errors.adresse_client}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-8">
                                    <Link
                                        href={route('clients.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Mise à jour en cours...' : 'Mettre à jour le client'}
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
