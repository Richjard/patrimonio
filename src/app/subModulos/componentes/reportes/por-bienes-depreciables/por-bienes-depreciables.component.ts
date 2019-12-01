import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';

import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-por-bienes-depreciables',
  templateUrl: './por-bienes-depreciables.component.html',
  styleUrls: ['./por-bienes-depreciables.component.scss']
})
export class PorBienesDepreciablesComponent implements OnInit {
  public faCheckCircle=faCheckCircle;

  
  constructor() { }

  ngOnInit() {
  }

}
