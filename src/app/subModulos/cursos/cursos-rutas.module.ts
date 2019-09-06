import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BuscadorComponent } from './../../global/buscador/buscador.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FilterPipeModule } from 'ngx-filter-pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { SilabusCursosComponent } from './silabus-cursos/silabus-cursos.component';

import { OrderModule } from 'ngx-order-pipe';

import { ToastrModule } from 'ngx-toastr';
import { AllCursosComponent } from './all-cursos/all-cursos.component';
import { MisAsistenciasComponent } from './mis-asistencias/mis-asistencias.component';
import { GestionAsistenciaComponent } from './gestion-asistencia/gestion-asistencia.component';
import { GestionNotasComponent } from './gestion-notas/gestion-notas.component';
import { HorariosComponent } from './horarios/horarios.component';
import { NominasComponent } from './nominas/nominas.component';
import { GestionRegistroComponent } from './gestion-registro/gestion-registro.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { GuiaPanelComponent } from './guia-panel/guia-panel.component';
import { GestionReportesComponent } from './gestion-reportes/gestion-reportes.component';
import { ExamenSustitutorioComponent } from './examen-sustitutorio/examen-sustitutorio.component';

registerLocaleData(localeEs, 'es');

const childrenRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'silabo/:ciclo/:curso',
    component: SilabusCursosComponent,
  },
  {
    path: 'todosCursos',
    component: AllCursosComponent,
  },
  {
    path: 'asistencias',
    component: MisAsistenciasComponent,
  },
  {
    path: 'notas',
    component: MisAsistenciasComponent,
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
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgbModule,
    FilterPipeModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  declarations: [
    BuscadorComponent,
    SilabusCursosComponent,
    AllCursosComponent,
    MisAsistenciasComponent,
    GestionAsistenciaComponent,
    GestionNotasComponent,
    HorariosComponent,
    NominasComponent,
    GestionRegistroComponent,
    MenuComponent,
    PrincipalComponent,
    GuiaPanelComponent,
    GestionReportesComponent,
    ExamenSustitutorioComponent,
  ],
})
export class CursosRutasModule {}
