
import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';



//servicios
import {DocumentosService} from '../../../servicios/tablas_generales/documentos.service'

//interface

import {DocumentoTramiteInterface} from './../../../interfaces/tablasGenerales/documentoTramite-tablasGenerales-interface';


//synfusioin



import {DocumentoTramiteSyService} from '../../../servicios/tablas_generales/documentos-tramite.sy.service'
import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';

let today: Date = new Date();

@Component({
  selector: 'app-documentos-tramite-tablas-generales',
  templateUrl: './documentos-tramite-tablas-generales.component.html',
  styleUrls: ['./documentos-tramite-tablas-generales.component.scss']
})



export class DocumentosTramiteTablasGeneralesComponent implements OnInit {

@Output() devuelve_DocumentosTramite:EventEmitter<DocumentoTramiteInterface> = new EventEmitter<DocumentoTramiteInterface>()//devovlemos cuando invoquen al componente

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
    let btnDocumentoTramiteVer: HTMLElement = document.getElementById('btnDocumentoTramiteVer');
    if (e.target !== btnDocumentoTramiteVer  && this.toastObj.target === document.body) {
        this.toastObj.hide('All');
    }
}

  //DIALOGO

 

  public DocumentoTramite:DocumentoTramiteInterface;//formulario interfaz data
 //variablres para pasarle al componente local-detalles-ubicacion


  
//VENTANA MODAL

  @ViewChild('template',{static: true})
    public Dialog: DialogComponent;
    public proxy: any = this;
    

    public BtnVerDocumentoClick: EmitType<object> = () => {  
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
            document.getElementById('btnDocumentoTramiteVer').style.display = '';
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
            document.getElementById('btnDocumentoTramiteVer').style.display = 'none';
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

  
constructor(private service:DocumentoTramiteSyService , private serviceCrud:DocumentosService){
  this.data = service;
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state);
}


 

ngOnInit(): void {    
    this.DocumentoTramite = {  
      iTramMovId : 'autogenerado',
      cTipoMovDescripcion :"",   
      iTramNumRegistro :"",
      cTramDocumentoTramite : "",
      cTramAsunto : ""
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
  this.setDocumentoTramiteDatos(selectedrecords[0]['iTramMovId'],selectedrecords[0]['cTipoMovDescripcion'],selectedrecords[0]['iTramNumRegistro'],selectedrecords[0]['cTramDocumentoTramite'],selectedrecords[0]['cTramAsunto'] );    
  this.devuelve_DocumentosTramite.emit(this.DocumentoTramite);      
 
}


setDocumentoTramiteDatos(iTramMovId,cTipoMovDescripcion,iTramNumRegistro,cTramDocumentoTramite,cTramAsunto){
  this.DocumentoTramite = {  
    iTramMovId : iTramMovId,
    cTipoMovDescripcion :cTipoMovDescripcion,   
    iTramNumRegistro :iTramNumRegistro,
    cTramDocumentoTramite : cTramDocumentoTramite,
    cTramAsunto : cTramAsunto
  };
}


public cerrar_ventana_modal(){  
  
}
cerrar_ventana_modal_(b:string){
  if(b!="0")
    this.Dialog.hide();
}

}


