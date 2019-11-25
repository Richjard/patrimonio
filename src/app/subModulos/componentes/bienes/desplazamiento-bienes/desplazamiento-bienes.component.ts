import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { faPlus, faEdit, faTrashAlt,faSave,faInfo,faPrint } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

//servicios
import {DesplazamientoBienesService} from '../../../servicios/bienes/desplazamiento_bienes.service'


//interface

import {DesplazamientoBienInterface} from './../../../interfaces/bienes/desplazamiento-bienes-nterface';

import {ReportService} from '../../../servicios/report/report'
//synfusioin



import {DesplazamientoBienSyService} from '../../../servicios/bienes/desplazamiento_bienes.sy.service'
import {EstadosBienesService} from '../../../servicios/tablas_generales/estados_bienes.service'

import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';


import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

let today: Date = new Date();

@Component({
  selector: 'app-desplazamiento-bienes',
  templateUrl: './desplazamiento-bienes.component.html',
  styleUrls: ['./desplazamiento-bienes.component.scss']

})


export class DesplazamientoBienesComponent implements OnInit {

@Output() devuelve_desplazamiento_bien:EventEmitter<DesplazamientoBienInterface> = new EventEmitter<DesplazamientoBienInterface>()//devovlemos cuando invoquen al componente

faPlus = faPlus;//icono nuevo
faInfo = faInfo//icono info
faPrint = faPrint//icono info
public icoForm =faPlus;
public faEdit=faEdit;
public dataBienEstado;

public opcion;//opciones para crud  0=nuevo 1=ver 2=modificar 3=eliminar
//toas
@ViewChild('defaulttoast',{static: true})
public toastObj: ToastComponent;
@ViewChild('toastBtnShow',{static: true})
public btnEleShow: ElementRef;
public position: Object = { X: "Right" };


public toasts: { [key: string]: Object }[] = [
  { title: 'Advertencia!', content: 'No se ha seleccionado un plan.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
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
    let btnPlanVer: HTMLElement = document.getElementById('btnPlanVer');
    let btnPlanModificar: HTMLElement = document.getElementById('btnPlanModificar');
    let btnPlanEliminar: HTMLElement = document.getElementById('btnPlanEliminar');
    if (e.target !== btnPlanVer &&  e.target !== btnPlanModificar && e.target !== btnPlanEliminar && this.toastObj.target === document.body) {
        this.toastObj.hide('All');
    }
}

//imprimir documentp

public BtnImprimirDocumentoDesplazamientoClick: EmitType<object> = () => {   
  console.log("imprimiendo");  
  pdfMake.createPdf(this.report.DocumentoDesplazamiento(this.DesplazamientoBien,this.dataBienEstado)).open();
}

 

  public DesplazamientoBien:DesplazamientoBienInterface;//formulario interfaz data
 //variablres para pasarle al componente local-detalles-ubicacion



 //DIALOGO

 @ViewChild('alertDialog',{static: true})
 public alertDialog: DialogComponent;
 public alertHeader: string = 'Eiminar registros';
 public hidden: Boolean = false;
 public targetD: string = '.control-section';
 public alertWidth: string = '400px';
 public alertContent: string = '<h4>Esta seguro de Eliminar el registro seleccionado?</h4>';
 public showCloseIconD: Boolean = false;
 public isModalAlert: Boolean = true;
 public animationSettingsD: Object = { effect: 'None' };
 public toolbar: Object[];
 public alertDlgBtnClick = () => {
     //eliminar registro seleccionado
 
     this.serviceCrud.delete(this.DesplazamientoBien.iDespBienId).subscribe((respon)=>{      
      console.log(respon["validated"])
      if(respon["validated"]==true)
       this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
       this.grid.refresh();//refresescamos la grilñla  
      }); 
      this.alertDialog.hide();
      this.setDesplazamientoBienDatos("autogenerado","","","","","",'','','',[],'','');
     
 }
 public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'Si', isPrimary: true } }];
 //FIN DIALOGO
  
