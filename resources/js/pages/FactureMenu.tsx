import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function FactureMenu() {
    return (
        <AppLayout>
            <Head title="Facture Menu" />

            {/* Consistent page background */}
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="mx-auto w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white p-8 shadow-lg">
                        <h1 className="mb-10 text-center text-3xl font-extrabold text-gray-900">Select Facture Type</h1>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Card for Facture Laptops */}
                            <Link
                                href={route('facture-laptops.index')}
                                className="group block flex transform flex-col items-center justify-center rounded-xl bg-blue-500 p-6 text-center text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 hover:shadow-xl"
                            >
                                <div className="mb-4 text-5xl group-hover:animate-bounce">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-12 w-12"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold">Facture Laptops</h2>
                                <p className="text-lg opacity-90">Manage invoices for laptops.</p>
                            </Link>

                            {/* Card for Facture Articles */}
                            <Link
                                href={route('facture-articles.index')}
                                className="group block flex transform flex-col items-center justify-center rounded-xl bg-green-500 p-6 text-center text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-600 hover:shadow-xl"
                            >
                                <div className="mb-4 text-5xl group-hover:animate-bounce">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-12 w-12"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold">Facture Articles</h2>
                                <p className="text-lg opacity-90">Manage invoices for articles.</p>
                            </Link>

                            {/* Card for Facture Reparations */}
                            <Link
                                href={route('facture-reparations.index')}
                                className="group block flex transform flex-col items-center justify-center rounded-xl bg-red-500 p-6 text-center text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-xl"
                            >
                                <div className="mb-4 text-5xl group-hover:animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-2xl font-bold">Facture Reparations</h2>
                                <p className="text-lg opacity-90">Manage invoices for repairs.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
