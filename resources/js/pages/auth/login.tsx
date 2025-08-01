import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Gestionnaire de Laptops" description="Entrez votre email et votre mot de passe ci-dessous pour vous connecter">
            <Head title="Connexion" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    {/* Adresse e-mail */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@exemple.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Mot de passe */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Mot de passe"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Bouton de soumission */}
                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Se connecter
                    </Button>
                </div>
            </form>

            {/* Message de statut */}
            {status && <div className="mt-6 text-center text-sm font-medium text-green-600">{status}</div>}

            {/* Liens Mot de passe oublié + Inscription */}
            <div className="mt-6 flex justify-between text-sm">
                <TextLink href={route('register')}>Vous n'avez pas de compte ? Inscrivez-vous</TextLink>
            </div>
        </AuthLayout>
    );
}
