import { Component, OnInit,ViewChild,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import { AreasService } from 'src/app/subModulos/servicios/areas.service';

import {ActivatedRoute,Params} from '@angular/router'
import { OficinaInterface } from 'src/app/subModulos/interfaces/ubicacion/oficina-ubicacion-interface';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {faSave,faFilter,faList } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { LocalInterface } from 'src/app/subModulos/interfaces/ubicacion/local-ubicacion-interface';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-oficina-form-ubicacion',
  templateUrl: './oficina-form-ubicacion.component.html',
  styleUrls: ['./oficina-form-ubicacion.component.scss']
})
export class OficinaFormUbicacionComponent implements OnInit {

  public dataComboLocales;
  public dataComboAreas;
  
 
 
 public remoteFields: Object = { text:'cLocalDescripcion',value: 'iLocalId' };
 public remoteFieldsAreas: Object = { text:'cAreaDescripcion',value: 'iAreaId' };
 // set the height of the popup element
 public height: string = '200px';
 // set the placeholder to DropDownList input element
 public remoteWaterMark: string = 'Seleccione un Local';
 public remoteWaterMarkAreas: string = 'Seleccione un Area';

@ViewChild('localList',{static: true})
// country DropDownList instance
public localObj: DropDownListComponent;
@ViewChild('areaList',{static: true})
// state DropDownList instance
public areaObj: DropDownListComponent;

public b=0;
public onChange1(): void {
  let tempQuery: Query = new Query().where('iLocalId', 'equal', this.localObj.value);
  this.areaObj.query = tempQuery;
  this.areaObj.dataBind();
  // clear the existing selection.
  if(this.oficina.iAreaId=="" ){
    this.areaObj.enabled = true;
    this.areaObj.text = null;
    this.areaObj.value = null;
  }
    
  if(this.localObj.value!=null){
    this.areaObj.enabled = true;
  }else{
    this.areaObj.enabled = false;
  }
      
  
  
  
}












  @Input("datosOficina") oficina:OficinaInterface;
  @Input() op: string;//opcion de crud

  @Input() data;


  faSave = faSave;//icono guardar
  faFilter=faFilter;
  faList=faList;

  @Output() devuelve_hijo:EventEmitter<OficinaInterface> = new EventEmitter<OficinaInterface>()

  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('oficinaForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
  constructor(private dataApi:LocalesService,private dataApiAreas:AreasService,private route:ActivatedRoute) { 
     
      
        
         
   //this.state= this.dataApi.getComboLocales().subscribe((respon)=>{});  
  }
  
  ngOnInit() {
    console.log("se activa");
    this.dataApi.getComboLocales().subscribe((respon)=>{ this.dataComboLocales=respon; });  
    this.dataApiAreas.getComboAreas().subscribe((respon)=>{ this.dataComboAreas=respon; });  
  }

  getDetalles(id:string){
   
  }


@ViewChild('formElement',{static: true}) element: any;

public GuardarOficina(): void {
  console.log("emitiendo....");
  //this.borrar.emit(5);
  this.devuelve_hijo.emit(this.oficina);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
ngOnChanges(changes: SimpleChanges){
  
    this.b=1;
   if(this.op=="0"){
    this.localObj.value = null; 
    this.areaObj.value = null;
    this.areaObj.text = null;
    this.localObj.text = null;
    this.areaObj.enabled = false;
   }else{

    if(this.op!="1"){
      this.areaObj.enabled = true;
    }
    
   }
     
   
  }
public onFormSubmit(): void {
  
 //this.dialogObj.show();

 let idLocal="";
  let idArea="";
 if(this.op=='0'){
   idLocal=this.oficina.iLocalId;
   idArea=this.oficina.iAreaId;
 }
 // this.form.reset();
  this.oficina = {
      iOficinaId: 'autogenerado',
      cOficinaDescripcion: '',           
      iLocalId:idLocal,
      cLocalDescripcion:'',
      iAreaId:idArea,
      cAreaDescripcion:''
  };
}


}
