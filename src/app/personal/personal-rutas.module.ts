import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FilterPipeModule } from 'ngx-filter-pipe';
//import localeEs from '@angular/common/locales/es';
//import { registerLocaleData } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
//registerLocaleData(localeEs, 'es')

const routes: Routes = [
    
    {
    path: 'perfil',
    component: ProfileComponent,
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    //FilterPipeModule,
    //FormsModule,
    DatePickerModule,
    /*CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),*/
  ],
  exports: [RouterModule],
  //providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  declarations: [ProfileComponent]
})
export class PersonalRutasModule { }