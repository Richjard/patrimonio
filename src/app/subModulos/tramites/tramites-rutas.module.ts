import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { IngresoNotasComponent } from './ingreso-notas/ingreso-notas.component';
import { IngresoAsistenciaComponent } from './ingreso-asistencia/ingreso-asistencia.component';
import { ModificacionNotasComponent } from './modificacion-notas/modificacion-notas.component';
import { ReprogramacionClasesComponent } from './reprogramacion-clases/reprogramacion-clases.component';
import { ReprogramacionExamenesComponent } from './reprogramacion-examenes/reprogramacion-examenes.component';
import { DescargoInasistenciasComponent } from './descargo-inasistencias/descargo-inasistencias.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { GuiaPanelComponent } from './guia-panel/guia-panel.component';
import { NotasComponent } from '../cursos/notas/notas.component';
import { RegistroAuxComponent } from '../cursos/registro-aux/registro-aux.component';
import { DescargoInasistComponent } from './descargo-inasist/descargo-inasist.component';
import { ModifNotasComponent } from './modif-notas/modif-notas.component';
import { ReproExamenesComponent } from './repro-examenes/repro-examenes.component';
import { ReproClasesComponent } from './repro-clases/repro-clases.component';

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
  declarations: [
    IngresoNotasComponent,
    IngresoAsistenciaComponent,
    ModificacionNotasComponent,
    ReprogramacionClasesComponent,
    ReprogramacionExamenesComponent,
    DescargoInasistenciasComponent,
    MenuComponent,
    PrincipalComponent,
    GuiaPanelComponent,
    NotasComponent,
    RegistroAuxComponent,
    DescargoInasistComponent,
    ModifNotasComponent,
    ReproClasesComponent,
    ReproExamenesComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class TramitesRutasModule {}
