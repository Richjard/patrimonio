import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { MenuComponent } from './menu/menu.component';

import { Routes, RouterModule } from '@angular/router';

const childrenRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
];
const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
    children: childrenRoutes,
  },
];

@NgModule({
  declarations: [PrincipalComponent, MenuComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class RacionalizacionRutasModule {}
