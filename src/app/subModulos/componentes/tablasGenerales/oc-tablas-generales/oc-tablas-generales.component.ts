
import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';



//servicios
import {OcSyService} from '../../../servicios/tablas_generales/OC.sy.service'

//interface

import {OcInterface} from './../../../interfaces/tablasGenerales/oc-tablasGenerales-interface';


//synfusioin



//import {OcSyService} from '../../../servicios/tablas_generales/documentos-tramite.sy.service'
import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';

let today: Date = new Date();

@Component({
  selector: 'app-oc-tablas-generales',
  templateUrl: './oc-tablas-generales.component.html',
  styleUrls: ['./oc-tablas-generales.component.scss']
})



export class OcTablasGeneralesComponent implements OnInit {

@Output() devuelve_Oc:EventEmitter<OcInterface> = new EventEmitter<OcInterface>()//devovlemos cuando invoquen al componente

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

 

  public Oc:OcInterface;//formulario interfaz data
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

    public BtnActualizarOcClick: EmitType<object> = () => {  
      console.log("refehes??");
      this.grid.refresh();//refresescamos la grilñla 
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

  
constructor(private service:OcSyService , private serviceCrud:OcSyService){
  this.data = service;
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state);
}


 

ngOnInit(): void {    
    this.Oc = {  
      NRO_ORDEN : '',
      TIPO_BIEN :'',   
      FECHA_ORDEN :'',
      CONCEPTO : '',
      TOTAL_FACT_SOLES : ''
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
    this.service.execute(state);


    this.Dialog.hide();
}

rowSelected(args: RowSelectEventArgs) { 
  const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.        
  this.setOc(selectedrecords[0]['NRO_ORDEN'],selectedrecords[0]['TIPO_BIEN'],selectedrecords[0]['FECHA_ORDEN'],selectedrecords[0]['CONCEPTO'],selectedrecords[0]['TOTAL_FACT_SOLES'] );    
  this.devuelve_Oc.emit(this.Oc);      
 
}


setOc(NRO_ORDEN,TIPO_BIEN,FECHA_ORDEN,CONCEPTO,TOTAL_FACT_SOLES){
  this.Oc = {  
    NRO_ORDEN : NRO_ORDEN,
    TIPO_BIEN :TIPO_BIEN,   
    FECHA_ORDEN :FECHA_ORDEN,
    CONCEPTO : CONCEPTO,
    TOTAL_FACT_SOLES : TOTAL_FACT_SOLES,
  };
}


public cerrar_ventana_modal(){  
  
}
cerrar_ventana_modal_(b:string){
  if(b!="0")
    this.Dialog.hide();
}

}


