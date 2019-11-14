import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { TipoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/tipo-tablasGenerales-interface';
import { ModeloInterface } from 'src/app/subModulos/interfaces/tablasGenerales/modelo-tablasGenerales-interface';


import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';

import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';



@Component({
  selector: 'app-tipos-form-tablas-generales',
  templateUrl: './tipos-form-tablas-generales.component.html',
  styleUrls: ['./tipos-form-tablas-generales.component.scss']
})
export class TiposFormTablasGeneralesComponent implements OnInit {

  private textSelectModelo:string;
  private idSelectModelo="null";
  @Input("datosTipo") Tipo:TipoInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<TipoInterface> = new EventEmitter<TipoInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('TipoForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }


//VENTANA MODAL FOR TipoS

@ViewChild('template',{static: true})
public Dialog: DialogComponent;
public proxy: any = this;

public BtnVerTiposloClick: EmitType<object> = () => {  
      
    this.Dialog.show();  
}

public showCloseIcon: Boolean = true;

public height: string = '80%';



public target: string = '.control-section';

public animationSettings: Object = { effect: 'None' };

public width: string = '835px';

public isModal: Boolean = true;

public dialogdragging: Boolean = true;

public dialogClose: EmitType<object> = () => {
 
     //document.getElementById('btnVerTipos').style.display = '';
  
  
}

public dialogOpen: EmitType<object> = () => {

    // document.getElementById('btnVerTipos').style.display = 'none';
   
}

//FIN DIAALOGO



















  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarTipo(): void {
  this.devuelve_hijo.emit(this.Tipo);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.Tipo = {
    iTipoId : '*autogenerado',
    cTipoDescripcion:"",
    iMarcaId:"",
    cMarcaDescripcion:"",
    iModeloId : "",
    cModeloDescripcion :""  
  };
}


public setTextModeloSelect(Modelo:ModeloInterface){  
  console.log("Modelo Seleccionado::"+Modelo.cModeloDescripcion);
  this.textSelectModelo=Modelo.cModeloDescripcion;
  this.idSelectModelo=Modelo.iModeloId;
}
public BtnOkModeloModalClick(): void{
  if(this.idSelectModelo=="null"){
    console.log("seleccione por favor una Modelo");
  }else{
    console.log("seleccionado:"+this.textSelectModelo);
    this.Tipo.cModeloDescripcion=this.textSelectModelo;
    this.Tipo.iModeloId=this.idSelectModelo;
    this.Dialog.hide(); 

  }
}


}

