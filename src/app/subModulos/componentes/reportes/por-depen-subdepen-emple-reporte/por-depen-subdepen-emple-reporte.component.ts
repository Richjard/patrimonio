import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DependenciaInterface } from 'src/app/subModulos/interfaces/tablasGenerales/dependencia-tablasGenerales-interface';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { rippleEffect,EmitType, queryParams } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { CentroCostoService } from 'src/app/subModulos/servicios/tablas_generales/centro_costo.service';
import { EmpleadosService } from 'src/app/subModulos/servicios/tablas_generales/empleados.service';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { query } from '@angular/animations';
@Component({
  selector: 'app-por-depen-subdepen-emple-reporte',
  templateUrl: './por-depen-subdepen-emple-reporte.component.html',
  styleUrls: ['./por-depen-subdepen-emple-reporte.component.scss']
})
export class PorDepenSubdepenEmpleReporteComponent implements OnInit {
  public faCheckCircle=faCheckCircle;
  public DependenciaFiltro:DependenciaInterface;
  public dataDependencia;
  public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
  public dataCentroCosto;
  public CentroCostoFields: Object = { text:'cCentroCostoNombre',value: 'iCentroCostoId' };

  // set the height of the popup element
  public height: string = '200px';
  // set the placeholder to DropDownList input element
  public DependenciaMark: string = 'Seleccione una dependencia';
  public CentroCostoMark: string = 'Seleccione una Sub Dependencias';
  
  public filterPlaceholder: string = 'Search';
  public dataBienes :Object[];
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
      let query: Query = new Query();
      //frame the query based on search string with filter type.
      query = (e.text !== '') ? query.where('cDepenNombre', 'contains', e.text, true) : query;
      //pass the filter data source, filter query to updateData method.
      e.updateData(this.dataDependencia, query);
  }


  constructor( private ruta:Router,private dataApi:DependenciaService, private dataApiReportPorDepndencia:ApiReporteService,private dataApiCentroCosto: CentroCostoService, private dataApiCentroCostoEmpleado:CentroCostoService) { }



  public Ok: EmitType<object> = () => {  
    
    if(this.CentroCostoObj.value==null){
      this.CentroCostoObj.value=0;
      this.CentroCostoObj.text=" "; 
      this.ruta.navigate(["subModulos/reportes/por_dependecia_empleado/",this.dependenciaObj.value,this.CentroCostoObj.value,this.dependenciaObj.text,this.CentroCostoObj.text]);
      //console.log("solo Dependencia....");
      //console.log(this.dependenciaObj.value);
    }else{
      this.ruta.navigate(["subModulos/reportes/por_dependecia_empleado/",this.dependenciaObj.value,this.CentroCostoObj.value,this.dependenciaObj.text,this.CentroCostoObj.text]);
     // console.log("imprimiendo ....");
      //console.log(this.dependenciaObj.value);
      //console.log(this.CentroCostoObj.value);
    }
  }




  @ViewChild('DependenciaList',{static: true})
  // country DropDownList instance
  public dependenciaObj: DropDownListComponent;
  @ViewChild('CentroCostoList',{static: true})
  // state DropDownList instance
  public CentroCostoObj: DropDownListComponent;
  
  public onChange1(): void {   
          
    this.CentroCostoObj.enabled = true;
    // query the data source based on country DropDownList selected value
    let tempQuery: Query = new Query().where('iDepenId', 'equal', this.dependenciaObj.value);
    this.CentroCostoObj.query = tempQuery;
    this.CentroCostoObj.text = null;
    this.CentroCostoObj.dataBind();
 }
 
  @Output() devuelve_hijo:EventEmitter<DependenciaInterface> = new EventEmitter<DependenciaInterface>()
 
  // @ViewChild('DependenciaFiltroForm',{static: true}) form: any;
@ViewChild('DependenciaFiltroForm',{static: true}) form: any;//fromulario

  ngOnInit() {
    this.DependenciaFiltro = {
      iDepenId: '',
      cDepenNombre: ''
    };
    this.dataApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; }); 
    this.dataApiCentroCosto.getCombo().subscribe((respon)=>{ this.dataCentroCosto=respon; });  
    
  }
  public OkDependenciaFiltro(): void {
    this.devuelve_hijo.emit(this.DependenciaFiltro);
   // this.cerrar_modal.emit(this.op); 
   // this.Dialog.hide(); 
   // this.onFormSubmit();*/
     
  }
}
