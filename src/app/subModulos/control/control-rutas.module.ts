import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BuscadorComponent } from './../../global/buscador/buscador.component'

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FilterPipeModule } from 'ngx-filter-pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { EstudiantesControlComponent } from './estudiantes-control/estudiantes-control.component'

import { OrderModule } from 'ngx-order-pipe';

import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeEs, 'es')

const routes: Routes = [
    {
        path: 'estudiantes',
        component: EstudiantesControlComponent,
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FilterPipeModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  exports: [RouterModule],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  declarations: [  
    BuscadorComponent ,
    EstudiantesControlComponent
  ]
})
export class ControlRutasModule { }