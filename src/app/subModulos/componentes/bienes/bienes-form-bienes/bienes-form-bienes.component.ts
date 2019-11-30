import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { BienInterface } from 'src/app/subModulos/interfaces/bienes/catalogo-bienes-nterface';

import { CatalogoSBNInterface } from 'src/app/subModulos/interfaces/catalogoSBN/catalogo-sbn-nterface';
import { CatalogoNoPatrimonialInterface } from 'src/app/subModulos/interfaces/tablasGenerales/catalogoNoPatrimonial-tablasGenerales-interface';

import { PlanInterface } from 'src/app/subModulos/interfaces/tablasGenerales/plan-tablasGenerales-interface';

import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/documento-tablasGenerales-interface';
import { TipoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/tipo-tablasGenerales-interface';
import { OcItemInterface } from 'src/app/subModulos/interfaces/tablasGenerales/ocItem-tablasGenerales-interface';

import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';


import { EstadosBienesService } from 'src/app/subModulos/servicios/tablas_generales/estados_bienes.service';
import { ColoresService } from 'src/app/subModulos/servicios/tablas_generales/colores.service';
import { faPlus, faEdit, faTrashAlt,faSave,faFilter,faList } from '@fortawesome/free-solid-svg-icons';


import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
@Component({
  selector: 'app-bienes-form-bienes',
  templateUrl: './bienes-form-bienes.component.html',
  styleUrls: ['./bienes-form-bienes.component.scss']
})
export class BienesFormBienesComponent implements OnInit {


  private ocItemSelect:OcItemInterface;

  public dataColores;/*: string[] = [
    'ASP.NET', 'ActionScript', 'Basic',
    'C++' , 'C#' , 'dBase' , 'Delphi' ,
    'ESPOL' , 'F#' , 'FoxPro' , 'Java',
    'J#' , 'Lisp' , 'Logo' , 'PHP'
];*/
public autoreactiveplaceholder: String = 'Seleccione colores';
public coloresFields: Object = { text:'cColorNombre',value: 'iColorId' };
public box: string = 'Box';




  private textSelectCatalogo:string;
  private idSelectCatalogo="null";
  private codigoidSelectCatalogo="null";

  private textSelectPlan:string;
  private idSelectPlan="null";
  private codigoSelectPlan="null";


  private NroSelectDocumento:string;
  private idSelectDocumento="null";
  private fechaSelectDocumento="null";
  private valorSelectDocumento="null";
  private tipoDocSelectDocumento="null";



  private idSelectTipo="null";
  private desTipoSelectTipo="null";
  private desModeloSelectTipo="null";
  private desMarcaSelectTipo="null";

  private textSelectOcItemSiga=null;

  @Input("datosBien") Bien:BienInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter=faFilter;
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<BienInterface> = new EventEmitter<BienInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('BienForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private dataApiEstadoBienes:EstadosBienesService, private dataApiColores :ColoresService, private route:ActivatedRoute) { 

  }







  @ViewChild('tipoCObj',{static: true})
    public tipoCObj: DropDownListComponent;
    // define the JSON of data
    public tipoCData: Object[] = [
        { iTipoCId: '0', cTipoCDescripcion: 'Catalogo O/C SIGA' },
        { iTipoCId: '1', cTipoCDescripcion: 'Catalogo SBN' },
        { iTipoCId: '2', cTipoCDescripcion: 'Catalogo UNAM' }
    ];
    // maps the appropriate column to fields property
    public tipoCfields: Object = { text: 'cTipoCDescripcion', value: 'iTipoCId' };


    // set the height of the popup element
    public height2: string = '220px';
    // set the placeholder to DropDownList input element
    public tipoCMark: string = 'T. Cat.';

    public dataBienEstado;
    public EstadoBienFields: Object = { text: 'cEstadoBienDescripcion', value: 'iEstadoBienId' };
    // set the height of the popup element
    // set the placeholder to DropDownList input element
    public EstadoBienMark: string = 'Estado del Bien';
    
    //public value: string = '1';
    // set the value to select an item based on mapped value at initial rendering
    //public value: string = '1';
  /*@ViewChild('tipoCList',{static: true})
// country DropDownList instance
public tipoCObj: DropDownListComponent;*/

public onTipoCatalogo(): void {
   
  this.Bien.cBienDescripcion=''; 
  this.Bien.nBienValor='';
  this.Bien.cantidad=1;  

  this.Bien.iCatalogoId= '';  
  this.Bien.cBienCodigo= ''; 
  
  
}


//VENTANA MODAL FOR CATALOGO SBN

@ViewChild('dialogoCatalogoSBN',{static: true})
public DialogCatalogoSBN: DialogComponent;

@ViewChild('dialogoCatalogoUNAM',{static: true})
public DialogCatalogoUNAM: DialogComponent;

@ViewChild('dialogoCatalogoOCSIGA',{static: true})
public dialogoCatalogoOCSIGA: DialogComponent;

@ViewChild('dialogoPlan',{static: true})  
public dialogoPlan: DialogComponent;

@ViewChild('dialogoDocumento',{static: true})
public dialogoDocumento: DialogComponent;

@ViewChild('dialogoTipo',{static: true})  
public dialogoTipo: DialogComponent;

public proxy: any = this;

public BtnVerCatalogoSBNloClick: EmitType<object> = () => {  
  console.log("item:"+this.tipoCObj.value);
  switch (this.tipoCObj.value) {
      case '0':          
          this.dialogoCatalogoOCSIGA.show(); 
          break;
      case '1':
          this.DialogCatalogoSBN.show(); 
          break;
      case '2':
        this.DialogCatalogoUNAM.show();  
          break;
      default:
          console.log("No such day exists!");
          break;
  }  
}
public BtnVerPlanClick: EmitType<object> = () => {  
   this.dialogoPlan.show();  
}

public BtnVerDocumentoClick: EmitType<object> = () => {  
  this.dialogoDocumento.show();  
}

public BtnVerTipoClick: EmitType<object> = () => {  
  this.dialogoTipo.show();  
}

public showCloseIcon: Boolean = true;

public height: string = '80%';



public target: string = '.control-section';

public animationSettings: Object = { effect: 'None' };

public width: string = '835px';
public widthModalDocumentoAdquisicion: string = '90%';
public width_m_ioc: string = '80%';
public isModal: Boolean = true;

public dialogdragging: Boolean = true;

public dialogClose: EmitType<object> = () => {
 
     //document.getElementById('btnVerModelos').style.display = '';
  
  
}

public dialogOpen: EmitType<object> = () => {

    // document.getElementById('btnVerModelos').style.display = 'none';
   
}

//FIN CATALOGO SBN



  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);
    this.dataApiEstadoBienes.getCombo().subscribe((respon)=>{ this.dataBienEstado=respon; });
    this.dataApiColores.getCombo().subscribe((respon)=>{ this.dataColores=respon; });
    

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarBien(): void {
  this.devuelve_hijo.emit(this.Bien);
  this.cerrar_modal.emit(this.op); 
  //this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.Bien = {
    iTipoCId:"0",
    iBienId : '*autogenerado',
    cBienCodigo:'',
    cBienDescripcion :'',
    nBienValor:'',
    cBienSerie:'',
    cBienDimension:'',
    cBienOtrasCaracteristicas:'',
    bBienBaja:'',
    dBienFechaBaja:'',
    cBienCausalBaja:'',
    cBienResolucionBaja:'',
    dBienAnioFabricacion:'',
    cBienObs:'',
    iEstadoBienId:'',    
    iFormaAdqId:'',    
    iTipoId:'',    
    iYearId:'',
    iCatalogoNoPatId:'',
    iCatSbnId:'',
   
    iDocAdqId:'',
    cPlanContCodigo:'',
    cPlanContDescripcion:'',
    cClasGastoCodigo:'',
    cClasGastoDescripcion:'',

    cDocAdqNro:'',
    dDocAdqFecha:'',
    nDocAdqValor:'',
    cFormaAdqDescripcion:'',


    cTipoDescripcion:'',
    cModeloDescripcion:'',
    cMarcaDescripcion:'',
    iCatalogoId:'',
    colores:[],
    cantidad:1,

  };
  this.ocItemSelect = {  
    CODIGO : '',
    GRUPO_BIEN :'',   
    CLASE_BIEN :'',
    FAMILIA_BIEN : '',
    ITEM_BIEN : '',
    NOMBRE_ITEM:'',
    CANT_ITEM : 1,
    PREC_UNIT_MONEDA : '',
    PREC_TOT_SOLES :'',
    b:0
  };
}

