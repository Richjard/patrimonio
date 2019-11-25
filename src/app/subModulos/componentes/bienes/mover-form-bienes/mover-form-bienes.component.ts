import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { SituacionBiensService } from 'src/app/subModulos/servicios/tablas_generales/situacion_bien.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { SituacionesBienesInterface } from 'src/app/subModulos/interfaces/bienes/situaciones-bienes-interface'
import { OcInterface } from 'src/app/subModulos/interfaces/tablasGenerales/oc-tablasGenerales-interface'


@Component({
  selector: 'app-mover-form-bienes',
  templateUrl: './mover-form-bienes.component.html',
  styleUrls: ['./mover-form-bienes.component.scss']
})

export class MoverFormBienesComponent implements OnInit {

  private textSelectDocumentoTramite:string;
  private idSelectDocumentoTramite="null";
  private textSelectOC:string;
  private ocSelect:OcInterface;

public dataSituacion;
public SituacionFields: Object = { text:'cSituacionBienDescripcion',value: 'iSituacionBienId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public SituacionMark: string = 'Seleccione una situacion';

public value: string = '3';
@ViewChild('situacionList',{static: false})
// country DropDownList instance
public situacionList: DropDownListComponent;

  @Input("datosBienSituaciones") BienSituaciones:SituacionesBienesInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<SituacionesBienesInterface> = new EventEmitter<SituacionesBienesInterface>()

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
  constructor(private fb: FormBuilder,private dataApi:SituacionBiensService,private route:ActivatedRoute) { 
      
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    
    console.log("fecha  ="+this.date);

    this.dataApi.getCombo().subscribe((respon)=>{ this.dataSituacion=respon; 
      this.situacionObj.value = '1';
    });

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarBienSituaciones(): void {
  this.devuelve_hijo.emit(this.BienSituaciones);
  this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
  //this.onFormSubmit();
   
}




}


