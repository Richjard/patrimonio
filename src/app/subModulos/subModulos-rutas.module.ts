import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';



import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { LocalesUbicacionComponent } from './componentes/ubicacion/locales-ubicacion/locales-ubicacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//SYN 
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';


import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { LocalDetallesUbicacionComponent } from './componentes/ubicacion/local-detalles-ubicacion/local-detalles-ubicacion.component';

import { GridModule, FilterService, PageService} from '@syncfusion/ej2-angular-grids';
import { DropDownListModule,MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';





import { AreasUbicacionComponent } from './componentes/ubicacion/areas-ubicacion/areas-ubicacion.component';
import { AreaFormUbicacionComponent } from './componentes/ubicacion/area-form-ubicacion/area-form-ubicacion.component';
import { OficinasUbicacionComponent } from './componentes/ubicacion/oficinas-ubicacion/oficinas-ubicacion.component';
import { OficinaFormUbicacionComponent } from './componentes/ubicacion/oficina-form-ubicacion/oficina-form-ubicacion.component';
import { GruposGenericosCatalogoSBNComponent } from './componentes/catalogoSBN/grupos-genericos-catalogo-sbn/grupos-genericos-catalogo-sbn.component';
import { GruposGenericosFormCatalogoSBNComponent } from './componentes/catalogoSBN/grupos-genericos-form-catalogo-sbn/grupos-genericos-form-catalogo-sbn.component';
import { ClasesGenericosCatalogoSBNComponent } from './componentes/catalogoSBN/clases-genericos-catalogo-sbn/clases-genericos-catalogo-sbn.component';
import { ClasesGenericosFormCatalogoSBNComponent } from './componentes/catalogoSBN/clases-genericos-form-catalogo-sbn/clases-genericos-form-catalogo-sbn.component';
import { GrupoClaseGenericosFormCatalogoSBNComponent } from './componentes/catalogoSBN/grupo-clase-genericos-form-catalogo-sbn/grupo-clase-genericos-form-catalogo-sbn.component';
import { GrupoClaseGenericosCatalogoSBNComponent } from './componentes/catalogoSBN/grupo-clase-genericos-catalogo-sbn/grupo-clase-genericos-catalogo-sbn.component';
import { CatalogoCatalogoSBNComponent } from './componentes/catalogoSBN/catalogo-catalogo-sbn/catalogo-catalogo-sbn.component';
import { CatalogoFormCatalogoSBNComponent } from './componentes/catalogoSBN/catalogo-form-catalogo-sbn/catalogo-form-catalogo-sbn.component';
import { MarcasTablasGeneralesComponent } from './componentes/tablasGenerales/marcas-tablas-generales/marcas-tablas-generales.component';
import { MarcasFormTablasGeneralesComponent } from './componentes/tablasGenerales/marcas-form-tablas-generales/marcas-form-tablas-generales.component';
import { ModelosTablasGeneralesComponent } from './componentes/tablasGenerales/modelos-tablas-generales/modelos-tablas-generales.component';
import { ModelosFormTablasGeneralesComponent } from './componentes/tablasGenerales/modelos-form-tablas-generales/modelos-form-tablas-generales.component';
import { TiposTablasGeneralesComponent } from './componentes/tablasGenerales/tipos-tablas-generales/tipos-tablas-generales.component';
import { TiposFormTablasGeneralesComponent } from './componentes/tablasGenerales/tipos-form-tablas-generales/tipos-form-tablas-generales.component';
import { DocumentosTablasGeneralesComponent } from './componentes/tablasGenerales/documentos-tablas-generales/documentos-tablas-generales.component';
import { DocumentosFormTablasGeneralesComponent } from './componentes/tablasGenerales/documentos-form-tablas-generales/documentos-form-tablas-generales.component';
import { CatalogoNoPatrimonialTablasGeneralesComponent } from './componentes/tablasGenerales/catalogo-no-patrimonial-tablas-generales/catalogo-no-patrimonial-tablas-generales.component';
import { CatalogoNoPatrimonialFormTablasGeneralesComponent } from './componentes/tablasGenerales/catalogo-no-patrimonial-form-tablas-generales/catalogo-no-patrimonial-form-tablas-generales.component';
import { PlanFormTablasGeneralesComponent } from './componentes/tablasGenerales/plan-form-tablas-generales/plan-form-tablas-generales.component';
import { PlanTablasGeneralesComponent } from './componentes/tablasGenerales/plan-tablas-generales/plan-tablas-generales.component';
import { BienesBienesComponent } from './componentes/bienes/bienesBienes/bienes-bienes.component';
import { BienesFormBienesComponent } from './componentes/bienes/bienes-form-bienes/bienes-form-bienes.component';



import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DocumentosTramiteTablasGeneralesComponent } from './componentes/tablasGenerales/documentos-tramite-tablas-generales/documentos-tramite-tablas-generales.component';
import { DocumentosTramiteFormTablasGeneralesComponent } from './componentes/tablasGenerales/documentos-tramite-form-tablas-generales/documentos-tramite-form-tablas-generales.component';
import { OcTablasGeneralesComponent } from './componentes/tablasGenerales/oc-tablas-generales/oc-tablas-generales.component';
import { OcFormTablasGeneralesComponent } from './componentes/tablasGenerales/oc-form-tablas-generales/oc-form-tablas-generales.component';
import { OcItemFormTablasGeneralesComponent } from './componentes/tablasGenerales/oc-item-form-tablas-generales/oc-item-form-tablas-generales.component';
import { OcItemTablasGeneralesComponent } from './componentes/tablasGenerales/oc-item-tablas-generales/oc-item-tablas-generales.component';
import { DesplazamientoBienesComponent } from './componentes/bienes/desplazamiento-bienes/desplazamiento-bienes.component';
import { DesplazamientoFormBienesComponent } from './componentes/bienes/desplazamiento-form-bienes/desplazamiento-form-bienes.component';
import { EmpleadosTablaGeneralesComponent } from './componentes/tablasGenerales/empleados-tabla-generales/empleados-tabla-generales.component';
import { EmpleadosFormTablaGeneralesComponent } from './componentes/tablasGenerales/empleados-form-tabla-generales/empleados-form-tabla-generales.component';
import { CentroCostoTablaGeneralesComponent } from './componentes/tablasGenerales/centro-costo-tabla-generales/centro-costo-tabla-generales.component';
import { CentroCostoFormTablaGeneralesComponent } from './componentes/tablasGenerales/centro-costo-form-tabla-generales/centro-costo-form-tabla-generales.component';
import { CentroCostoEmpleadoTablaGeneralesComponent } from './componentes/tablasGenerales/centro-costo-empleado-tabla-generales/centro-costo-empleado-tabla-generales.component';
import { CentroCostoEmpleadoFormTablaGeneralesComponent } from './componentes/tablasGenerales/centro-costo-empleado-form-tabla-generales/centro-costo-empleado-form-tabla-generales.component';

