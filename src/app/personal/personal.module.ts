import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRutasModule } from './personal-rutas.module'

import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonalRutasModule,
    NgxEchartsModule,
    SharedComponentsModule,
    NgxDatatableModule,
    NgbModule
  ]
})
export class PersonalModule { }
