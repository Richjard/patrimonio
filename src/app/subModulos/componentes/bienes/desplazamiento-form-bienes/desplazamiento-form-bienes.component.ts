import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { FormasAdquisicionService } from 'src/app/subModulos/servicios/tablas_generales/formas_adquisicion.service';
import {ActivatedRoute,Params} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { DesplazamientoBienInterface } from 'src/app/subModulos/interfaces/bienes/desplazamiento-bienes-nterface'
import { CentroCostoEmpleadoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/centro_costo_empleado-tablasGenerales-interface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'
import { TipoDesplazamientoService } from 'src/app/subModulos/servicios/tablas_generales/tipo_desplazamiento.service'
import { EmpleadoBienesService } from 'src/app/subModulos/servicios/bienes/empleado_bienes.service'


import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service'
import { EstadosBienesService } from 'src/app/subModulos/servicios/tablas_generales/estados_bienes.service'

@Component({
  selector: 'app-desplazamiento-form-bienes',
  templateUrl: './desplazamiento-form-bienes.component.html',
  styleUrls: ['./desplazamiento-form-bienes.component.scss']
})
export class DesplazamientoFormBienesComponent implements OnInit {
 
  private opcion:number;
  private textSelectCentroCostoEmpleado:string;
  public dataTipoDesplazamiento;
  private CentroCostoEmpleadoSelec:CentroCostoEmpleadoInterface;
  public TipoDesplazamientoFields: Object = { text:'cTipoDespDescripcion',value: 'iTipoDespId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public TipoDesplazamientoWaterMark: string = 'Seleccione tipo desplazamiento';

@ViewChild('tipoDesplazamientoBienList',{static: true})
// country DropDownList instance
public tipoDesplazamientoObj: DropDownListComponent;


public dataDependencia;

public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
// set the height of the popup element

// set the placeholder to DropDownList input element
public DependenciaWaterMark: string = 'Seleccione un origen ubicacion';
public DependenciaDestinoWaterMark: string = 'Seleccione un destino ubicacion';

@ViewChild('dependenciaList',{static: true})
// country DropDownList instance
public dependenciaObj: DropDownListComponent;



  @Input("datosDesplazamientoBien") DesplazamientoBien:DesplazamientoBienInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DesplazamientoBienInterface> = new EventEmitter<DesplazamientoBienInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('DesplazamientoBienForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 




  //VENTANA MODAL empleados


@ViewChild('dialogCentroCostoEmpleado',{static: true})
public dialogCentroCostoEmpleado: DialogComponent;

public proxy: any = this;


public BtnVerCentroCostoEmpleadoClick: EmitType<object> = () => {  
  this.opcion=0;
  this.dialogCentroCostoEmpleado.show();  
}

public BtnVerCentroCostoEmpleadoDestinoClick: EmitType<object> = () => {  
  this.opcion=1;
  this.dialogCentroCostoEmpleado.show();  
}

public showCloseIcon: Boolean = true;

public heightModal: string = '80%';



public target: string = '.control-section';

public animationSettings: Object = { effect: 'None' };

public width: string = '835px';
public width_DMCE: string = '90%';
public isModal: Boolean = true;

public dialogdragging: Boolean = true;

public dialogClose: EmitType<object> = () => {
 
     //document.getElementById('btnVerTipos').style.display = '';
  
  
}

public dialogOpen: EmitType<object> = () => {

 /* if(e.keyCode === 13) {
    //var gridIns = (document.getElementsByClassName("e-grid")[0] as any).ej2_instances[0];gridIns.addRecord();
    console.log("1313131");
}*/
 /* this.dialogCentroCostoEmpleado.hide();  
  console.log("abriendo.....");*/

    // document.getElementById('btnVerTipos').style.display = 'none';
   
}

//FIN DIAALOGO
@ViewChild('DestGrid',{static: true})
public DestGrid: GridComponent;

public srcData: Object[] = [];
public destData: Object[] = [];
public pageOptions: Object;
public selectionOptions: Object;
public srcDropOptions: Object;
public destDropOptions: Object;


public editSettings: Object;//PARA EDitar grilla
public toolbar: string[];//para editat grilla


public editparams: Object;


public  dataEstadosBien: object[] = [{ cEstadoBienDescripcion: "Bueno"}, { cEstadoBienDescripcion: "Malo" }, { cEstadoBienDescripcion: "Regular" },{ cEstadoBienDescripcion: "Nuevo" }];


 //public  dataEstadosBien: object[]

    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:FormasAdquisicionService,
    private route:ActivatedRoute,private dataTipoDesplazamientoApi:TipoDesplazamientoService,
    private dataDependenciaApi:DependenciaService,private dataEmpleadoBienesApi:EmpleadoBienesService,private dataApiEstadoBienes:EstadosBienesService) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/


  ngOnInit() {
    /*this.editSettings = { allowEditing: true, mode: 'Dialog' };//para edutar grilla
    this.toolbar = ['Edit' ];  //para editar grilla*/
   // this.dataApiEstadoBienes.getCombo2().subscribe((respon)=>{ this.dataEstadosBien=respon; });

    this.editSettings = { allowEditing: true,  mode: 'Batch' };
    this.toolbar = [ 'Update', 'Cancel'];

    this.editparams = {       
      params: { 
                  //popupHeight: '500px' ,    
                  //  query: new Query(), 
                    dataSource: this.dataEstadosBien, 
                    fields: { value: "cEstadoBienDescripcion", text: "cEstadoBienDescripcion" } 
              }  
  };
    //this.srcData = orderDetails;
    this.pageOptions = { pageCount: 2 };
    this.selectionOptions = { type: 'Multiple' };
    this.srcDropOptions = { targetID: 'DestGrid' };
    this.destDropOptions = { targetID: 'Grid' };

    console.log("fecha  ="+this.date);

   

    this.dataTipoDesplazamientoApi.getCombo().subscribe((respon)=>{ this.dataTipoDesplazamiento=respon; });   
    this.dataDependenciaApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; });

    

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarDesplazamientoBien(): void {
  this.DesplazamientoBien.bienes=this.destData;
  this.devuelve_hijo.emit(this.DesplazamientoBien);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}
public onFormSubmit(): void {
  //this.form.reset();
  this.DesplazamientoBien = {   
    iDespBienId : '*autogenerado',
    dDespBienFecha:'',
    cDespBienDocRef:'',
    iTipoDespId:'',
    idCentroCostoEmpleado:'',
    iYearId:'',
    iOrigenUbicacion:'',
    iDestinoUbicacion:'',
    iOrigenEmpleado:'',
    iDestinoEmpleado:'',
    bienes:[] ,
    cOrigenEpleadoDNI:'',
    iOrigenUbicacionSubDependencia:'',
    idCentroCostoEmpleadoOrigen:'',
    cDestinoEpleadoDNI:'',
    iDestinoUbicacionSubDependencia:'',
    cDepenNombre:'',
    cCentroCostoNombre:'',
    cDepenNombreO:'',
    cEmpleadoO:''
    
  };

  /*this.ocSelect = {  
    NRO_ORDEN : '',
    TIPO_BIEN :'',   
    FECHA_ORDEN :'',
    CONCEPTO : '',
    TOTAL_FACT_SOLES : ''
  };*/
  //this.FormaAdqList.value="1";
  //this.FormaAdqList.text="1777777";
}


public setTexCentroCostoEmpleadoSelect(CentroCostoEmpleado:CentroCostoEmpleadoInterface){    
  this.textSelectCentroCostoEmpleado=CentroCostoEmpleado.empleado;
  this.CentroCostoEmpleadoSelec = {  
    idCentroCostoEmpleado :CentroCostoEmpleado.idCentroCostoEmpleado,
    iCentroCostoId:CentroCostoEmpleado.iCentroCostoId,
    iEmpleadoId :CentroCostoEmpleado.iEmpleadoId,
    bCentroCostoEmpleadoEstado :CentroCostoEmpleado.bCentroCostoEmpleadoEstado,
    iDepenId : CentroCostoEmpleado.iDepenId,
    cCentroCostoNombre : CentroCostoEmpleado.cCentroCostoNombre,
    cDepenNombre:CentroCostoEmpleado.cDepenNombre,
    cEmpleadoDni:CentroCostoEmpleado.cEmpleadoDni,
    empleado:CentroCostoEmpleado.empleado,
  };
}
public BtnOkCentroCostoEmpleadoModalClick(): void{
  if(this.textSelectCentroCostoEmpleado==""){
    console.log("seleccione por favor un Empleado");
  }else{    
    if(this.opcion==0){
      this.dataEmpleadoBienesApi.getData(this.CentroCostoEmpleadoSelec.idCentroCostoEmpleado).subscribe((respon)=>{ this.srcData=respon; });
      this.destData=[];
     // this.DestGrid.refresh();//refresescamos la grilñla 
      this.DesplazamientoBien.idCentroCostoEmpleadoOrigen=this.CentroCostoEmpleadoSelec.idCentroCostoEmpleado;
      this.DesplazamientoBien.iOrigenUbicacion=this.CentroCostoEmpleadoSelec.cDepenNombre;
      this.DesplazamientoBien.iOrigenUbicacionSubDependencia=this.CentroCostoEmpleadoSelec.cCentroCostoNombre;
      this.DesplazamientoBien.cOrigenEpleadoDNI=this.CentroCostoEmpleadoSelec.cEmpleadoDni;
      this.DesplazamientoBien.iOrigenEmpleado=this.CentroCostoEmpleadoSelec.empleado;

    }else{
      
      this.DesplazamientoBien.idCentroCostoEmpleado=this.CentroCostoEmpleadoSelec.idCentroCostoEmpleado;
      this.DesplazamientoBien.iDestinoUbicacion=this.CentroCostoEmpleadoSelec.cDepenNombre;
      this.DesplazamientoBien.iDestinoUbicacionSubDependencia=this.CentroCostoEmpleadoSelec.cCentroCostoNombre;
      this.DesplazamientoBien.cDestinoEpleadoDNI=this.CentroCostoEmpleadoSelec.cEmpleadoDni;
      this.DesplazamientoBien.iDestinoEmpleado=this.CentroCostoEmpleadoSelec.empleado;
    }
   

    


    this.dialogCentroCostoEmpleado.hide(); 

  }
}


/*public setTextDocumentosTramiteSelect(DocumentoTramite:DesplazamientoBienInterface){  
  console.log("Modelo Seleccionado::"+DocumentoTramite.iTramMovId);
  this.textSelectDocumentoTramite=DocumentoTramite.iTramNumRegistro;
  this.idSelectDocumentoTramite=DocumentoTramite.iTramMovId;
}
public BtnOkDocumentosTramiteModalClick(): void{
  if(this.idSelectDocumentoTramite=="null"){
    console.log("seleccione por favor un documento de referencia");
  }else{
    console.log("seleccionado:"+this.textSelectDocumentoTramite);
    this.Documento.iTramNumRegistro=this.textSelectDocumentoTramite;
    this.Documento.iTramMovId=this.idSelectDocumentoTramite;
    this.Dialog.hide(); 

  }
}*/



/*public setTextOrdenCompraSelect(Oc:OcInterface){  
  console.log("Modelo Seleccionado::"+Oc.NRO_ORDEN);
  this.textSelectOC=Oc.NRO_ORDEN;
 

  this.ocSelect = {  
    NRO_ORDEN:Oc.NRO_ORDEN,
    TIPO_BIEN:Oc.TIPO_BIEN,
    FECHA_ORDEN:Oc.FECHA_ORDEN,
    CONCEPTO:Oc.CONCEPTO,
    TOTAL_FACT_SOLES:Oc.TOTAL_FACT_SOLES,
  };
}
public BtnOkOrdenCompraModalClick(): void{
  if(this.textSelectOC==""){
    console.log("seleccione por favor un O/C");
  }else{
    console.log("seleccionado:"+this.textSelectOC);
    this.Documento.cDocAdqNro=this.ocSelect.NRO_ORDEN;
    this.Documento.dDocAdqFecha=this.ocSelect.FECHA_ORDEN;
    this.Documento.nDocAdqValor=this.ocSelect.TOTAL_FACT_SOLES;
    this.Documento.cDocAdqObs=this.ocSelect.CONCEPTO;
    this.dialogOC.hide(); 

  }
}*/

}

