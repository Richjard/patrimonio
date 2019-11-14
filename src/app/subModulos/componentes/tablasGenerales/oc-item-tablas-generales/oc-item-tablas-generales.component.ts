import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';



//servicios
import {OcItemSyService} from '../../../servicios/tablas_generales/ocItem.sy.service'

//interface

import {OcItemInterface} from './../../../interfaces/tablasGenerales/ocItem-tablasGenerales-interface';
import {OcInterface} from './../../../interfaces/tablasGenerales/oc-tablasGenerales-interface';

//synfusioin



//import {OcSyService} from '../../../servicios/tablas_generales/documentos-tramite.sy.service'
import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';

let today: Date = new Date();

@Component({
  selector: 'app-oc-item-tablas-generales',
  templateUrl: './oc-item-tablas-generales.component.html',
  styleUrls: ['./oc-item-tablas-generales.component.scss']
})


export class OcItemTablasGeneralesComponent implements OnInit {


@Input() nroOC: string;//opcion de crud
@Output() devuelve_OcITEM:EventEmitter<OcItemInterface> = new EventEmitter<OcItemInterface>()//devovlemos cuando invoquen al componente

faPlus = faPlus;//icono nuevo
faInfo = faInfo//icono info
public icoForm =faPlus;
public faEdit=faEdit;


public opcion;//opciones para crud  0=nuevo 1=ver 2=modificar 3=eliminar
//toas
@ViewChild('defaulttoast',{static: true})
public toastObj: ToastComponent;
@ViewChild('toastBtnShow',{static: true})
public btnEleShow: ElementRef;
public position: Object = { X: "Right" };


public toasts: { [key: string]: Object }[] = [
  { title: 'Advertencia!', content: 'No se ha seleccionado ni una O/C.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
  { title: 'Éxito!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
  { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
  { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
];

public onCreate: EmitType<Object> = () => {
    /*setTimeout(()=>{
    this.toastObj.show(this.toasts[0]);
    },200);*/
}
public onClose: EmitType<Object> = (e: ToastCloseArgs) => {
   /* if (e.toastContainer.childElementCount === 0 ) {
       let hideBtn: HTMLElement = document.getElementById('toastBtnHide');
       hideBtn.style.display = 'none';
  }*/
}
public onBeforeOpen: EmitType<Object> = () => {
       /*let hideBtn: HTMLElement = document.getElementById('toastBtnHide');
       hideBtn.style.display = 'inline-block';*/
}

@HostListener('document:click', ['$event'])
documentClick: EmitType<Object> = (e: MouseEvent) => {
   //let showButton: HTMLElement = document.getElementById('toastBtnShow');
    let btnOcVer: HTMLElement = document.getElementById('btnOcVer');
    if (e.target !== btnOcVer  && this.toastObj.target === document.body) {
        this.toastObj.hide('All');
    }
}

  //DIALOGO

 

  public OcItem:OcItemInterface;//formulario interfaz data
 //variablres para pasarle al componente local-detalles-ubicacion


  
//VENTANA MODAL

  @ViewChild('template',{static: true})
    public Dialog: DialogComponent;
    public proxy: any = this;
    

    public BtnVerOcClick: EmitType<object> = () => {  
      if(this.grid.getSelectedRecords().length>0) {          
          this.icoForm=faInfo;
          this.opcion=1;                     
          this.Dialog.show();  
        } else {                  
          this.toastObj.show(this.toasts[0]);
        }       
    }
 

    public showCloseIcon: Boolean = true;

    public height: string = '80%';



    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '735px';

    public isModal: Boolean = false;

    public dialogdragging: Boolean = true;

    public dialogClose: EmitType<object> = () => {
      switch (this.opcion) {          
          case 1:
            document.getElementById('btnOcVer').style.display = '';
              break;          
          default:
              console.log("No such day exists!");
              break;
        }
      
    }

    public dialogOpen: EmitType<object> = () => {
       // document.getElementById('btnLocalNuevo').style.display = 'none';
        switch (this.opcion) {
          case 1:
            document.getElementById('btnOcVer').style.display = 'none';
              break;            
          default:
              console.log("No such day exists!");
              break;
        }
    }

 
  //FIN DIAALOGO

  ttt;
  //local:any[]=[];
  locales_datae:any=[];

 
  

  faSave = faSave;//icono guardar

  faTrashAlt=faTrashAlt;
  public date: Object = new Date()

  @ViewChild('grid',{static: true})
  public grid: GridComponent;
  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public pageSettings: Object;
  public state: DataStateChangeEventArgs;
  //public  nrooc=this.nroOC;
  
constructor(private service:OcItemSyService ){
  this.data = service;
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state,this.nroOC);
}


 

ngOnInit(): void {    
  console.log("oc::"+this.nroOC);
    this.OcItem = {  
      CODIGO : '',
      GRUPO_BIEN: '',   
      CLASE_BIEN :'',
      FAMILIA_BIEN : '',
      ITEM_BIEN : '',
      NOMBRE_ITEM:'',
      CANT_ITEM : 1,
      PREC_UNIT_MONEDA : '',  
      PREC_TOT_SOLES:''  ,
      b:0  
    };
    this.opcion=0;  

    // To enable ripple in checkbox/radio type ButtonGroup.
    let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
    let button: HTMLElement;
    for (let i: number = 0; i < buttons.length; i++) {
        button = buttons.item(i) as HTMLElement;
        rippleEffect(button, { selector: '.e-btn' });
    }
  
    this.pageOptions = { pageSize: 15, pageCount: 4 };
    let state = { skip: 0, take: 15 };
    this.service.execute(state,this.nroOC);


    this.Dialog.hide();
}

rowSelected(args: RowSelectEventArgs) { 
  const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records. 
  console.log("codigo:::"+selectedrecords[0]['CODIGO']);       
  this.setOcItem(selectedrecords[0]['CODIGO'],selectedrecords[0]['GRUPO_BIEN'],selectedrecords[0]['CLASE_BIEN'],selectedrecords[0]['FAMILIA_BIEN'],selectedrecords[0]['ITEM_BIEN'],selectedrecords[0]['NOMBRE_ITEM'],selectedrecords[0]['CANT_ITEM'],selectedrecords[0]['PREC_UNIT_MONEDA'],selectedrecords[0]['PREC_TOT_SOLES'],selectedrecords[0]['b'] );    
  this.devuelve_OcITEM.emit(this.OcItem);      
 
}


setOcItem(CODIGO,GRUPO_BIEN,CLASE_BIEN,FAMILIA_BIEN,ITEM_BIEN,NOMBRE_ITEM,CANT_ITEM,PREC_UNIT_MONEDA,PREC_TOT_SOLES,b){
  this.OcItem = {  
    CODIGO :CODIGO,
    GRUPO_BIEN: GRUPO_BIEN,   
    CLASE_BIEN :CLASE_BIEN,
    FAMILIA_BIEN : FAMILIA_BIEN,
    ITEM_BIEN : ITEM_BIEN,
    NOMBRE_ITEM:NOMBRE_ITEM,
    CANT_ITEM : CANT_ITEM,
    PREC_UNIT_MONEDA : PREC_UNIT_MONEDA,  
    PREC_TOT_SOLES:PREC_TOT_SOLES  ,
    b: b 
  };
}


public cerrar_ventana_modal(){  
  
}
cerrar_ventana_modal_(b:string){
  if(b!="0")
    this.Dialog.hide();
}


ngOnChanges(changes: SimpleChanges){
  console.log("nuevo change llega:::"+this.nroOC);

  this.pageOptions = { pageSize: 15, pageCount: 4 };
  let state = { skip: 0, take: 15 };
  this.service.execute(state,this.nroOC);
     
   
  }

}