import { DocVerificacionBienesComponent } from './componentes/bienes/doc-verificacion-bienes/doc-verificacion-bienes.component';
import { DocVerificacionFormBienesComponent } from './componentes/bienes/doc-verificacion-form-bienes/doc-verificacion-form-bienes.component';
import { DependeciaUbicacionComponent } from './componentes/ubicacion/dependecia-ubicacion/dependecia-ubicacion.component';
import { VerificarBienesComponent } from './componentes/bienes/verificar-bienes/verificar-bienes.component';
import { BajaFormBienesComponent } from './componentes/bienes/baja-form-bienes/baja-form-bienes.component';
import { MoverFormBienesComponent } from './componentes/bienes/mover-form-bienes/mover-form-bienes.component';
import { AsignarFormBienesComponent } from './componentes/bienes/asignar-form-bienes/asignar-form-bienes.component';

/*** */
import { PorDependenciaReportesComponent } from './componentes/reportes/por-dependencia-reportes/por-dependencia-reportes.component';
import { PorDepenSubdepenReporteComponent } from './componentes/reportes/por-depen-subdepen-reporte/por-depen-subdepen-reporte.component';
import { PorDepenSubdepenEmpleReporteComponent } from './componentes/reportes/por-depen-subdepen-emple-reporte/por-depen-subdepen-emple-reporte.component';
import { PorUbicacionEmpleadoReporteComponent } from './componentes/reportes/por-ubicacion-empleado-reporte/por-ubicacion-empleado-reporte.component';
import { post } from 'selenium-webdriver/http';
import { PorEmpleadoReporteComponent } from './componentes/reportes/por-empleado-reporte/por-empleado-reporte.component';
import { PorPlanContableComponent } from './componentes/reportes/por-plan-contable/por-plan-contable.component';
import { PorBienesNoDepreciablesComponent } from './componentes/reportes/por-bienes-no-depreciables/por-bienes-no-depreciables.component';
import { PorBienesDepreciablesComponent } from './componentes/reportes/por-bienes-depreciables/por-bienes-depreciables.component';
/*** */