public setTextSelectCatalogoSBN(CatalogoSBN:CatalogoSBNInterface){  
  console.log("catalogo selecccionado Seleccionado::"+CatalogoSBN.cCatSbnDescripcion);
  this.textSelectCatalogo=CatalogoSBN.cCatSbnDescripcion;
  this.idSelectCatalogo=CatalogoSBN.iCatSbnId;
  this.codigoidSelectCatalogo=CatalogoSBN.cCatSbnCodigo;
}

public setTextSelectCatalogoNP(CatalogoNP:CatalogoNoPatrimonialInterface){  
  console.log("catalogo selecccionado Seleccionado::"+CatalogoNP.cCatalogoNoPatDescripcion);
  this.textSelectCatalogo=CatalogoNP.cCatalogoNoPatDescripcion;
  this.idSelectCatalogo=CatalogoNP.iCatalogoNoPatId;
  this.codigoidSelectCatalogo=CatalogoNP.cCatalogoNoPatCodigo;
}
public BtnOkCatalogoModalClick(): void{
  if(this.idSelectCatalogo=="null"){
    console.log("seleccione por favor una marca");
  }else{
    console.log("seleccionado:"+this.textSelectCatalogo);
    this.Bien.cBienDescripcion=this.textSelectCatalogo;
    this.Bien.cBienCodigo=this.codigoidSelectCatalogo+"XXXX";
    this.Bien.iCatalogoId=this.idSelectCatalogo;
    if(this.tipoCObj.value==1){    
      this.Bien.iCatSbnId=this.idSelectCatalogo;  
      this.Bien.iCatalogoNoPatId=null;   
      this.DialogCatalogoSBN.hide(); 
    }else{
      this.Bien.iCatalogoNoPatId=this.idSelectCatalogo;  
      this.Bien.iCatSbnId=null;
      this.DialogCatalogoUNAM.hide(); 
    }
    

  }
}


