
import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { MarcaInterface } from 'src/app/subModulos/interfaces/tablasGenerales/marca-tablasGenerales-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-marcas-form-tablas-generales',
  templateUrl: './marcas-form-tablas-generales.component.html',
  styleUrls: ['./marcas-form-tablas-generales.component.scss']
})
export class MarcasFormTablasGeneralesComponent implements OnInit {
  @Input("datosMarca") Marca:MarcaInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<MarcaInterface> = new EventEmitter<MarcaInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('MarcaForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarMarca(): void {
  this.devuelve_hijo.emit(this.Marca);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.Marca = {
    iMarcaId : '*autogenerado',
    cMarcaDescripcion:""
  };
}


}
