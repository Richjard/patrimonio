import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';

import {ActivatedRoute,Params} from '@angular/router'
import { LocalInterface } from 'src/app/subModulos/interfaces/ubicacion/local-ubicacion-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-local-detalles-ubicacion',
  templateUrl: './local-detalles-ubicacion.component.html',
  styleUrls: ['./local-detalles-ubicacion.component.scss']
})
export class LocalDetallesUbicacionComponent implements OnInit {
  @Input() id_Local_I: string;
  @Input() json_: string;
  @Input("datosLocal") local:LocalInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<LocalInterface> = new EventEmitter<LocalInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('userForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }

  getDetalles(id:string){
   
  }


@ViewChild('formElement',{static: true}) element: any;

public GuardarLocal(): void {
  console.log("emitiendo....");
  //this.borrar.emit(5);
  this.devuelve_hijo.emit(this.local);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  
 //this.dialogObj.show();
 console.log("loca desssssss:::"+this.local.cLocalDescripcion);
 console.log("loca opcion:::"+this.op);
  this.form.reset();
  this.local = {
    iLocalId: '*autogenerado',
    cLocalDescripcion: '',
  };
}


}
