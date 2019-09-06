import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FilterPipeModule } from 'ngx-filter-pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeEs, 'es')

const routes: Routes = [
    
    {
    path: 'perfil',
    component: ProfileComponent,
    }, 
    { 
      path: 'resetPassword', 
      component: ResetPasswordComponent, 
    } 
];

@NgModule({
  /*
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FilterPipeModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
*/
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      NgxEchartsModule,
      SharedComponentsModule,
      NgxDatatableModule,
      FilterPipeModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),
  ],
  exports: [RouterModule],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  declarations: [ProfileComponent, ResetPasswordComponent]
})
export class PersonalRutasModule { }