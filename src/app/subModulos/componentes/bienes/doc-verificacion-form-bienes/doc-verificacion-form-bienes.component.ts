
import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { AniosService } from 'src/app/subModulos/servicios/tablas_generales/anios.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { DocVerificacionBienesInterface } from 'src/app/subModulos/interfaces/bienes/docVerificacion-bienes-interface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'

@Component({
  selector: 'app-doc-verificacion-form-bienes',
  templateUrl: './doc-verificacion-form-bienes.component.html',
  styleUrls: ['./doc-verificacion-form-bienes.component.scss']
})
export class DocVerificacionFormBienesComponent implements OnInit {


  public date: Date = new Date();  
  public dateYear=this.date.getFullYear();  
public dataYears;
public yearFields: Object = { text:'iYearId',value: 'iYearId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public yearMark: string = 'Seleccione una cargo';
@ViewChild('CargoList',{static: true})
// country DropDownList instance
public CargoList: DropDownListComponent;

  @Input("datosDocVerificacion") DocVerificacion:DocVerificacionBienesInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DocVerificacionBienesInterface> = new EventEmitter<DocVerificacionBienesInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('DocVerificacionForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 









    skillForm: FormGroup;

  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataAnioApi:AniosService,private route:ActivatedRoute) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataAnioApi.getCombo().subscribe((respon)=>{ this.dataYears=respon; });  

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarDocVerificacion (): void {
  this.devuelve_hijo.emit(this.DocVerificacion);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}
public onFormSubmit(): void {
  //this.form.reset();
 

  this.DocVerificacion = {      
    iYearId : this.dateYear,
    cDocVerBienDocRef :'',  
    dDocVerBienFechaInicio :'',
    dDocVerBienFechaFin : '',
    dDocVerBienEstado : '',
    cDocVerBienObs : ''  
  };
 
  //this.FormaAdqList.text="1777777";
}




}


