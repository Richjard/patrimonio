import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DependenciaInterface } from 'src/app/subModulos/interfaces/tablasGenerales/dependencia-tablasGenerales-interface';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { UbicaionEmpeadoReportInterface } from 'src/app/subModulos/interfaces/reportes/ubicacion-empleado';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';


import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-por-dependencia-reportes',
  templateUrl: './por-dependencia-reportes.component.html',
  styleUrls: ['./por-dependencia-reportes.component.scss']
})
export class PorDependenciaReportesComponent implements OnInit {
  public faCheckCircle=faCheckCircle;
  public DependenciaFiltro:DependenciaInterface;
  public dataDependencia;
  public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
  // set the height of the popup element
  public height: string = '200px';
  // set the placeholder to DropDownList input element
  public DependenciaMark: string = 'Seleccione una dependencia';
  public ubicacionEmpelado:UbicaionEmpeadoReportInterface;
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
  
  constructor(private dataApi:DependenciaService, private dataApiReportPorDepndencia:ApiReporteService,private DocGenReport:DocumentoReportService) { }

  @ViewChild('DependenciaList',{static: true})
// country DropDownList instance
public dependenciaObj: DropDownListComponent;



  public Ok: EmitType<object> = () => {   
    console.log("imprimiendo....");
    console.log(this.dependenciaObj.value);
    console.log(this.dependenciaObj.text);
    this.ubicacionEmpelado={
      iDepenId : ''+this.dependenciaObj.value,
      cDepenNombre  : this.dependenciaObj.text,
      iCentroCostoId : '',
      cCentroCostoNombre :'',
      idCentroCostoEmpleado : '' ,
      empleadoNombre:''
  }
    this.dataApiReportPorDepndencia.getUbicacionPorDepdenciaBines(this.dependenciaObj.value).subscribe((respon)=>{
      
      this.dataBienes=respon;
      pdfMake.createPdf(this.DocGenReport.documento(this.ubicacionEmpelado,1,this.dataBienes)).open();
     // pdfMake.createPdf(this.DocumentoPorDependendicia(items_)).open();
    }); 
    
 }



 @ViewChild('DependenciaFiltroForm',{static: true}) form: any;//fromulario

  ngOnInit() {
    this.DependenciaFiltro = {
      iDepenId: '',
      cDepenNombre: ''
    };
    this.dataApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; });  
  }

}
