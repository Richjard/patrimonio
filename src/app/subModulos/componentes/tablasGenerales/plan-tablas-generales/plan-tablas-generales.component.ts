import { Component, OnInit,ViewChild,ElementRef,HostListener,Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';



//servicios
import {PlanesService} from '../../../servicios/tablas_generales/planes.service'


//interface

import {PlanInterface} from './../../../interfaces/tablasGenerales/plan-tablasGenerales-interface';


//synfusioin



import {PlanesSyService} from '../../../servicios/tablas_generales/planes.sy.service'
import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';

let today: Date = new Date();


@Component({
  selector: 'app-plan-tablas-generales',
  templateUrl: './plan-tablas-generales.component.html',
  styleUrls: ['./plan-tablas-generales.component.scss']
})



export class PlanTablasGeneralesComponent implements OnInit {

@Output() devuelve_planes:EventEmitter<PlanInterface> = new EventEmitter<PlanInterface>()//devovlemos cuando invoquen al componente

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

  //DIALOGO

 

  public Plan:PlanInterface;//formulario interfaz data
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
 
      this.serviceCrud.delete(this.Plan.iPlanContId).subscribe((respon)=>{      
      console.log(respon["validated"])
      if(respon["validated"]==true)
       this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
       this.grid.refresh();//refresescamos la grilñla  
      }); 
      this.alertDialog.hide();
      this.setPlanDatos("autogenerado","","");
     
 }
 public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'Si', isPrimary: true } }];
 //FIN DIALOGO
  
//VENTANA MODAL

  @ViewChild('template',{static: true})
    public Dialog: DialogComponent;
    public proxy: any = this;
    public BtnNuevoPlanClick: EmitType<object> = () => {   
      this.setPlanDatos("autogenerado","","");
      if(this.grid.getSelectedRecords().length){  
         this.grid.clearSelection();          
      }  

        this.icoForm=faPlus;
        this.opcion=0;       
        this.Dialog.show();  
    }

    public BtnVerPlanClick: EmitType<object> = () => {  
      if(this.grid.getSelectedRecords().length>0) {  
           const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.       
           this.setPlanDatos(selectedrecords[0]['iPlanContId'],selectedrecords[0]['cPlanContDescripcion'],selectedrecords[0]['cPlanContCodigo']);       
  
           this.icoForm=faInfo;
           this.opcion=1;                     
           this.Dialog.show();  
        } else {                  
          this.toastObj.show(this.toasts[0]);
        }       
    }
    public BtnModificarPlanClick: EmitType<object> = () => {
       if(this.grid.getSelectedRecords().length>0) {  
        const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.       
        this.setPlanDatos(selectedrecords[0]['iPlanContId'],selectedrecords[0]['cPlanContDescripcion'],selectedrecords[0]['cPlanContCodigo']);         

        this.icoForm=faEdit;  
          this.opcion=2;                   
          this.Dialog.show();  

      } else {                  
        this.toastObj.show(this.toasts[0]);
      }  
    }

    public BtnEliminarPlanClick: EmitType<object> = () => {   
       
        if(this.grid.getSelectedRecords().length>0) { 
          const selectedrecords: object[] = this.grid.getSelectedRecords();  // Get the selected records.       
          this.setPlanDatos(selectedrecords[0]['iPlanContId'],selectedrecords[0]['cPlanContDescripcion'],selectedrecords[0]['cPlanContCodigo']);                 
          this.alertDialog.show();
       } else {                  
       
        this.toastObj.show(this.toasts[0]);
       }  
    }

    public showCloseIcon: Boolean = true;

    public height: string = '50%';



    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '435px';

    public isModal: Boolean = false;

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
  public date: Object = new Date()

  @ViewChild('grid',{static: true})
  public grid: GridComponent;
  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public pageSettings: Object;
  public state: DataStateChangeEventArgs;

  
constructor(private service:PlanesSyService , private serviceCrud:PlanesService){
  this.data = service;
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state);
}


 

ngOnInit(): void {    
    this.Plan = {
      iPlanContId :'autogenerado',
      cPlanContCodigo:"",
      cPlanContDescripcion:""
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
  this.setPlanDatos(selectedrecords[0]['iPlanContId'],selectedrecords[0]['cPlanContDescripcion'],selectedrecords[0]['cPlanContCodigo']);    
  this.devuelve_planes.emit(this.Plan);
}


setPlanDatos(iPlanId,cPlanContDescripcion,cPlanContCodigo){
  this.Plan = {   
    iPlanContId : iPlanId,
    cPlanContCodigo :cPlanContCodigo,
    cPlanContDescripcion:cPlanContDescripcion
  };
}


public cerrar_ventana_modal(Plan:PlanInterface){  
  if(this.opcion==0){
    this.serviceCrud.crear(Plan).subscribe((respon)=>{
    if(respon["validated"]==true)
     this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
     this.grid.refresh();//refresescamos la grilñla  
    });    
  }else{
      this.serviceCrud.modificar(Plan).subscribe((respon)=>{ 
      if(respon["validated"]==true)
      this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });   
      this.grid.refresh();//refresescamos la grilñla 
      });
  }  
}
cerrar_ventana_modal_(b:string){
  if(b!="0")
    this.Dialog.hide();
}

}
