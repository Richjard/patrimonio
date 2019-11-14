import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';

import {ActivatedRoute,Params} from '@angular/router'
import { ClaseGenInterface } from 'src/app/subModulos/interfaces/catalogoSBN/ClaseGen-catalogoSBN-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clases-genericos-form-catalogo-sbn',
  templateUrl: './clases-genericos-form-catalogo-sbn.component.html',
  styleUrls: ['./clases-genericos-form-catalogo-sbn.component.scss']
})
export class ClasesGenericosFormCatalogoSBNComponent implements OnInit {
  @Input() id_Local_I: string;
  @Input() json_: string;
  @Input("datosClaseGen") ClaseGen:ClaseGenInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<ClaseGenInterface> = new EventEmitter<ClaseGenInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('ClaseGenForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarClaseGen(): void {
  this.devuelve_hijo.emit(this.ClaseGen);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.ClaseGen = {
    iClaseGenId : '*autogenerado',
    cClaseGenCodigo:"",
    cClaseGenDescripcion :""
  };
}


}
