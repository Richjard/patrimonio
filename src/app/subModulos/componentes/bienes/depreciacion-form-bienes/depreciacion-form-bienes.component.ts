


import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { CargosService } from 'src/app/subModulos/servicios/tablas_generales/cargos.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import {DepreciacionBienesInterface} from './../../../interfaces/bienes/depreciacion-bienes-interface';

import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'


@Component({
  selector: 'app-depreciacion-form-bienes',
  templateUrl: './depreciacion-form-bienes.component.html',
  styleUrls: ['./depreciacion-form-bienes.component.scss']
})
export class DepreciacionFormBienesComponent implements OnInit {

  private textSelectDocumentoTramite:string;
  private idSelectDocumentoTramite="null";
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataCargos;
public CargoFields: Object = { text:'cCargNombre',value: 'iCargId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public CargoMark: string = 'Seleccione una cargo';
@ViewChild('CargoList',{static: true})
// country DropDownList instance
public CargoList: DropDownListComponent;

  @Input("datosBien") BienDepreciacion:DepreciacionBienesInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DepreciacionBienesInterface> = new EventEmitter<DepreciacionBienesInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('BienDepreciacionForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 









    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:CargosService,private route:ActivatedRoute) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataCargos=respon; });  

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarBienBaja(): void {
  this.devuelve_hijo.emit(this.BienDepreciacion);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  //this.onFormSubmit();
   
}


onKeyupVidaUtil(){
  this.BienDepreciacion.nBienTasaDepreciacion=100/this.BienDepreciacion.iBienVidaUtil;
  
  let fechaFin=this.addDays(  this.BienDepreciacion.dBienInicioVida,this.BienDepreciacion.iBienVidaUtil*365);
 
    let dia=this.PadLeft( fechaFin.getDay(),2);
    let mes=this.PadLeft( fechaFin.getMonth(),2);
    this.BienDepreciacion.dBienFinVida =fechaFin.getFullYear()+'-'+mes+'-'+dia; 
    //dd-MM-yyyy 
    console.log("dfecha::"+fechaFin.getFullYear()+'-'+mes+'-'+dia);

}

onKeyupVCuota(){
  this.BienDepreciacion.nBienValorDepreciacion=this.BienDepreciacion.nBienValor-this.BienDepreciacion.nBienCuotaSalvamiento;
}

addDays(date: Date, days: number): Date {
  date = new Date(date);
  console.log("fecha inicio vida:"+date);
  date.setDate(date.getDate() + days);
  console.log(date);
  return date;
}

PadLeft(value, length) {
  return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
  value;
}
}


