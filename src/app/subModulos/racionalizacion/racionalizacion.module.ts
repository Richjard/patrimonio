import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuiaPanelComponent } from '../cursos/guia-panel/guia-panel.component';
import { RacionalizacionRutasModule } from './racionalizacion-rutas.module';

@NgModule({
  imports: [CommonModule, RacionalizacionRutasModule],
})
export class RacionalizacionModule {}
