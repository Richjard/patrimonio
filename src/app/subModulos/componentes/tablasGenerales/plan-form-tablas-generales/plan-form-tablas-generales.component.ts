import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { LocalesService } from 'src/app/subModulos/servicios/locales.service';
import {ActivatedRoute,Params} from '@angular/router'
import { PlanInterface } from 'src/app/subModulos/interfaces/tablasGenerales/plan-tablasGenerales-interface';


import { faPlus, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-plan-form-tablas-generales',
  templateUrl: './plan-form-tablas-generales.component.html',
  styleUrls: ['./plan-form-tablas-generales.component.scss']
})
export class PlanFormTablasGeneralesComponent implements OnInit {
  @Input("datosPlan") Plan:PlanInterface;
  @Input() op: string;//opcion de crud
  faSave = faSave;//icono guardar
  @Output() devuelve_hijo:EventEmitter<PlanInterface> = new EventEmitter<PlanInterface>()

  //@Output() devuelve_hijo = new EventEmitter<LocalInterface>()
  @Output() cerrar_modal = new EventEmitter<string>()
  @ViewChild('PlanForm',{static: true}) form: any;//fromulario
  //constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 
    constructor(private dataApi:LocalesService,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {
    
    //console.log("opcion enviada ="+this.op);

  }
@ViewChild('formElement',{static: true}) element: any;

public GuardarPlan(): void {
  this.devuelve_hijo.emit(this.Plan);
  this.cerrar_modal.emit(this.op); 
  this.onFormSubmit();
}
public onFormSubmit(): void {
  this.form.reset();
  this.Plan = {
    iPlanConMayorId : 'autogenerado',
    cPlanConMayorCodigo :'',
    cPlanConMayorDescripcion :'',
    bPlanConMayorEstado:'',
    cPlanConMayorTipo:'',
  };
}


}
