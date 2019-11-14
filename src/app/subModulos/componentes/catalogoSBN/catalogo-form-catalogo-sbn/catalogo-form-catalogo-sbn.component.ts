import { Component, OnInit,ViewChild,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { GruposService } from 'src/app/subModulos/servicios/catalogo_sbn/grupos.service';
import { GruposClasesService } from 'src/app/subModulos/servicios/catalogo_sbn/grupos_clases.service';

import {ActivatedRoute,Params} from '@angular/router'
import { CatalogoSBNInterface } from 'src/app/subModulos/interfaces/catalogoSBN/catalogo-sbn-nterface';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {faSave,faFilter,faList } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { LocalInterface } from 'src/app/subModulos/interfaces/ubicacion/local-ubicacion-interface';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-catalogo-form-catalogo-sbn',
  templateUrl: './catalogo-form-catalogo-sbn.component.html',
  styleUrls: ['./catalogo-form-catalogo-sbn.component.scss']
})
export class CatalogoFormCatalogoSBNComponent implements OnInit {

  public dataComboGrupos;
  public dataComboGruposClases;
 
 
 public remoteFieldsGrupos: Object = { text:'cGrupoGenDescripcion',value: 'iGrupoGenId' };
 public remoteFieldsGruposClases: Object = { text:'cClaseGenDescripcion',value: 'iGrupoClaseGenId' };
 // set the height of the popup element
 public height: string = '200px';
 // set the placeholder to DropDownList input element
 public remoteWaterMarkGrupo: string = 'Seleccione un Grupo';
 public remoteWaterMarkGruposClases: string = 'Seleccione una Clase';
 public c_act: "1";
 @ViewChild('checkbox',{static: true})
 public checkbox: CheckBoxComponent;


@ViewChild('grupoList',{static: true})
// country DropDownList instance
public grupoObj: DropDownListComponent;
@ViewChild('grupoClaseList',{static: true})
// state DropDownList instance
public claseGrupoObj: DropDownListComponent;

public b=0;
public onChange1(): void {
  console.log("onchange?? ::"+this.grupoObj.text);
console.log("primero:"+this.b);

  if(this.b!=0){
      if(this.grupoObj.text!=null){      
        let cod=this.grupoObj.text.substr(0,2)+"XXXXXX";
        this.catalgoSBN.cCatSbnCodigo = cod; 
    }
  }

  if(this.op=="0"){
    if(this.grupoObj.text!=null){      
      let cod=this.grupoObj.text.substr(0,2)+"XXXXXX";
      this.catalgoSBN.cCatSbnCodigo = cod; 
    }
  }
   



  let tempQuery: Query = new Query().where('iGrupoGenId', 'equal', this.grupoObj.value);
  this.claseGrupoObj.query = tempQuery;
  this.claseGrupoObj.dataBind();
  // clear the existing selection.

  if(this.catalgoSBN.iCatSbnId=="" ){
    this.claseGrupoObj.enabled = true;
    this.claseGrupoObj.text = null;
    this.claseGrupoObj.value = null;
  }
    
  if(this.grupoObj.value!=null){
    this.claseGrupoObj.enabled = true;
  }else{
    this.claseGrupoObj.enabled = false;
  }
      
  
  this.b++;

  if( this.grupoObj.enabled ==false){//si esta desabilitado tambien deshabiltiamos el otro combo
    this.claseGrupoObj.enabled = false;
  }
  
}

  


public onChange2(): void {
  console.log("segundo combo:"+this.b);
  if(this.b>0){
    if(this.claseGrupoObj.text!=null){
      let cod=this.grupoObj.text.substr(0,2)+this.claseGrupoObj.text.substr(0,2)+"XXXX";
      this.catalgoSBN.cCatSbnCodigo = cod;
    }
    
  }
  if(this.op=="0"){
    if(this.claseGrupoObj.text!=null){      
      let cod=this.grupoObj.text.substr(0,2)+this.claseGrupoObj.text.substr(0,2)+"XXXX";
      this.catalgoSBN.cCatSbnCodigo = cod;
    }
  }
  if(this.claseGrupoObj.value!=this.catalgoSBN.iGrupoClaseGenId && this.op=="2"){
    if(this.claseGrupoObj.text!=null){ 
      let cod=this.grupoObj.text.substr(0,2)+this.claseGrupoObj.text.substr(0,2)+"XXXX";
      this.catalgoSBN.cCatSbnCodigo = cod;
    }
    
  }
 
this.b++;
}



 
 













