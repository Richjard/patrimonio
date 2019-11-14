import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';

import {ActivatedRoute,Params} from '@angular/router'
import { GrupoGenInterface } from 'src/app/subModulos/interfaces/catalogoSBN/grupoGen-catalogoSBN-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grupos-genericos-form-catalogo-sbn',
  templateUrl: './grupos-genericos-form-catalogo-sbn.component.html',
  styleUrls: ['./grupos-genericos-form-catalogo-sbn.component.scss']
})
export class GruposGenericosFormCatalogoSBNComponent implements OnInit {
  @Input() id_Local_I: string;
  @Input() json_: string;
  @Input("datosGrupoGen") grupoGen:GrupoGenInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<GrupoGenInterface> = new EventEmitter<GrupoGenInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('grupoGenForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarGrupoGen(): void {
  this.devuelve_hijo.emit(this.grupoGen);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.grupoGen = {
    iGrupoGenId : '*autogenerado',
    cGrupoGenCodigo:"",
    cGrupoGenDescripcion :""
  };
}


}