const routes: Routes = [    
  {
  path: 'locales',
  component: LocalesUbicacionComponent,
  },
  {
    path: 'areas',
    component: AreasUbicacionComponent,
  },
  {
    path: 'oficinas',
    component: OficinasUbicacionComponent,
  },
  {
    path: 'local/:id',
    component: LocalDetallesUbicacionComponent,
  },


  {
    path: 'catalogoSBN/grupos',
    component: GruposGenericosCatalogoSBNComponent,
  },
  {
    path: 'catalogoSBN/clases',
    component: ClasesGenericosCatalogoSBNComponent,
  },
  {
    path: 'catalogoSBN/grupos_clases',
    component: GrupoClaseGenericosCatalogoSBNComponent,
  },
  {
    path: 'catalogoSBN/catalogo',
    component: CatalogoCatalogoSBNComponent,
  },

  {
    path: 'tablasGenerales/marcas',
    component: MarcasTablasGeneralesComponent,
  },
  {
    path: 'tablasGenerales/modelos',
    component: ModelosTablasGeneralesComponent,
  },

  {
    path: 'tablasGenerales/tipos',
    component: TiposTablasGeneralesComponent,
  },


  {
    path: 'tablasGenerales/documentos',
    component: DocumentosTablasGeneralesComponent,
  },

  {
    path: 'tablasGenerales/catalogos_no_patrimonial',
    component: CatalogoNoPatrimonialTablasGeneralesComponent,
  },

  {
    path: 'tablasGenerales/planes',
    component: PlanTablasGeneralesComponent,
  },


  {
    path: 'bienes/bienes',
    component: BienesBienesComponent,
  },

  {
    path: 'bienes/desplazamiento',
    component: DesplazamientoBienesComponent,
  },

  {
    path: 'tablasGenerales/documentos_tramite',
    component: DocumentosTramiteTablasGeneralesComponent,
  },

  
  {
    path: 'tablasGenerales/oc',
    component: OcTablasGeneralesComponent,
  },
  {
    path: 'tablasGenerales/items_oc',
    component: OcItemTablasGeneralesComponent,
  },

  {
    path: 'tablasGenerales/empleados',
    component: EmpleadosTablaGeneralesComponent,
  },

  {
    path: 'tablasGenerales/centro_costo',
    component: CentroCostoTablaGeneralesComponent,
  },

  {
    path: 'tablasGenerales/centro_costo_empleado',
    component: CentroCostoEmpleadoTablaGeneralesComponent,
  },
  {
    path: 'bienes/verificacion',
    component: DocVerificacionBienesComponent,
  },

  {
    path: 'ubicacion/dependecia',
    component: DependeciaUbicacionComponent,
  },
  {
    path: 'bienes/verificar',
    component: VerificarBienesComponent,
  },

  
  //salvacho
  {
    path: 'reportes/por_dependecia',
    component: PorDependenciaReportesComponent,
  },
  {
    path: 'reportes/por_dependecia_subdependencia',
    component: PorDepenSubdepenReporteComponent,
  },
  {
    path: 'reportes/por_dependecia_sub_empleado',         
    component: PorDepenSubdepenEmpleReporteComponent,
  },
  {
   path: 'reportes/por_dependecia_empleado/:idDepe/:idSubepe/:NameDepe/:NameSubepe',
    component: PorUbicacionEmpleadoReporteComponent,
  },
  {
   path: 'reportes/por_empleado',
   component: PorEmpleadoReporteComponent,
  },
  {
   path: 'reportes/por_bien_noDepreciable',
   component: PorBienesNoDepreciablesComponent,
  },
  {
   path: 'reportes/por_plan-contable',
   component: PorPlanContableComponent,
  }

  
  //salvacho


  
];

