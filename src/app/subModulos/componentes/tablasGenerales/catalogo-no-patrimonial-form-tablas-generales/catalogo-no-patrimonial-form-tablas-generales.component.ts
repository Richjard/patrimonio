import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { CatalogoNoPatrimonialInterface } from 'src/app/subModulos/interfaces/tablasGenerales/catalogoNoPatrimonial-tablasGenerales-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-catalogo-no-patrimonial-form-tablas-generales',
  templateUrl: './catalogo-no-patrimonial-form-tablas-generales.component.html',
  styleUrls: ['./catalogo-no-patrimonial-form-tablas-generales.component.scss']
})
export class CatalogoNoPatrimonialFormTablasGeneralesComponent implements OnInit {
  @Input("datosCatalogoNoPat") CatalogoNoPat:CatalogoNoPatrimonialInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<CatalogoNoPatrimonialInterface> = new EventEmitter<CatalogoNoPatrimonialInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('CatalogoNoPatForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarCatalogoNoPat(): void {
  this.devuelve_hijo.emit(this.CatalogoNoPat);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.CatalogoNoPat = {
    iCatalogoNoPatId : '*autogenerado',
    cCatalogoNoPatDescripcion:"",
    cCatalogoNoPatCodigo:"0000XXXXXXX"
  };
}


}
