
import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { CentroCostoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/centro_costo-tablasGenerales-interface'
import { CentroCostoService } from 'src/app/subModulos/servicios/tablas_generales/centro_costo.service';
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'

@Component({
  selector: 'app-centro-costo-form-tabla-generales',
  templateUrl: './centro-costo-form-tabla-generales.component.html',
  styleUrls: ['./centro-costo-form-tabla-generales.component.scss']
})
export class CentroCostoFormTablaGeneralesComponent implements OnInit {

  private textSelectDocumentoTramite:string;
  private idSelectDocumentoTramite="null";
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataDependencia;
public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public DependenciaMark: string = 'Seleccione una dependencia';
@ViewChild('DependenciaList',{static: true})
// country DropDownList instance
public DependenciaList: DropDownListComponent;




public dataCentroCosto;
public CentroCostoFields: Object = { text:'cCentroCostoNombre',value: 'iCentroCostoId' };
// set the height of the popup element

// set the placeholder to DropDownList input element
public CentroCostoMark: string = 'Seleccione una dependencia';
@ViewChild('CentroCostoList',{static: true})
// country DropDownList instance
public CentroCostoList: DropDownListComponent;



  @Input("datosCentroCosto") CentroCosto:CentroCostoInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<CentroCostoInterface> = new EventEmitter<CentroCostoInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('CentroCostoForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 









    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:DependenciaService,private route:ActivatedRoute, private dataApiCentroCosto:CentroCostoService) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; });  
    this.dataApiCentroCosto.getCombo().subscribe((respon)=>{ this.dataCentroCosto=respon; }); 

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarCentroCosto(): void {
  this.devuelve_hijo.emit(this.CentroCosto);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}
public onFormSubmit(): void {
  //this.form.reset();
  this.CentroCosto = {   
    iCentroCostoId : '*autogenerado',
    cCentroCostoNombre :'',    
    cCentroCostoAbre :'',
    cCentroCostoEstado : false,
    cCentroCostoPadre : '',
    iDepenId : '',
    cDepenNombre:'',

  
    
  };
 
  //this.FormaAdqList.text="1777777";
}




}


