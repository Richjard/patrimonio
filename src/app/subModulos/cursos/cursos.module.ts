import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CursosRutasModule } from './cursos-rutas.module'

import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CursosRutasModule,
    SharedComponentsModule,
    NgbModule
  ]
})
export class CursosModule { }
