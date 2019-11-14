import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';


import {VerificarBienSyService} from '../../../servicios/bienes/verificar_bienes.sy.service'
import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { DependinciaFiltroInterface } from 'src/app/subModulos/interfaces/ubicacion/dependencia_filtro-ubicacion-interface'


@Component({
  selector: 'app-verificar-bienes',
  templateUrl: './verificar-bienes.component.html',
  styleUrls: ['./verificar-bienes.component.scss']
})
export class VerificarBienesComponent implements OnInit {


  @ViewChild('grid',{static: true})
  public grid: GridComponent;
  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public pageSettings: Object;
  public state: DataStateChangeEventArgs;
  
  public DependenciaFiltro:DependinciaFiltroInterface;
  constructor(private service:VerificarBienSyService ) { 

    this.data = service;
  }
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.service.execute(state,this.DependenciaFiltro);
  }
  
  ngOnInit() {
   
    

  }

  
  public ok_filtroDependencia(DependenciaFiltro:DependinciaFiltroInterface){  
    this.pageOptions = { pageSize: 15, pageCount: 4 };
    let state = { skip: 0, take: 15 };
    this.service.execute(state,DependenciaFiltro);
  }
   
}
