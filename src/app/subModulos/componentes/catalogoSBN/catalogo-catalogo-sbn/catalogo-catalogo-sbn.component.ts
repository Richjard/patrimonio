import { Component, OnInit,ViewChild,ElementRef,HostListener,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faPlus, faEdit, faTrashAlt,faSave,faInfo } from '@fortawesome/free-solid-svg-icons';


import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';



//servicios
import {CatalogoService} from './../../../servicios/catalogo_sbn/catalogo.service'
import {CatalogoSyService} from './../../../servicios/catalogo_sbn/catalogo.sy.service'

//interface

import {CatalogoSBNInterface} from './../../../interfaces/catalogoSBN/catalogo-sbn-nterface';


//synfusioin




import { DataStateChangeEventArgs,RowSelectEventArgs  } from '@syncfusion/ej2-grids';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastComponent, ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import { FormGroupDirective } from '@angular/forms';

let today: Date = new Date();

@Component({
  selector: 'app-catalogo-catalogo-sbn',
  templateUrl: './catalogo-catalogo-sbn.component.html',
  styleUrls: ['./catalogo-catalogo-sbn.component.scss']
})

export class CatalogoCatalogoSBNComponent implements OnInit {

  @Output() devuelve_catalogoSBN:EventEmitter<CatalogoSBNInterface> = new EventEmitter<CatalogoSBNInterface>()//devovlemos cuando invoquen al componente


faPlus = faPlus;//icono nuevo
faInfo = faInfo//icono info
icoForm =faPlus;
 faEdit=faEdit;

 public inputToChild: Object;

public opcion;//opciones para crud  0=nuevo 1=ver 2=modificar 3=eliminar
//toas
@ViewChild('defaulttoast',{static: true})
public toastObj: ToastComponent;
@ViewChild('toastBtnShow',{static: true})
public btnEleShow: ElementRef;
public position: Object = { X: "Right" };


public toasts: { [key: string]: Object }[] = [
  { title: 'Advertencia!', content: 'No se ha seleccionado un Local.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
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
    let btnLocalVer: HTMLElement = document.getElementById('btnLocalVer');
    let btnLocalModificar: HTMLElement = document.getElementById('btnLocalModificar');
    let btnLocalEliminar: HTMLElement = document.getElementById('btnLocalEliminar');
    if (e.target !== btnLocalVer &&  e.target !== btnLocalModificar && e.target !== btnLocalEliminar && this.toastObj.target === document.body) {
        this.toastObj.hide('All');
    }
}

  //DIALOGO

 

public Catalogo:CatalogoSBNInterface;//formulario interfaz data

 public datos_nombre_="Richard";
 public identificacion={
    id:5,
    web:"carlnet.pe"

 }

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
      this.Catalogo.iCatSbnId;
      console.log("id Elminidado:::"+this.Catalogo.iCatSbnId);
      this.serviceCrud.delete(this.Catalogo.iCatSbnId).subscribe((respon)=>{      
      console.log(respon["validated"])
      if(respon["validated"]==true)
       this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
       this.grid.refresh();//refresescamos la grilñla  
      }); 
      this.alertDialog.hide();
      this.setAreaDatos("autogenarado","","","","","","");
 }
 public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'Si', isPrimary: true } }];
 //FIN DIALOGO
  
