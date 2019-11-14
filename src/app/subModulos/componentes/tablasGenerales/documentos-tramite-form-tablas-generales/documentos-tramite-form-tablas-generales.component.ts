import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { FormasAdquisicionService } from 'src/app/subModulos/servicios/tablas_generales/formas_adquisicion.service';
import {ActivatedRoute,Params} from '@angular/router'
import { DocumentoTramiteInterface } from 'src/app/subModulos/interfaces/tablasGenerales/documentoTramite-tablasGenerales-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-documentos-tramite-form-tablas-generales',
  templateUrl: './documentos-tramite-form-tablas-generales.component.html',
  styleUrls: ['./documentos-tramite-form-tablas-generales.component.scss']
})
export class DocumentosTramiteFormTablasGeneralesComponent implements OnInit {



  @Input("datosDocumentoTramite") DocumentoTramite:DocumentoTramiteInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<DocumentoTramiteInterface> = new EventEmitter<DocumentoTramiteInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('DocumentoTramiteForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 



   
  constructor(private fb: FormBuilder,private route:ActivatedRoute) { 
  
  }

  ngOnInit() {    
     

  }
@ViewChild('formElement',{static: true}) element: any;





}
