import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { FormasAdquisicionService } from 'src/app/subModulos/servicios/tablas_generales/formas_adquisicion.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { DocumentoTramiteInterface } from 'src/app/subModulos/interfaces/tablasGenerales/documentoTramite-tablasGenerales-interface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'

@Component({
  selector: 'app-documentos-form-tablas-generales',
  templateUrl: './documentos-form-tablas-generales.component.html',
  styleUrls: ['./documentos-form-tablas-generales.component.scss']
})
export class DocumentosFormTablasGeneralesComponent implements OnInit {

  private textSelectDocumentoTramite:string;
  private idSelectDocumentoTramite="null";
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataFormaAdq;
public FormaAdqFields: Object = { text:'cFormaAdqDescripcion',value: 'iFormaAdqId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public FormaAdMark: string = 'Seleccione una Forma de Adquisición';
@ViewChild('FormaAdqList',{static: true})
// country DropDownList instance
public FormaAdqList: DropDownListComponent;

  @Input("datosDocumento") Documento:DocumentoInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DocumentoInterface> = new EventEmitter<DocumentoInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('DocumentoForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

//VENTANA MODAL FOR TipoS

@ViewChild('template',{static: true})
public Dialog: DialogComponent;

@ViewChild('dialogOC',{static: true})
public dialogOC: DialogComponent;



public proxy: any = this;

public BtnVerDocumentosTramiteClick: EmitType<object> = () => {  
      
    this.Dialog.show();  
}

public BtnVerOrdenesCompraClick: EmitType<object> = () => {  
  this.dialogOC.show();  
}

public showCloseIcon: Boolean = true;

public heightModal: string = '80%';



public target: string = '.control-section';

public animationSettings: Object = { effect: 'None' };

public width: string = '835px';

public isModal: Boolean = true;

public dialogdragging: Boolean = true;

public dialogClose: EmitType<object> = () => {
 
     //document.getElementById('btnVerTipos').style.display = '';
  
  
}

public dialogOpen: EmitType<object> = () => {

    // document.getElementById('btnVerTipos').style.display = 'none';
   
}

//FIN DIAALOGO








    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:FormasAdquisicionService,private route:ActivatedRoute) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataFormaAdq=respon; });  

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarDocumento(): void {
  this.devuelve_hijo.emit(this.Documento);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}
public onFormSubmit(): void {
  //this.form.reset();
  this.Documento = {   
    iDocAdqId : '*autogenerado',
    cDocAdqNro :'',    
    dDocAdqFecha :'',
    nDocAdqValor : '',
    cDocAdqObs:'',
    iFormaAdqId:'1',
    cFormaAdqDescripcion:'',
    iTramMovId : '',
    iTramNumRegistro : '',
    
  };

  this.ocSelect = {  
    NRO_ORDEN : '',
    TIPO_BIEN :'',   
    FECHA_ORDEN :'',
    CONCEPTO : '',
    TOTAL_FACT_SOLES : ''
  };
  this.FormaAdqList.value="1";
  //this.FormaAdqList.text="1777777";
}



public setTextDocumentosTramiteSelect(DocumentoTramite:DocumentoTramiteInterface){  
  console.log("Modelo Seleccionado::"+DocumentoTramite.iTramMovId);
  this.textSelectDocumentoTramite=DocumentoTramite.iTramNumRegistro;
  this.idSelectDocumentoTramite=DocumentoTramite.iTramMovId;
}
public BtnOkDocumentosTramiteModalClick(): void{
  if(this.idSelectDocumentoTramite=="null"){
    console.log("seleccione por favor un documento de referencia");
  }else{
    console.log("seleccionado:"+this.textSelectDocumentoTramite);
    this.Documento.iTramNumRegistro=this.textSelectDocumentoTramite;
    this.Documento.iTramMovId=this.idSelectDocumentoTramite;
    this.Dialog.hide(); 

  }
}



public setTextOrdenCompraSelect(Oc:OcInterface){  
  console.log("Modelo Seleccionado::"+Oc.NRO_ORDEN);
  this.textSelectOC=Oc.NRO_ORDEN;
 

  this.ocSelect = {  
    NRO_ORDEN:Oc.NRO_ORDEN,
    TIPO_BIEN:Oc.TIPO_BIEN,
    FECHA_ORDEN:Oc.FECHA_ORDEN,
    CONCEPTO:Oc.CONCEPTO,
    TOTAL_FACT_SOLES:Oc.TOTAL_FACT_SOLES,
  };
}
public BtnOkOrdenCompraModalClick(): void{
  if(this.textSelectOC==""){
    console.log("seleccione por favor un O/C");
  }else{
    console.log("seleccionado:"+this.textSelectOC);
    this.Documento.cDocAdqNro=this.ocSelect.NRO_ORDEN;
    this.Documento.dDocAdqFecha=this.ocSelect.FECHA_ORDEN;
    this.Documento.nDocAdqValor=this.ocSelect.TOTAL_FACT_SOLES;
    this.Documento.cDocAdqObs=this.ocSelect.CONCEPTO;
    this.dialogOC.hide(); 

  }
}

}