//VENTANA MODAL
 PadLeft(value, length) {
  return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
  value;
}
  @ViewChild('template',{static: true})
    public Dialog: DialogComponent;
    public proxy: any = this;
    public date: Object = new Date();
    public BtnNuevoPlanClick: EmitType<object> = () => {   
    //
    let date: Date = new Date();  
    let dia=this.PadLeft( date.getDay(),2);
    let mes=this.PadLeft( date.getMonth(),2);
    let daten=date.getFullYear()+'-'+mes+'-'+dia;  
    let anio=date.getFullYear(); 
 //   console.log(daten);//'2019-11-03'  2019-10-3
   

      this.setDesplazamientoBienDatos("autogenerado",daten,"",2,"",anio,'','','',[],'','');
      if(this.grid.getSelectedRecords().length){  
         this.grid.clearSelection();  

      }  

        this.icoForm=faPlus;
        this.opcion=0;       
        this.Dialog.show();  
    }

    public BtnVerPlanClick: EmitType<object> = () => {  
      if(this.grid.getSelectedRecords().length>0) {   
           this.icoForm=faInfo;
           this.opcion=1;                     
           this.Dialog.show();  
        } else {                  
          this.toastObj.show(this.toasts[0]);
        }       
    }
    public BtnModificarPlanClick: EmitType<object> = () => {
       if(this.grid.getSelectedRecords().length>0) {     
        this.icoForm=faEdit;  
          this.opcion=2;                   
          this.Dialog.show();  

      } else {                  
        this.toastObj.show(this.toasts[0]);
      }  
    }

    public BtnEliminarPlanClick: EmitType<object> = () => {   
       
        if(this.grid.getSelectedRecords().length>0) {                         
          this.alertDialog.show();
       } else {                  
       
        this.toastObj.show(this.toasts[0]);
       }  
    }

    public showCloseIcon: Boolean = true;

    public height: string = '100%';



    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '90%';

    public isModal: Boolean = true;

    public dialogdragging: Boolean = true;

    public dialogClose: EmitType<object> = () => {
      switch (this.opcion) {
          case 0:
              document.getElementById('btnPlanNuevo').style.display = '';
              break;
          case 1:
            document.getElementById('btnPlanVer').style.display = '';
              break;
          case 2:
            document.getElementById('btnPlanModificar').style.display = '';
              break;     
          default:
              console.log("No such day exists!");
              break;
        }
      
    }

    public dialogOpen: EmitType<object> = () => {
       // document.getElementById('btnLocalNuevo').style.display = 'none';
        switch (this.opcion) {
          case 0:
              document.getElementById('btnPlanNuevo').style.display = 'none';
              break;
          case 1:
            document.getElementById('btnPlanVer').style.display = 'none';
              break;
          case 2:
            document.getElementById('btnPlanModificar').style.display = 'none';
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


  @ViewChild('grid',{static: true})
  public grid: GridComponent;
  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public pageSettings: Object;
  public state: DataStateChangeEventArgs;

  
constructor(private service:DesplazamientoBienSyService , private serviceCrud:DesplazamientoBienesService,private dataApiEstadoBienes:EstadosBienesService,private report:ReportService){
  this.data = service;
  this.dataApiEstadoBienes.getCombo().subscribe((respon)=>{ this.dataBienEstado=respon; });
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state);  
}


 

ngOnInit(): void {    
    this.DesplazamientoBien = {
      iDespBienId :'autogenerado',
      dDespBienFecha:'',
      cDespBienDocRef:'',
      iTipoDespId:'',
      idCentroCostoEmpleado:'',
      iYearId:'',
      iOrigenUbicacion:'',
      iDestinoUbicacion:'',
      iOrigenEmpleado:'',
      iDestinoEmpleado:'',
      bienes:[],
      cOrigenEpleadoDNI:'',
      iOrigenUbicacionSubDependencia:'',
      idCentroCostoEmpleadoOrigen:'',
      cDestinoEpleadoDNI:'',
      iDestinoUbicacionSubDependencia:'',
      cDepenNombre:'',
      cCentroCostoNombre:'',
      cDepenNombreO:'',
      cEmpleadoO:'',
      iDocAdqId : ''
  
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
  console.log("select");
  const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.       
  this.setDesplazamientoBienDatos(selectedrecords[0]['iDespBienId'],selectedrecords[0]['dDespBienFecha'],selectedrecords[0]['cDespBienDocRef'],selectedrecords[0]['iTipoDespId'],selectedrecords[0]['idCentroCostoEmpleado'],selectedrecords[0]['iYearId']
  ,selectedrecords[0]['empleado'] ,selectedrecords[0]['cDepenNombre'],selectedrecords[0]['cCentroCostoNombre'],selectedrecords[0]['bienes'],selectedrecords[0]['cDepenNombreO'],selectedrecords[0]['cEmpleadoO']);    
  this.devuelve_desplazamiento_bien.emit(this.DesplazamientoBien);
}


setDesplazamientoBienDatos(iDespBienId,dDespBienFecha,cDespBienDocRef,iTipoDespId,idCentroCostoEmpleado,iYearId,empleado,cDepenNombre,cCentroCostoNombre,bienes,cDepenNombreO,cEmpleadoO){
  this.DesplazamientoBien = {   
    iDespBienId:iDespBienId,
    dDespBienFecha:dDespBienFecha,
    cDespBienDocRef:cDespBienDocRef,
    iTipoDespId:iTipoDespId,
    idCentroCostoEmpleado:idCentroCostoEmpleado,
    iYearId:iYearId,
    iOrigenUbicacion:'',
    iDestinoUbicacion:'',
    iOrigenEmpleado:empleado,
    iDestinoEmpleado:'',
    bienes:bienes  ,
    cOrigenEpleadoDNI:'',
    iOrigenUbicacionSubDependencia:'',
    idCentroCostoEmpleadoOrigen:'',
    cDestinoEpleadoDNI:'',
    iDestinoUbicacionSubDependencia:'',
    cDepenNombre:cDepenNombre,
    cCentroCostoNombre:cCentroCostoNombre,
    cDepenNombreO:cDepenNombreO,
    cEmpleadoO:cEmpleadoO,
    iDocAdqId : ''
  };
}


public cerrar_ventana_modal(DesplazamientoBien:DesplazamientoBienInterface){  
  if(this.opcion==0){
    this.serviceCrud.crear(DesplazamientoBien).subscribe((respon)=>{
    if(respon["validated"]==true)
     this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
     this.grid.refresh();//refresescamos la grilñla  
    });    
  }else{
      this.serviceCrud.modificar(DesplazamientoBien).subscribe((respon)=>{ 
      if(respon["validated"]==true)
      this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });   
      this.grid.refresh();//refresescamos la grilñla 
      });
  }  
}
cerrar_ventana_modal_(b:string){
  //if(b!="0")
    this.Dialog.hide();
}

}
