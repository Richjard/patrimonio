import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';

import {ActivatedRoute,Params} from '@angular/router'
import { AreaInterface } from 'src/app/subModulos/interfaces/ubicacion/area-ubicacion-interface';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {faSave,faFilter,faList } from '@fortawesome/free-solid-svg-icons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { LocalInterface } from 'src/app/subModulos/interfaces/ubicacion/local-ubicacion-interface';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-area-form-ubicacion',
  templateUrl: './area-form-ubicacion.component.html',
  styleUrls: ['./area-form-ubicacion.component.scss']
})
export class AreaFormUbicacionComponent implements OnInit {

  //public state: { [key: string]: Object }[] =[];//this.dataApi.getComboLocales();
 // public state: LocalInterface=this.dataApi.getComboLocales();
 

 //public state: Object[] = this.dataApi.getComboLocales();
 public state;

 
 public ee; 

  /*[
    { StateName: 'New York', CountryId: '1', StateId: '101' },
    { StateName: 'Queensland', CountryId: '2', StateId: '104' },
    { StateName: 'Tasmania ', CountryId: '2', StateId: '105' },
    { StateName: 'Victoria', CountryId: '2', StateId: '106' },
    { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
    { StateName: 'Washington', CountryId: '1', StateId: '103' }
];*/
// bind the Query instance to query property
//public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
// maps the remote data column to fields property
public remoteFields: Object = { text:'cLocalDescripcion',value: 'iLocalId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public remoteWaterMark: string = 'Seleccione un Local';


//DIALGO LOCALES

/*@ViewChild('template',{static: true})
public Dialog: DialogComponent;
public proxy: any = this;

public showCloseIcon: Boolean = true;

    public height: string = '75%';



    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '800px';

    public isModal: Boolean = true;

    public dialogdragging: Boolean = true;

    public dialogClose: EmitType<object> = () => {
    
      
    }

    public dialogOpen: EmitType<object> = () => {
      
    }

    public btnVerLocales: EmitType<object> = () => {       
     
        this.Dialog.show();  
    }*/
//FIN DUIALGOS LOCALES

  @Input("datosArea") area:AreaInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter=faFilter;
  faList=faList;

  @Output() devuelve_hijo:EventEmitter<AreaInterface> = new EventEmitter<AreaInterface>()

  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('areaForm',{static: true}) form: any;//fromulario


@ViewChild('localList',{static: true})
// country DropDownList instance
public localObj: DropDownListComponent;

  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
     
      
        
         
   //this.state= this.dataApi.getComboLocales().subscribe((respon)=>{});  
  }
  
  ngOnInit() {
   
    this.dataApi.getComboLocales().subscribe((respon)=>{ this.state=respon; });  
    
  }

  getDetalles(id:string){
   
  }


@ViewChild('formElement',{static: true}) element: any;

public GuardarArea(): void {
  console.log("emitiendo....");
  //this.borrar.emit(5);
  this.devuelve_hijo.emit(this.area);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  
 //this.dialogObj.show();
 console.log("loca desssssss:::"+this.area.cAreaDescripcion);
 let idLocal=this.area.iLocalId;
 console.log("loca opcion:::"+this.op+"id local se que da"+idLocal);
  this.form.reset();
  this.area = {
    iAreaId: '*autogenerado',
    cAreaDescripcion: '',    
    iLocalId:idLocal,
    cLocalDescripcion:''
  };
}


ngOnChanges(changes: SimpleChanges){
  console.log("nuevo change llega:::"+this.op);

   if(this.op=="0"){
    this.localObj.value = null; 
    this.localObj.text = null;
   }else{

   /* if(this.op!="1"){
      this.areaObj.enabled = true;
    }*/
    
   }
     
   
  }


}