@NgModule({
 
  imports: [
    RouterModule.forChild(routes),
    CommonModule,    
    NgbModule,
    DatePickerModule,
    GridAllModule,
    ToolbarModule,
    //DataManager,
    FontAwesomeModule,
    ButtonModule,
    CheckBoxModule,
    RadioButtonModule,
    SwitchModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TabModule,
    DropDownListModule,
    MultiSelectModule,
    MaskedTextBoxModule,
    TextBoxModule,
    SwitchModule 
  ],
  exports: [RouterModule],
  declarations: [LocalesUbicacionComponent, LocalDetallesUbicacionComponent, AreasUbicacionComponent, AreaFormUbicacionComponent, OficinasUbicacionComponent, OficinaFormUbicacionComponent, GruposGenericosCatalogoSBNComponent, GruposGenericosFormCatalogoSBNComponent, ClasesGenericosCatalogoSBNComponent, ClasesGenericosFormCatalogoSBNComponent, GrupoClaseGenericosFormCatalogoSBNComponent, GrupoClaseGenericosCatalogoSBNComponent, CatalogoCatalogoSBNComponent, CatalogoFormCatalogoSBNComponent, MarcasTablasGeneralesComponent, MarcasFormTablasGeneralesComponent, ModelosTablasGeneralesComponent, ModelosFormTablasGeneralesComponent, TiposTablasGeneralesComponent, TiposFormTablasGeneralesComponent, DocumentosTablasGeneralesComponent, DocumentosFormTablasGeneralesComponent, CatalogoNoPatrimonialTablasGeneralesComponent, CatalogoNoPatrimonialFormTablasGeneralesComponent, PlanFormTablasGeneralesComponent, PlanTablasGeneralesComponent, BienesBienesComponent, BienesFormBienesComponent, DocumentosTramiteTablasGeneralesComponent, DocumentosTramiteFormTablasGeneralesComponent, OcTablasGeneralesComponent, OcFormTablasGeneralesComponent, OcItemFormTablasGeneralesComponent, OcItemTablasGeneralesComponent, DesplazamientoBienesComponent, DesplazamientoFormBienesComponent, EmpleadosTablaGeneralesComponent, EmpleadosFormTablaGeneralesComponent, CentroCostoTablaGeneralesComponent, CentroCostoFormTablaGeneralesComponent, CentroCostoEmpleadoTablaGeneralesComponent, CentroCostoEmpleadoFormTablaGeneralesComponent, DocVerificacionBienesComponent, DocVerificacionFormBienesComponent, DependeciaUbicacionComponent, VerificarBienesComponent, BajaFormBienesComponent, MoverFormBienesComponent, AsignarFormBienesComponent,PorDependenciaReportesComponent,PorDepenSubdepenReporteComponent,PorDepenSubdepenEmpleReporteComponent,PorUbicacionEmpleadoReporteComponent,PorEmpleadoReporteComponent, PorPlanContableComponent, PorBienesNoDepreciablesComponent, PorBienesDepreciablesComponent],
  providers: [FilterService, PageService]
 
})
export class subModulosRutasModule { }