//VENTANA MODAL

  @ViewChild('template',{static: true})
    public Dialog: DialogComponent;
    public proxy: any = this;

    public BtnNuevoClick: EmitType<object> = () => {   
      this.setAreaDatos("autogenerado","","","","","","");
      if(this.grid.getSelectedRecords().length){  
         this.grid.clearSelection();          
      }  
      this.icoForm=faPlus;
      this.opcion=0;       
      this.Dialog.show();  
    }

    public BtnVerClick: EmitType<object> = () => {  
      if(this.grid.getSelectedRecords().length>0) {
        // this.setOficinaForm(this.Oficina.iOficinaId,this.Oficina.cOficinaDescripcion,this.Oficina.iLocalId,this.Oficina.cLocalDescripcion,this.Oficina.iAreaId,this.Oficina.cAreaDescripcion)  
         
         
         const selectedrecords: object[] = this.grid.getSelectedRecords();  // 
         this.setAreaDatos(selectedrecords[0]['iCatSbnId'],selectedrecords[0]['cCatSbnCodigo'],selectedrecords[0]['cCatSbnDescripcion'],selectedrecords[0]['cCatSbnResolucion'],selectedrecords[0]['bCatSbnEstado'],selectedrecords[0]['iGrupoGenId'],selectedrecords[0]['iGrupoClaseGenId']);
  
         
            this.icoForm=faInfo;
            this.opcion=1;                     
            this.Dialog.show();  
         } else {                  
           this.toastObj.show(this.toasts[0]);
         }      
    }
    public BtnModificarClick: EmitType<object> = () => {
       if(this.grid.getSelectedRecords().length>0) { 
       // this.setOficinaForm(this.Oficina.iOficinaId,this.Oficina.cOficinaDescripcion,this.Oficina.iLocalId,this.Oficina.cLocalDescripcion,this.Oficina.iAreaId,this.Oficina.cAreaDescripcion)  
       
         const selectedrecords: object[] = this.grid.getSelectedRecords();  // 
         this.setAreaDatos(selectedrecords[0]['iCatSbnId'],selectedrecords[0]['cCatSbnCodigo'],selectedrecords[0]['cCatSbnDescripcion'],selectedrecords[0]['cCatSbnResolucion'],selectedrecords[0]['bCatSbnEstado'],selectedrecords[0]['iGrupoGenId'],selectedrecords[0]['iGrupoClaseGenId']);
  
        // console.log
        this.icoForm=faEdit;  
          this.opcion=2;      
          console.log("opcion ::::"+this.opcion);             
          this.Dialog.show();  

      } else {                  
        this.toastObj.show(this.toasts[0]);
      }  
    }

    public BtnEliminarClick: EmitType<object> = () => {    
        if(this.grid.getSelectedRecords().length>0) {             
         const selectedrecords: object[] = this.grid.getSelectedRecords();  // 
         this.setAreaDatos(selectedrecords[0]['iCatSbnId'],selectedrecords[0]['cCatSbnCodigo'],selectedrecords[0]['cCatSbnDescripcion'],selectedrecords[0]['cCatSbnResolucion'],selectedrecords[0]['bCatSbnEstado'],selectedrecords[0]['iGrupoGenId'],selectedrecords[0]['iGrupoClaseGenId']);
                   
          this.alertDialog.show();
       } else {                  
       
        this.toastObj.show(this.toasts[0]);
       }  
    }

    public showCloseIcon: Boolean = true;

    public height: string = '90%';



    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '435px';

    public isModal: Boolean = true;

    public dialogdragging: Boolean = true;

    public dialogClose: EmitType<object> = () => {
      switch (this.opcion) {
          case 0:
              document.getElementById('btnAreaNuevo').style.display = '';
              break;
          case 1:
            document.getElementById('btnAreaVer').style.display = '';
              break;
          case 2:
            document.getElementById('btnAreaModificar').style.display = '';
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
              document.getElementById('btnAreaNuevo').style.display = 'none';
              break;
          case 1:
            document.getElementById('btnAreaVer').style.display = 'none';
              break;
          case 2:
            document.getElementById('btnAreaModificar').style.display = 'none';
              break;     
          default:
              console.log("No such day exists!");
              break;
        }
        /*(document.getElementById('sendButton') as any).keypress = (e: any) => {
            if (e.keyCode === 13) { this.updateTextValue(); }
        };    
        /*(document.getElementById('inVal')as HTMLElement).onkeydown = (e: any) => {
            if (e.keyCode === 13) { this.updateTextValue(); }
        };    */
       /* document.getElementById('GuardarButtonLocales').onclick = (): void => {
          console.log("guardar datos");
           // this.updateTextValue();
        };*/
    }

    public updateTextValue: EmitType<object> = () => {
        /*let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
        let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
        let dialogTextWrap : HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
        if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
            detach(document.getElementsByClassName('contentText')[0]);
        }
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';*/
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


constructor(private service: CatalogoSyService, private serviceCrud:CatalogoService){
  this.data = service;
}

public dataStateChange(state: DataStateChangeEventArgs): void {
  this.service.execute(state);
}


 

ngOnInit(): void {    
    this.Catalogo = {
      iCatSbnId: 'autogenerado',
      cCatSbnCodigo: '',           
      cCatSbnDescripcion:'',
      cCatSbnResolucion:'',
      bCatSbnEstado:false,
      iGrupoGenId:'',
      iGrupoClaseGenId:''  
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
  const selectedrecords: object[] = this.grid.getSelectedRecords();  // 
  this.setAreaDatos(selectedrecords[0]['iCatSbnId'],selectedrecords[0]['cCatSbnCodigo'],selectedrecords[0]['cCatSbnDescripcion'],selectedrecords[0]['cCatSbnResolucion'],selectedrecords[0]['bCatSbnEstado'],selectedrecords[0]['iGrupoGenId'],selectedrecords[0]['iGrupoClaseGenId']);
  this.devuelve_catalogoSBN.emit(this.Catalogo);
}


setAreaDatos(iCatSbnId,cCatSbnCodigo,cCatSbnDescripcion,cCatSbnResolucion,bCatSbnEstado,iGrupoGenId,iGrupoClaseGenId){ 
  let estado=false;
  if(bCatSbnEstado==1){
    estado=true;
  }
  this.Catalogo = {
    iCatSbnId : iCatSbnId,
    cCatSbnCodigo:cCatSbnCodigo,
    cCatSbnDescripcion :cCatSbnDescripcion,
    cCatSbnResolucion:cCatSbnResolucion,
    bCatSbnEstado:estado,
    iGrupoGenId:iGrupoGenId,
    iGrupoClaseGenId:iGrupoClaseGenId
  };
}




public cerrar_ventana_modal(catalogo:CatalogoSBNInterface){  
  if(this.opcion==0){
    this.serviceCrud.crear(catalogo).subscribe((respon)=>{
    if(respon["validated"]==true)
     this.toastObj.show( { title: 'Éxito!', content: respon["mensaje"], cssClass: 'e-toast-success', icon: 'e-success toast-icons' });  
     this.grid.refresh();//refresescamos la grilñla  
    });    
  }else{
      this.serviceCrud.modificar(catalogo).subscribe((respon)=>{ 
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