public setTextSelectPlan(Plan:PlanInterface){  
 /* console.log("catalogo selecccionado Seleccionado::"+Plan.cPlanContDescripcion);
  this.textSelectPlan=Plan.cPlanContDescripcion;
  this.idSelectPlan=Plan.iPlanContId;
  this.codigoSelectPlan=Plan.cPlanContCodigo;*/
}

public BtnOkPlanModalClick(): void{
  if(this.idSelectPlan=="null"){
    console.log("seleccione por favor un plan contable");
  }else{
    console.log("seleccionado:"+this.textSelectPlan);
    this.Bien.cPlanContDescripcion=this.textSelectPlan;
    this.Bien.cPlanContCodigo=this.codigoSelectPlan;   
    //this.Bien.iPlanContId=this.idSelectPlan;          
    this.dialogoPlan.hide(); 
  }
}


public setTextSelectDocumento(Documento:DocumentoInterface){  
  console.log("catalogo selecccionado Seleccionado::"+Documento.cDocAdqNro);
  this.NroSelectDocumento=Documento.cDocAdqNro;
  this.idSelectDocumento=Documento.iDocAdqId;
  this.fechaSelectDocumento=Documento.dDocAdqFecha;
  this.valorSelectDocumento=Documento.nDocAdqValor;
  this.tipoDocSelectDocumento=Documento.cFormaAdqDescripcion;
}

