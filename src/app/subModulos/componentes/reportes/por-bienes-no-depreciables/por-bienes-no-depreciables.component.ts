import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';


import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-por-bienes-no-depreciables',
  templateUrl: './por-bienes-no-depreciables.component.html',
  styleUrls: ['./por-bienes-no-depreciables.component.scss']
})
export class PorBienesNoDepreciablesComponent implements OnInit {
  public faCheckCircle=faCheckCircle;
  public height: string = '200px';
  public BienNoDepreciableFiltro : BienReportInterface;
  public dataBienes:Object[];


  /*
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('iYearId', 'contains', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dataBienes, query);
}*/

  constructor(private dataApiBien:ApiReporteService,private DocGenReport:DocumentoReportService) { }
  public Ok: EmitType<object> = () => {   
    console.log("imprimiendo....");

    pdfMake.createPdf(this.DocGenReport.documento3(this.dataBienes)).open();
        
 }

 @ViewChild('NoDepreciableFiltroForm',{static: true}) form: any;//fromulario

  ngOnInit() {
    this.BienNoDepreciableFiltro = {
      cBienCodigo : '',
      cBienDescripcion  : '',
      cBienSerie : '',
      cBienDimension : '',
      cEstadoBienAbre : '',
      cTipoDescripcion : '',
      cModeloDescripcion : '',
      cMarcaDescripcion : '',
      iDespBienId : '',
      dDespBienFecha : '',
      nBienValor : ''
    }
    this.dataApiBien.getDataBienNoDepreciable().subscribe((respon)=>{ this.dataBienes=respon;
      console.log(this.dataBienes);
    }); 
  }


}
