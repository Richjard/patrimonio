import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesInterface } from 'src/app/subModulos/interfaces/ubicacion/local-list-ubicacion-Interface';
import { GruposService } from 'src/app/subModulos/servicios/catalogo_sbn/grupos.service';
import { ClasesService } from 'src/app/subModulos/servicios/catalogo_sbn/clases.service';
import {ActivatedRoute,Params} from '@angular/router'
import { GrupoClaseGenInterface } from 'src/app/subModulos/interfaces/catalogoSBN/grupoclaseGen-catalogoSBN-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-grupo-clase-genericos-form-catalogo-sbn',
  templateUrl: './grupo-clase-genericos-form-catalogo-sbn.component.html',
  styleUrls: ['./grupo-clase-genericos-form-catalogo-sbn.component.scss']
})
export class GrupoClaseGenericosFormCatalogoSBNComponent implements OnInit {



  public dataComboGrupos;
  public dataComboClases;
  
 
 
 public remoteFieldsGrupos: Object = { text:'cGrupoGenDescripcion',value: 'iGrupoGenId' };
 public remoteFieldsClases: Object = { text:'cClaseGenDescripcion',value: 'iClaseGenId' };
 // set the height of the popup element
 public height: string = '200px';
 // set the placeholder to DropDownList input element
 public remoteWaterMark: string = 'Seleccione un Grupo';
 public remoteWaterMarkAreas: string = 'Seleccione una Clase';

@ViewChild('grupoList',{static: true})
// country DropDownList instance
public localObj: DropDownListComponent;
@ViewChild('claseList',{static: true})
// state DropDownList instance
public areaObj: DropDownListComponent;



  @Input() id_Local_I: string;
  @Input() json_: string;
  @Input("datosClaseGen") GrupoClaseGen:GrupoClaseGenInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<GrupoClaseGenInterface> = new EventEmitter<GrupoClaseGenInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('ClaseGenForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
  constructor(private dataApiGrupo:GruposService,private dataApiClase:ClasesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    this.dataApiGrupo.getCombo().subscribe((respon)=>{ this.dataComboGrupos=respon; });  
    this.dataApiClase.getCombo().subscribe((respon)=>{ this.dataComboClases=respon; });  

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarClaseGen(): void {
  this.devuelve_hijo.emit(this.GrupoClaseGen);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
 // this.form.reset();
  /*this.GrupoClaseGen = {
    iGrupoClaseGenId : '*autogenerado',
    iGrupoGenId:"",
    cGrupoClaseGenDescripcion:"",
    iClaseGenId :"",
    cClaseGrupoDescripcion:""   
  };*/
}


}
