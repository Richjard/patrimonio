
import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { SituacionBiensService } from 'src/app/subModulos/servicios/tablas_generales/situacion_bien.service';
import { DocumentosService } from 'src/app/subModulos/servicios/tablas_generales/documentos.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent,FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { SituacionesBienesInterface } from 'src/app/subModulos/interfaces/bienes/situaciones-bienes-interface'
import { DesplazamientoBienInterface } from 'src/app/subModulos/interfaces/bienes/desplazamiento-bienes-nterface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'
import { CentroCostoEmpleadoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/centro_costo_empleado-tablasGenerales-interface'
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DesplazamientoBienesService } from 'src/app/subModulos/servicios/bienes/desplazamiento_bienes.service'
@Component({
  selector: 'app-asignar-form-bienes',
  templateUrl: './asignar-form-bienes.component.html',
  styleUrls: ['./asignar-form-bienes.component.scss']
})

export class AsignarFormBienesComponent implements OnInit {
  private NroSelectDocumentoAsignamiento:string;
  private idSelectDocumentoAdquisicion="null";

  private textSelectCentroCostoEmpleado:string;
  public dataTipoDesplazamiento;
  private CentroCostoEmpleadoSelec:CentroCostoEmpleadoInterface;

  public TipoDesplazamientoData: Object[] = [
      { iTipoDespId: '1', Descripcion: 'Asignación' },
  
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Descripcion', value: 'iTipoDespId' };
  // set the height of the popup element
  public height: string = '220px';

  // set the value to select an item based on mapped value at initial rendering
  public value: string = '1';
  @ViewChild('tipoDesplazamientoList',{static: true})
  public tipoDesplazamientoObj: DropDownListComponent;


 public iDocAdqIdData;
// maps the appropriate column to fields property
public iDocAdqIdfields: Object = { text: 'cDocAdqNro', value: 'iDocAdqId' };
// set the height of the popup element
@ViewChild('DestGrid',{static: true})
public DestGrid: GridComponent;

public destData: Object[] = [];

public editSettings: Object;//PARA EDitar grilla
public toolbar: string[];//para editat grilla


public editparams: Object;


public  dataEstadosBien: object[] = [{ cEstadoBienDescripcion: "Bueno"}, { cEstadoBienDescripcion: "Malo" }, { cEstadoBienDescripcion: "Regular" },{ cEstadoBienDescripcion: "Nuevo" }];


@ViewChild('iDocAdqIdList',{static: true})
public iDocAdqIdLObj: DropDownListComponent;

public filterPlaceholder: string = 'Search';
// filtering event handler to filter a Country
public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('cDocAdqNro', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.iDocAdqIdData, query);
}
public onChangeDocAdq(): void {

  console.log("orden:"+this.iDocAdqIdLObj.value);
  this.dataApiDataBienes.getDataBienesPorOC(this.iDocAdqIdLObj.value).subscribe((respon)=>{ this.destData=respon; });
  //destData
  //recuperamos los bienes de la orden
  
}

  @ViewChild('dialogCentroCostoEmpleado',{static: false})
  public dialogCentroCostoEmpleado: DialogComponent;
  
  public proxy: any = this;
  
  
  public BtnVerCentroCostoEmpleadoDestinoClick: EmitType<object> = () => {  
   // this.opcion=0;
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
 
}

public dialogOpen: EmitType<object> = () => {  
}

  public DesplazamientoBien:DesplazamientoBienInterface;//formulario interfaz data



public dataSituacion;
public SituacionFields: Object = { text:'cSituacionBienDescripcion',value: 'iSituacionBienId' };
// set the height of the popup element
public heighte: string = '200px';
// set the placeholder to DropDownList input element
public SituacionMark: string = 'Seleccione una situacion';

public valuee: string = '3';




@ViewChild('situacionList',{static: false})
// country DropDownList instance
public situacionList: DropDownListComponent;

  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DesplazamientoBienInterface> = new EventEmitter<DesplazamientoBienInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('BienSituacionForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 







    
    @ViewChild('situacionList',{static: true})
    // country DropDownList instance
    public situacionObj: DropDownListComponent;
    skillForm: FormGroup;
    public date: Object = new Date();
    public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:SituacionBiensService,private route:ActivatedRoute,private serviceDocumentoAdq:DocumentosService,private dataApiDataBienes:DesplazamientoBienesService) { 
 

   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
public  anio;
public fecha;
PadLeft(value, length) {
  return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
  value;
}
  ngOnInit() {

    this.editSettings = { allowEditing: true,  allowDeleting: true ,mode: 'Batch' };
    this.toolbar = [ 'Update', 'Cancel','Delete'];

    this.editparams = {       
      params: { 
                  //popupHeight: '500px' ,    
                  //  query: new Query(), 
                    dataSource: this.dataEstadosBien, 
                    fields: { value: "cEstadoBienDescripcion", text: "cEstadoBienDescripcion" } 
              }  
  };
  
    this.serviceDocumentoAdq.getCombo().subscribe((respon)=>{ this.iDocAdqIdData=respon; 
      //this.situacionObj.value = '1';
    });
    this.tipoDesplazamientoObj.value=1;
    console.log("fecha  ="+this.date);

    let date: Date = new Date();  
    console.log("fecha sistema:"+ new Date());
    let dia=this.PadLeft( date.getDay(),2);
    let mes=this.PadLeft( date.getMonth(),2);
    this.fecha=date.getFullYear()+'-'+mes+'-'+dia;  
    console.log("fecha calcualda:"+ new Date().getDay());//dd-MM-yyyy
    console.log("mes :"+ new Date().getMonth());//dd-MM-yyyy
     this.anio=date.getFullYear(); 

    
    this.DesplazamientoBien = {
      iDespBienId :'autogenerado',
      dDespBienFecha:this.fecha,
      cDespBienDocRef:'',
      iTipoDespId:'2',
      idCentroCostoEmpleado:'',
      iYearId:''+this.anio+'',
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
      iDocAdqId : '',
      asignacion:1
  
    };
 

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarButtonAsignacionBien(): void {
  this.DesplazamientoBien.cDespBienDocRef=this.iDocAdqIdLObj.text; 
  this.DesplazamientoBien.idCentroCostoEmpleadoOrigen='43';
  this.DesplazamientoBien.iTipoDespId='2';
  this.DesplazamientoBien.bienes=this.destData;
  this.devuelve_hijo.emit(this.DesplazamientoBien);
 // this.Dialog.hide(); 
  this.onFormSubmit();
   
}
public onFormSubmit(): void {
  //this.form.reset();
  this.DesplazamientoBien = {
    iDespBienId :'autogenerado',
    dDespBienFecha:this.fecha,
    cDespBienDocRef:'',
    iTipoDespId:'2',
    idCentroCostoEmpleado:'',
    iYearId:''+this.anio+'',
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
    iDocAdqId : '',
    asignacion:1

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
      this.DesplazamientoBien.idCentroCostoEmpleado=this.CentroCostoEmpleadoSelec.idCentroCostoEmpleado;
      this.DesplazamientoBien.iDestinoUbicacion=this.CentroCostoEmpleadoSelec.cDepenNombre;
      this.DesplazamientoBien.iDestinoUbicacionSubDependencia=this.CentroCostoEmpleadoSelec.cCentroCostoNombre;
      this.DesplazamientoBien.cDestinoEpleadoDNI=this.CentroCostoEmpleadoSelec.cEmpleadoDni;
      this.DesplazamientoBien.iDestinoEmpleado=this.CentroCostoEmpleadoSelec.empleado;
      this.dialogCentroCostoEmpleado.hide(); 

  }

}





}


