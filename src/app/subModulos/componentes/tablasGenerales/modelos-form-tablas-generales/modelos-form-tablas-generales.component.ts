

import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { ModeloInterface } from 'src/app/subModulos/interfaces/tablasGenerales/modelo-tablasGenerales-interface';
import { MarcaInterface } from 'src/app/subModulos/interfaces/tablasGenerales/marca-tablasGenerales-interface';


import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';

import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


@Component({
  selector: 'app-modelos-form-tablas-generales',
  templateUrl: './modelos-form-tablas-generales.component.html',
  styleUrls: ['./modelos-form-tablas-generales.component.scss']
})
export class ModelosFormTablasGeneralesComponent implements OnInit {

  private textSelectMarca:string;
  private idSelectMarca="null";
  @Input("datosModelo") Modelo:ModeloInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<ModeloInterface> = new EventEmitter<ModeloInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('ModeloForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }


//VENTANA MODAL FOR MODELOS

@ViewChild('template',{static: true})
public Dialog: DialogComponent;
public proxy: any = this;

public BtnVerModelosloClick: EmitType<object> = () => {  
      
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
 
     //document.getElementById('btnVerModelos').style.display = '';
  
  
}

public dialogOpen: EmitType<object> = () => {

    // document.getElementById('btnVerModelos').style.display = 'none';
   
}

//FIN DIAALOGO



















  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarModelo(): void {
  this.devuelve_hijo.emit(this.Modelo);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.Modelo = {
    iModeloId : '*autogenerado',
    cModeloDescripcion:"",
    iMarcaId:"",
    cMarcaDescripcion:""
  };
}


public setTextSelect(Marca:MarcaInterface){  
  console.log("marca Seleccionado::"+Marca.cMarcaDescripcion);
  this.textSelectMarca=Marca.cMarcaDescripcion;
  this.idSelectMarca=Marca.iMarcaId;
}
public BtnOkMarcaModalClick(): void{
  if(this.idSelectMarca=="null"){
    console.log("seleccione por favor una marca");
  }else{
    console.log("seleccionado:"+this.textSelectMarca);
    this.Modelo.cMarcaDescripcion=this.textSelectMarca;
    this.Modelo.iMarcaId=this.idSelectMarca;
    this.Dialog.hide(); 

  }
}


}

