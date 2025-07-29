import React, { useEffect } from 'react'; // Import useEffect
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Ensure AppLayout is used

// Define the Client interface for the dropdown options
interface Client {
    nom_client: string;
    num_tel_client: string; // Assuming phone number can be a string
    // Add other relevant fields for Client if they exist in your data structure
}

// Define the Laptop interface for the dropdown options
interface Laptop {
    id_lap: string;
    nom_lap: string;
    marque_lap: string;
    prix_vente_lap: number; // Used for auto-filling montant
    // Add other relevant fields for Laptop if they exist in your data structure
}

// Define the FactureLaptop interface for the data passed to the Edit component
interface FactureLaptop {
    id_facture_lap: string;
    montant_facture_lap: number; // Assuming montant is a number
    date_facture_lap: string; // Assuming date is a string (e.g., 'YYYY-MM-DD')
    nom_client: string; // The name of the associated client
    id_lap: string; // The ID of the associated laptop
    // Add other relevant fields for FactureLaptop if they exist in your data structure
}

// Define the form data interface, using string for inputs that might be numbers
interface FactureLaptopForm {
    montant_facture_lap: string; // Use string for form input
    date_facture_lap: string;
    nom_client: string;
    id_lap: string;
}

interface EditProps {
    facture: FactureLaptop;
    clients: Client[];
    laptops: Laptop[];
}

export default function Edit({ facture, clients, laptops }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<FactureLaptopForm>({
        montant_facture_lap: facture.montant_facture_lap, // Initialize with current value, formatted
        date_facture_lap: facture.date_facture_lap,
        nom_client: facture.nom_client,
        id_lap: facture.id_lap.toString()
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('facture-laptops.update', facture.id_facture_lap));
    };

    // Prepare options for the client dropdown
    const clientOptions = clients.map(c => ({
        nom_client: c.nom_client,
        label: `${c.nom_client} (${c.num_tel_client})`
    }));

    // Prepare options for the laptop dropdown
    const laptopOptions = laptops.map(l => ({
        id_lap: l.id_lap,
        label: `${l.nom_lap} (${l.marque_lap})`,
        prix_vente_lap: l.prix_vente_lap // Include for auto-fill logic
    }));

    // Auto-fill montant_facture_lap when laptop is selected, same as Create page
    useEffect(() => {
        if (data.id_lap) {
            const selectedLaptop = laptops.find(l => l.id_lap.toString() === data.id_lap);
            if (selectedLaptop) {
                setData('montant_facture_lap', selectedLaptop.prix_vente_lap); // Format to 2 decimal places
            }
        } else {
            // Only clear if the current laptop selection is empty, otherwise retain original value
            // This prevents clearing if the user just loads the page with an existing laptop selected
            if (data.montant_facture_lap !== facture.montant_facture_lap) {
                setData('montant_facture_lap', '');
            }
        }
    }, [data.id_lap, laptops, setData, facture.montant_facture_lap]); // Added facture.montant_facture_lap to dependency array

    return (
        <AppLayout>
            <Head title={`Edit Facture ${facture.id_facture_lap}`} />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Modern card design with rounded corners and shadow */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8"> {/* Increased padding */}
                            {/* Modern heading */}
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Facture Laptop</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Grid layout for form fields, responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label htmlFor="montant_facture_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Montant
                                        </label>
                                        <input
                                            id="montant_facture_lap"
                                            type="number"
                                            step="0.01"
                                            value={data.montant_facture_lap}
                                            // Keep readOnly as per original logic, but allow change via laptop selection
                                            onChange={(e) => setData('montant_facture_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-100 cursor-not-allowed" // Modern input style, disabled appearance
                                            readOnly
                                        />
                                        {errors.montant_facture_lap && <p className="mt-2 text-sm text-red-600">{errors.montant_facture_lap}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="date_facture_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            id="date_facture_lap"
                                            type="date"
                                            value={data.date_facture_lap}
                                            onChange={(e) => setData('date_facture_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern input style
                                            required
                                        />
                                        {errors.date_facture_lap && <p className="mt-2 text-sm text-red-600">{errors.date_facture_lap}</p>}
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
                                            <option value="">Select Client</option>
                                            {clientOptions.map((c) => (
                                                <option key={c.nom_client} value={c.nom_client}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nom_client && <p className="mt-2 text-sm text-red-600">{errors.nom_client}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="id_lap" className="block text-sm font-medium text-gray-700 mb-1">
                                            Laptop
                                        </label>
                                        <select
                                            id="id_lap"
                                            value={data.id_lap}
                                            onChange={(e) => setData('id_lap', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3" // Modern select style
                                            required
                                        >
                                            <option value="">Select Laptop</option>
                                            {laptopOptions.map((l) => (
                                                <option key={l.id_lap} value={l.id_lap}>
                                                    {l.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_lap && <p className="mt-2 text-sm text-red-600">{errors.id_lap}</p>}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center justify-end mt-8"> {/* Adjusted margin-top */}
                                    <Link
                                        href={route('facture-laptops.index')}
                                        className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out" // Modern secondary button
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50" // Modern primary button
                                    >
                                        {processing ? 'Updating...' : 'Update Facture Laptop'}
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
