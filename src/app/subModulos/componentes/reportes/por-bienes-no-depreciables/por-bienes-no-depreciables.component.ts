import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
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
      nBienValor : 0
    }
    this.dataApiBien.getDataBienNoDepreciable().subscribe((respon)=>{ this.dataBienes=respon;
      console.log(this.dataBienes);
    }); 
  }


}
