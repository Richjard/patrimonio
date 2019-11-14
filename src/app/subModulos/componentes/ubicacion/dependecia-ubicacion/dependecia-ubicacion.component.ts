
import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { DependenciaService } from 'src/app/subModulos/servicios/tablas_generales/dependencia.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoInterface } from 'src/app/subModulos/interfaces/tablasGenerales/Documento-tablasGenerales-interface';

import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


import { DependinciaFiltroInterface } from 'src/app/subModulos/interfaces/ubicacion/dependencia_filtro-ubicacion-interface'


import { CentroCostoService } from 'src/app/subModulos/servicios/tablas_generales/centro_costo.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-dependecia-ubicacion',
  templateUrl: './dependecia-ubicacion.component.html',
  styleUrls: ['./dependecia-ubicacion.component.scss']
})
export class DependeciaUbicacionComponent implements OnInit {

public DependenciaFiltro:DependinciaFiltroInterface;
public dataDependencia;
public DependenciaFields: Object = { text:'cDepenNombre',value: 'iDepenId' };
// set the height of the popup element
public height: string = '200px';
// set the placeholder to DropDownList input element
public DependenciaMark: string = 'Seleccione una dependencia';



public dataCentroCosto;
public CentroCostoFields: Object = { text:'cCentroCostoNombre',value: 'iCentroCostoId' };
// set the height of the popup element




faCheckCircle=faCheckCircle;
  faSave = faSave;//icono guardar
  faFilter = faFilter;//icono filter
  faList=faList;
  @Output() devuelve_hijo:EventEmitter<DependinciaFiltroInterface> = new EventEmitter<DependinciaFiltroInterface>()


  @ViewChild('DependenciaFiltroForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 



    @ViewChild('DependenciaList',{static: true})
    // country DropDownList instance
    public DependenciaObj: DropDownListComponent;
    @ViewChild('CentroCostoList',{static: true})
    // state DropDownList instance
    public CentroCostoObj: DropDownListComponent;



    public filterPlaceholder: string = 'Search';
    // filtering event handler to filter a Country
    public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
        let query: Query = new Query();
        //frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('cDepenNombre', 'contains', e.text, true) : query;
        //pass the filter data source, filter query to updateData method.
        e.updateData(this.dataDependencia, query);
    }



    public onChange1(): void {
  
         
     this.CentroCostoObj.enabled = true;
     // query the data source based on country DropDownList selected value
     let tempQuery: Query = new Query().where('iDepenId', 'equal', this.DependenciaObj.value);
     this.CentroCostoObj.query = tempQuery;
     this.CentroCostoObj.text = null;
     this.CentroCostoObj.dataBind();


      
      
    }





    skillForm: FormGroup;
    public date: Object = new Date();
  public format: string = 'dd-MM-yy';
  constructor(private fb: FormBuilder,private dataApi:DependenciaService,private route:ActivatedRoute, private dataApiCentroCosto:CentroCostoService) { 
   // this.createForm();
  }
 /* createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}*/
  ngOnInit() {
    this.DependenciaFiltro = {
      iDepenId: '',
      iCentroCostoId: ''
    };
    this.dataApi.getCombo().subscribe((respon)=>{ this.dataDependencia=respon; });  
    this.dataApiCentroCosto.getCombo().subscribe((respon)=>{ this.dataCentroCosto=respon; }); 

  }
@ViewChild('formElement',{static: true}) element: any;

public OkDependenciaFiltro(): void {
  this.devuelve_hijo.emit(this.DependenciaFiltro);
 // this.cerrar_modal.emit(this.op); 
 // this.Dialog.hide(); 
 // this.onFormSubmit();*/
   
}




ngOnChanges(changes: SimpleChanges){
  

   
 
}
public onFormSubmit(): void {
 
 

}






}



