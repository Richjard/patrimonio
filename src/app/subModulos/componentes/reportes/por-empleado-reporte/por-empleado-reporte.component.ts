import { Component, OnInit , ViewChild} from '@angular/core';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { EmpleadoInterface } from 'src/app/subModulos/interfaces/reportes/EmpleadoReport-interface';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { UbicaionCentroCOsto } from 'src/app/subModulos/interfaces/reportes/ubicacion-CentroCosto';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-por-empleado-reporte',
  templateUrl: './por-empleado-reporte.component.html',
  styleUrls: ['./por-empleado-reporte.component.scss']
})
export class PorEmpleadoReporteComponent implements OnInit {
  public faCheckCircle=faCheckCircle;
  public EmpleadoMark: string = 'Seleccione un Empleado';
  public dataEmpleado;
  public EmpleadoFields: Object = { text:'empleado',value: 'iEmpleadoId' };
  public filterPlaceholder: string = 'Buscar';
  public EmpleadoFiltro:EmpleadoInterface;
  public height: string = '200px';
  public dataCentroCostos;
  @ViewChild('EmpleadoList',{static: true})
  public EmpleadoObj: DropDownListComponent;

  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('empleado', 'contains', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dataEmpleado, query);
  }
  public CentroCosto:UbicaionCentroCOsto[];

  constructor(private dataApiEmpleado:ApiReporteService,private dataApiCentroCosto: ApiReporteService,private DocGenReport:DocumentoReportService) {

   }
   @ViewChild('EmpleadoFiltroForm',{static: true}) form: any;//fromulario
   
  

  public Ok: EmitType<object> = () => {   
    //console.log("id empleado "+this.EmpleadoObj.value);
    console.log(this.EmpleadoObj.text);
   
   
    this.dataApiCentroCosto.getDataCentroCosto(this.EmpleadoObj.value).subscribe((respon)=>{
      
      
     let total;
      for (var item_ of respon) { 
       //console.log("data::::",item_['bienes']);
       //console.log("total::::",item_['bienes'].length);
      }
  
      
      pdfMake.createPdf(this.DocGenReport.documento2(respon)).open();

    }); 
    
 }



  ngOnInit() {
    
    this.EmpleadoFiltro = {
      iEmpleadoId : '',
      cNombreEmpleado: ''
    };
    this.dataApiEmpleado.getUbicacionEmpleado().subscribe((respon)=>{ this.dataEmpleado=respon; }); 

  }


}
