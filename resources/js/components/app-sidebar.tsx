import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    Wrench,
    Laptop,
    CircuitBoard,
    LayoutGrid,
    LucidePersonStanding,
    User,
    Mouse, NotepadText
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Fournisseur',
        href: '/fournisseurs',
        icon: LucidePersonStanding,
    },
    {
        title: 'Reparateur',
        href: '/reparateurs',
        icon: Wrench,
    },
    {
        title: 'Client',
        href: '/clients',
        icon: User,
    },
    {
        title: 'Laptop',
        href: '/laptops',
        icon: Laptop,
    },
    {
        title: 'Article',
        href: '/articles',
        icon: Mouse,
    },
    {
        title: 'Reparation',
        href: '/reparations',
        icon: CircuitBoard,
    },

    {
        title: 'Facture',
        href: '/facture',
        icon: NotepadText,
    },
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
