
import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


import { CentroCostoEmpleadoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/centro_costo_empleado-tablasGenerales-interface'
import { EmpleadoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/empleado-tablasGenerales-interface'

import { CentroCostoService } from 'src/app/subModulos/servicios/tablas_generales/centro_costo.service';
import { EmpleadosService } from 'src/app/subModulos/servicios/tablas_generales/empleados.service';
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-centro-costo-empleado-form-tabla-generales',
  templateUrl: './centro-costo-empleado-form-tabla-generales.component.html',
  styleUrls: ['./centro-costo-empleado-form-tabla-generales.component.scss']
})
export class CentroCostoEmpleadoFormTablaGeneralesComponent implements OnInit {

  private textSelectEmpleado:string;
  private textSelectEmpleadoDNI:string;
  private textSelectEmpleadoID:string;
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataDependencia;
public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public DependenciaMark: string = 'Seleccione una dependencia';



public dataCentroCosto;
public CentroCostoFields: Object = { text:'cCentroCostoNombre',value: 'iCentroCostoId' };
// set the height of the popup element


public dataEmpleado;
public EmpleadoFields: Object = { text:'cCentroCostoNombre',value: 'iCentroCostoId' };
// set the height of the popup element
public EmpleadoMark: string = 'Seleccione una empleado';


  @Input("datosCentroCostoEmpleado") CentroCostoEmpleado:CentroCostoEmpleadoInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<CentroCostoEmpleadoInterface> = new EventEmitter<CentroCostoEmpleadoInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('CentroCostoEmpleadoForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 



    @ViewChild('DependenciaList',{static: true})
    // country DropDownList instance
    public DependenciaObj: DropDownListComponent;
    @ViewChild('CentroCostoList',{static: true})
    // state DropDownList instance
    public CentroCostoObj: DropDownListComponent;


    public onChange1(): void {
      /*this.CentroCostoObj.enabled = true;
      console.log("id dependencia:"+this.CentroCostoObj.value);
      // query the data source based on country DropDownList selected value
     let tempQuery: Query = new Query().where('iDepenId', 'equal', this.DependenciaObj.value);
     this.CentroCostoObj.query = tempQuery;
      // clear the existing selection.
    // this.CentroCostoObj.text = null;
     // bind the property changes to state DropDownList
     this.CentroCostoObj.dataBind();*/
     let tempQuery: Query = new Query().where('iDepenId', 'equal', this.DependenciaObj.value);
     this.CentroCostoObj.query = tempQuery;
     this.CentroCostoObj.dataBind();
     // clear the existing selection.
     if(this.CentroCostoEmpleado.iCentroCostoId=="" ){
       this.CentroCostoObj.enabled = true;
       this.CentroCostoObj.text = null;
       this.CentroCostoObj.value = null;
     }
       
     if(this.DependenciaObj.value!=null){
       this.CentroCostoObj.enabled = true;
     }else{
       this.CentroCostoObj.enabled = false;
     }
         


      
      
    }




//VENTANA MODAL empleados



@ViewChild('dialogEmpleado',{static: true})
public dialogEmpleado: DialogComponent;

public proxy: any = this;


public BtnVerEmpleadosClick: EmitType<object> = () => {  
  this.dialogEmpleado.show();  
}

public showCloseIcon: Boolean = true;

public heightModal: string = '80%';



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



    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:DependenciaService,private route:ActivatedRoute, private dataApiCentroCosto:CentroCostoService, private dataApiEmpleado:EmpleadosService) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; });  
    this.dataApiCentroCosto.getCombo().subscribe((respon)=>{ this.dataCentroCosto=respon; }); 
    this.dataApiEmpleado.getCombo().subscribe((respon)=>{ this.dataEmpleado=respon; }); 




  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarCentroCostoEmpleado(): void {
  this.devuelve_hijo.emit(this.CentroCostoEmpleado);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}




ngOnChanges(changes: SimpleChanges){
  
  //this.b=1;
 if(this.op=="0"){
  this.DependenciaObj.value = null; 
  this.CentroCostoObj.value = null;
  this.CentroCostoObj.text = null;
  this.DependenciaObj.text = null;
  this.CentroCostoObj.enabled = false;
 }else{

  if(this.op!="1"){
    this.CentroCostoObj.enabled = true;
  }
  
 }
   
 
}
public onFormSubmit(): void {
  //this.form.reset(); 

  this.CentroCostoEmpleado = {     
    idCentroCostoEmpleado : 'autogenerado',
    iCentroCostoId: '',   
    iEmpleadoId :'',
    bCentroCostoEmpleadoEstado : true,
    iDepenId : '',
    cCentroCostoNombre : '',
    cDepenNombre:'',
    cEmpleadoDni:'',
    empleado:'',
   

  };
 
  //this.FormaAdqList.text="1777777";
}



public setTexEmpleadoSelect(Empleado:EmpleadoInterface){    
  this.textSelectEmpleado=Empleado.cEmpleadoApellidoP+' '+Empleado.cEmpleadoApellidoM+', '+Empleado.cEmpleadoNombre;
  this.textSelectEmpleadoDNI=Empleado.cEmpleadoDni;
  this.textSelectEmpleadoID=Empleado.iEmpleadoId;
}
public BtnOkEmpleadoModalClick(): void{
  if(this.textSelectEmpleadoID==""){
    console.log("seleccione por favor un Empleado");
  }else{
    console.log("seleccionado:"+this.textSelectOC);
    this.CentroCostoEmpleado.iEmpleadoId=this.textSelectEmpleadoID;
    this.CentroCostoEmpleado.empleado=this.textSelectEmpleado;
    this.CentroCostoEmpleado.cEmpleadoDni=this.textSelectEmpleadoDNI;
    this.dialogEmpleado.hide(); 

  }
}


}



