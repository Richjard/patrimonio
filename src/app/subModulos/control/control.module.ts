import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ControlRutasModule } from './control-rutas.module'

import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ControlRutasModule,
    SharedComponentsModule,
    NgbModule
  ]
})
export class ControlModule { }
