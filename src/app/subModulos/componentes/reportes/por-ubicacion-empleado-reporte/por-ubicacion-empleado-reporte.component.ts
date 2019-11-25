import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';

import { UbicaionEmpeadoReportInterface } from 'src/app/subModulos/interfaces/reportes/ubicacion-empleado';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-por-ubicacion-empleado-reporte',
  templateUrl: './por-ubicacion-empleado-reporte.component.html',
  styleUrls: ['./por-ubicacion-empleado-reporte.component.scss']
})
export class PorUbicacionEmpleadoReporteComponent implements OnInit {
  //PorDepenSubdepenEmpleReporteComponent=0;
  public ubicacionEmpelado:UbicaionEmpeadoReportInterface;
  public iDepend;
  public iSubDepe;
  public nameDepend;
  public nameSubDepe;
  public dataEmpelado;
  public dataBienes:BienReportInterface[];
  //public dataBienes :Object[];
  public EmpeladoMark: string = 'Seleccione un Empleado';
  public empleadoFields: Object = { text:'empleado',value: 'idCentroCostoEmpleado' };
  public filterPlaceholder: string = 'Search';

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('cDepenNombre', 'contains', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dataEmpelado, query);
}
  @ViewChild('CentroCostoList',{static: true})
  // country DropDownList instance
  public EmpleadoaObj: DropDownListComponent;

  

  constructor(private route: ActivatedRoute, private dataEmpleApi:ApiReporteService,private DocGenReport:DocumentoReportService ) { }

  public onChange(): void {         
    this.EmpleadoaObj.enabled = true;
    // query the data source based on country DropDownList selected value
    let tempQuery: Query = new Query().where('iDepenId', 'equal', this.iDepend.value);
    this.EmpleadoaObj.query = tempQuery;
    this.EmpleadoaObj.text = null;
    this.EmpleadoaObj.dataBind();
    console.log()
 }
 
 public Ok: EmitType<object> = () => {  
    
}

 @ViewChild('DependenciaFiltroForm',{static: true}) form: any;//fromulario

  ngOnInit() {
   
    
    this.route.paramMap.subscribe(params=>{
     
      this.iSubDepe=params.get('idSubepe');
      this.nameDepend=params.get('NameDepe');
      this.nameSubDepe=params.get('NameSubepe');
      this.ubicacionEmpelado={
        iDepenId :params.get('idDepe') ,
        cDepenNombre  : params.get('NameDepe'),
        iCentroCostoId : params.get('idSubepe'),
        cCentroCostoNombre :params.get('NameSubepe'),
        idCentroCostoEmpleado : '' ,
        empleadoNombre:""
    }

    });
    this.dataEmpleApi.getUbicacionPorDepenaEmp(this.ubicacionEmpelado.iDepenId,this.ubicacionEmpelado.iCentroCostoId).subscribe((respon)=>{ this.dataEmpelado=respon; }); 
    //console.log("dataEmpleadoApi",this.dataEmpelado)
  }
  public OkDependenciaFiltro(): void {
    this.ubicacionEmpelado.empleadoNombre=this.EmpleadoaObj.text;
    this.dataEmpleApi.getUbicacionPorCentroCostoBienes(this.ubicacionEmpelado.idCentroCostoEmpleado).subscribe((respon)=>{ 
      
    console.log(this.ubicacionEmpelado.iCentroCostoId);
    this.dataBienes=respon;
    if(this.ubicacionEmpelado.iCentroCostoId == ''){
      pdfMake.createPdf(this.DocGenReport.documento(this.ubicacionEmpelado,3,this.dataBienes)).open();
    }else{
      pdfMake.createPdf(this.DocGenReport.documento(this.ubicacionEmpelado,4,this.dataBienes)).open();
    }
    
    
    }); 
    
    
     
  }

}

//// getUbicacionPorDepenaEmp