public BtnOkDocumentoModalClick(): void{
  if(this.idSelectDocumento=="null"){
    console.log("seleccione por favor una O/C");
  }else{
    console.log("seleccionado:"+this.NroSelectDocumento);
    this.Bien.cDocAdqNro=this.NroSelectDocumento;
    this.Bien.iDocAdqId=this.idSelectDocumento;   
    this.Bien.dDocAdqFecha=this.fechaSelectDocumento;
    this.Bien.nDocAdqValor=this.valorSelectDocumento;    
    this.Bien.cFormaAdqDescripcion=this.tipoDocSelectDocumento;      
    this.dialogoDocumento.hide(); 
  }
}



public setTextSelectTipo(Tipo:TipoInterface){  
  console.log("catalogo selecccionado Seleccionado::"+Tipo.cTipoDescripcion);
  this.idSelectTipo=Tipo.iTipoId;
  this.desTipoSelectTipo=Tipo.cTipoDescripcion;
  this.desModeloSelectTipo=Tipo.cModeloDescripcion;
  this.desMarcaSelectTipo=Tipo.cMarcaDescripcion;
}

public BtnOkTipoModalClick(): void{
  if(this.idSelectTipo=="null"){
    console.log("seleccione por favor una O/C");
  }else{
    
    this.Bien.iTipoId=this.idSelectTipo;   
    this.Bien.cTipoDescripcion=this.desTipoSelectTipo;
    this.Bien.cModeloDescripcion=this.desModeloSelectTipo;    
    this.Bien.cMarcaDescripcion=this.desMarcaSelectTipo;      
    this.dialogoTipo.hide(); 
  }
}



public setTextSelectOcItemSiga(ocItem:OcItemInterface){  
  console.log("catalogo selecccionado Seleccionado::"+ocItem.NOMBRE_ITEM);
  /*this.idSelectTipo=Tipo.iTipoId;*/
  this.textSelectOcItemSiga=ocItem.NOMBRE_ITEM;
 /* this.desModeloSelectTipo=Tipo.cModeloDescripcion;
  this.desMarcaSelectTipo=Tipo.cMarcaDescripcion;*/

    this.ocItemSelect = {  
      CODIGO : ocItem.CODIGO,
      GRUPO_BIEN :ocItem.GRUPO_BIEN,   
      CLASE_BIEN :ocItem.CLASE_BIEN,
      FAMILIA_BIEN : ocItem.FAMILIA_BIEN,
      ITEM_BIEN : ocItem.ITEM_BIEN,
      NOMBRE_ITEM:ocItem.NOMBRE_ITEM,
      CANT_ITEM : ocItem.CANT_ITEM,
      PREC_UNIT_MONEDA : ocItem.PREC_UNIT_MONEDA,
      PREC_TOT_SOLES :ocItem.PREC_TOT_SOLES,
      b :ocItem.b,
    };
}

public BtnOkOcItemSigaModalClick(): void{
  if(this.textSelectOcItemSiga=="null"){
    console.log("seleccione por favor una O/C");
  }else{
    if(this.ocItemSelect.b==1){
      this.Bien.cBienDescripcion=this.ocItemSelect.NOMBRE_ITEM; 
      this.Bien.nBienValor=this.ocItemSelect.PREC_UNIT_MONEDA;
      this.Bien.cantidad=this.ocItemSelect.CANT_ITEM;  

      this.Bien.iCatalogoId= this.ocItemSelect.CODIGO.substring(0, 8);  
      this.Bien.cBienCodigo= this.ocItemSelect.CODIGO.substring(0, 8)+"XXXX"; 
    }
    
   
    this.dialogoCatalogoOCSIGA.hide(); 
  }
}


}
