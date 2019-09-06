import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarCompactComponent } from './shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component';
import { AdminLayoutSidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';

const moduleRoutes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule),
  },
  {
    path: 'cursos',
    loadChildren: () => import('./subModulos/cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path: 'tramites',
    loadChildren: () => import('./subModulos/tramites/tramites.module').then(m => m.TramitesModule),
  },
  {
    path: 'docente',
    loadChildren: () => import('./subModulos/cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path: 'tramites',
    loadChildren: () => import('./subModulos/tramites/tramites.module').then(m => m.TramitesModule),
  },
  {
    path: 'racionalizacion',
    loadChildren: () =>
      import('./subModulos/racionalizacion/racionalizacion.module').then(
        m => m.RacionalizacionModule,
      ),
  },
];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/perfil',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    children: moduleRoutes,
  },
  {
    path: '**',
    redirectTo: 'others/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
