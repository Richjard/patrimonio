import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { CargosService } from 'src/app/subModulos/servicios/tablas_generales/cargos.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { BienInterface } from 'src/app/subModulos/interfaces/bienes/catalogo-bienes-nterface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'


@Component({
  selector: 'app-baja-form-bienes',
  templateUrl: './baja-form-bienes.component.html',
  styleUrls: ['./baja-form-bienes.component.scss']
})

export class BajaFormBienesComponent implements OnInit {

  private textSelectDocumentoTramite:string;
  private idSelectDocumentoTramite="null";
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataCargos;
public CargoFields: Object = { text:'cCargNombre',value: 'iCargId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public CargoMark: string = 'Seleccione una cargo';
@ViewChild('CargoList',{static: true})
// country DropDownList instance
public CargoList: DropDownListComponent;

  @Input("datosBien") BienBaja:BienInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<BienInterface> = new EventEmitter<BienInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('BienBajaForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 









    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:CargosService,private route:ActivatedRoute) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataCargos=respon; });  

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarBienBaja(): void {
  this.devuelve_hijo.emit(this.BienBaja);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  //this.onFormSubmit();
   
}
/*public onFormSubmit(): void {
  //this.form.reset();
  this.Empleado = {   
    iEmpleadoId : '*autogenerado',
    cEmpleadoApellidoP :'',    
    cEmpleadoApellidoM :'',
    cEmpleadoNombre : '',
    cEmpleadoDireccion:'',
    cEmpleadoTelefonos:'',
    cEmpleadoEmail:'',
    iCargId : 1,
    cEmpleadoDni : '',

  
    
  };
 
  //this.FormaAdqList.text="1777777";
}*/




}


