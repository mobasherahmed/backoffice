import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth-routes').then((m) => m.routes)
    },
    {
        path: 'overview',
        loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('./views/views-routes').then((m) => m.routes)
            },
        ],
        canActivate: [AuthGuard]
    }

];
