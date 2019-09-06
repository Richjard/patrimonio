import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TramitesRutasModule } from './tramites-rutas.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TramitesRutasModule, SharedComponentsModule, NgbModule],
})
export class TramitesModule {}
