import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Define the Fournisseur interface for the dropdown options
interface Fournisseur {
    nom_fourn: string;
    num_tel_fourn: number;
    adresse_fourn: string;
}

// Define the Laptop interface for the data passed to the Edit component
interface Laptop {
    id_lap: string;
    nom_lap: string;
    marque_lap: string;
    prix_achat_lap: number;
    prix_vente_lap: number;
    date_achat_lap: string | null; // Can be null if not set
    quantite_lap: number;
    etat_lap: 'disponible' | 'vendue'; // Added etat_lap
    desc_lap: string | null; // Can be null if not set
    nom_fourn: string; // The name of the associated supplier
}

// Define the form data interface, using string for inputs that might be numbers
interface LaptopForm {
    nom_lap: string;
    marque_lap: string;
    prix_achat_lap: string;
    prix_vente_lap: string;
    date_achat_lap: string;
    quantite_lap: string;
    etat_lap: 'disponible' | 'vendue'; // Added etat_lap
    desc_lap: string;
    nom_fourn: string;
}

interface EditProps {
    laptop: Laptop;
    fournisseurs: Fournisseur[];
}

export default function Edit({ laptop, fournisseurs }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<LaptopForm>({
        nom_lap: laptop.nom_lap,
        marque_lap: laptop.marque_lap,
        prix_achat_lap: laptop.prix_achat_lap.toString(),
        prix_vente_lap: laptop.prix_vente_lap.toString(),
        date_achat_lap: laptop.date_achat_lap || '', // Ensure it's an empty string if null
        quantite_lap: laptop.quantite_lap.toString(),
        etat_lap: laptop.etat_lap, // Initialize with existing laptop's etat_lap
        desc_lap: laptop.desc_lap || '', // Ensure it's an empty string if null
        nom_fourn: laptop.nom_fourn
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use the laptop's ID for the update route
        put(route('laptops.update', laptop.id_lap));
    };

    // Prepare options for the fournisseur dropdown
    const fournisseurOptions = fournisseurs.map(f => ({
        nom_fourn: f.nom_fourn,
        label: `${f.nom_fourn} (${f.num_tel_fourn})`
    }));

    return (
        <AppLayout>
            <Head title={`Modifier l'ordinateur portable ${laptop.nom_lap}`} />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Modifier l'ordinateur portable</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields, responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="nom_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom de l'ordinateur portable
                                        </label>
                                        <input
                                            id="nom_lap"
                                            type="text"
                                            value={data.nom_lap}
                                            onChange={(e) => setData('nom_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.nom_lap && <p className="mt-2 text-sm text-red-600">{errors.nom_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="marque_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Marque
                                        </label>
                                        <input
                                            id="marque_lap"
                                            type="text"
                                            value={data.marque_lap}
                                            onChange={(e) => setData('marque_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.marque_lap && <p className="mt-2 text-sm text-red-600">{errors.marque_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_achat_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix d'achat
                                        </label>
                                        <input
                                            id="prix_achat_lap"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_achat_lap}
                                            onChange={(e) => setData('prix_achat_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.prix_achat_lap && <p className="mt-2 text-sm text-red-600">{errors.prix_achat_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="prix_vente_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prix de vente
                                        </label>
                                        <input
                                            id="prix_vente_lap"
                                            type="number"
                                            step="0.01"
                                            value={data.prix_vente_lap}
                                            onChange={(e) => setData('prix_vente_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.prix_vente_lap && <p className="mt-2 text-sm text-red-600">{errors.prix_vente_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_achat_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date d'achat
                                        </label>
                                        <input
                                            id="date_achat_lap"
                                            type="date"
                                            value={data.date_achat_lap}
                                            onChange={(e) => setData('date_achat_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                        />
                                        {errors.date_achat_lap && <p className="mt-2 text-sm text-red-600">{errors.date_achat_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="quantite_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantité
                                        </label>
                                        <input
                                            id="quantite_lap"
                                            type="number"
                                            min="1"
                                            value={data.quantite_lap}
                                            onChange={(e) => setData('quantite_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.quantite_lap && <p className="mt-2 text-sm text-red-600">{errors.quantite_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="etat_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            État
                                        </label>
                                        <select
                                            id="etat_lap"
                                            value={data.etat_lap}
                                            onChange={(e) => setData('etat_lap', e.target.value as 'disponible' | 'vendue')}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
                                            required
                                        >
                                            <option value="disponible">Disponible</option>
                                            <option value="vendue">Vendue</option>
                                        </select>
                                        {errors.etat_lap && <p className="mt-2 text-sm text-red-600">{errors.etat_lap}</p>}
                                    </div>

                                    <div className="md:col-span-2"> {/* Span two columns for description */}
                                        <label htmlFor="desc_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="desc_lap"
                                            value={data.desc_lap}
                                            onChange={(e) => setData('desc_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            rows={3}
                                        />
                                        {errors.desc_lap && <p className="mt-2 text-sm text-red-600">{errors.desc_lap}</p>}
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
                                            <option value="">Sélectionnez un fournisseur</option>
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
                                        href={route('laptops.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Mise à jour...' : 'Mettre à jour l\'ordinateur portable'}
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