  @Input("datosCatalgoSBN") catalgoSBN:CatalogoSBNInterface;
  @Input() op: string;//opcion de crud

  @Input() data;


  faSave = faSave;//icono guardar
  faFilter=faFilter;
  faList=faList;

  @Output() devuelve_hijo:EventEmitter<CatalogoSBNInterface> = new EventEmitter<CatalogoSBNInterface>()

  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('catalgoSBNForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
  constructor(private dataApi:GruposService,private dataApiGruposClases:GruposClasesService,private route:ActivatedRoute) { 
     
      
        
         
   //this.state= this.dataApi.getComboLocales().subscribe((respon)=>{});  
  }
  
  ngOnInit() {
    console.log("se activa");
    this.dataApi.getCombo().subscribe((respon)=>{ this.dataComboGrupos=respon; });  
    this.dataApiGruposClases.getCombo().subscribe((respon)=>{ this.dataComboGruposClases=respon; });  
  }

  getDetalles(id:string){
   
  }


@ViewChild('formElement',{static: true}) element: any;

public GuardarCatalogoSBN(): void {
  console.log("emitiendo....");
  //this.borrar.emit(5);
  this.devuelve_hijo.emit(this.catalgoSBN);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
ngOnChanges(changes: SimpleChanges){
  console.log("segundo::"+this.op);
  this.b=0;
    //this.b=1;
   if(this.op=="0"){
    this.grupoObj.value = null; 
    this.grupoObj.value = null;
    this.grupoObj.text = null;
    this.grupoObj.text = null;
    this.claseGrupoObj.enabled = false;
    this.catalgoSBN.cCatSbnCodigo = "XXXXXXXX";
    this.grupoObj.enabled = true;//para habilitar  
   }else{

    if(this.op!="1"){
      this.claseGrupoObj.enabled = true;
      //this.catalgoSBN.cCatSbnCodigo = ;
      
    }  
    this.grupoObj.enabled = false;//para habilitar desabilitar por q no se podra modificar el codigo del catalogo 
    this.claseGrupoObj.enabled = false;//para habilitar desabilitar por q no se podra modificar el codigo del catalogo 
   
    
   }
     
   
  }
public onFormSubmit(): void {
  
 //this.dialogObj.show();

 let iGrupoGenId="";
  let iGrupoClaseGenId="";
 if(this.op=='0'){
  iGrupoGenId=this.catalgoSBN.iGrupoGenId;
  iGrupoClaseGenId=this.catalgoSBN.iGrupoClaseGenId;
 }

console.log("aaaaaaa:"+iGrupoGenId);
  this.form.reset();
  this.catalgoSBN = {
    iCatSbnId: 'autogenerado',
    cCatSbnCodigo: '',           
    cCatSbnDescripcion:'',
    cCatSbnResolucion:'',
    bCatSbnEstado:false,
    iGrupoGenId:iGrupoGenId,
    iGrupoClaseGenId:iGrupoClaseGenId 
  };

  /*if(this.op=='0'){
    let cod=this.grupoObj.text.substr(0,2)+this.claseGrupoObj.text.substr(0,2)+"XXXX";
    this.catalgoSBN.cCatSbnCodigo = cod;
   }*/
}



  // function to handle the CheckBox change event
  public changeHandler() : void {
    this.checkbox.label = 'Estado: ' + this.checkbox.checked;
}

}

