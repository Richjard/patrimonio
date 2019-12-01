import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { UbicaionPlanContable } from 'src/app/subModulos/interfaces/reportes/ubicacion-PlanContable';
import { UbicaionSubCuenta } from 'src/app/subModulos/interfaces/reportes/ubicacion-PlanContable';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';

import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-por-plan-contable',
  templateUrl: './por-plan-contable.component.html',
  styleUrls: ['./por-plan-contable.component.scss']
})
export class PorPlanContableComponent implements OnInit {
  public faCheckCircle=faCheckCircle;
  public PlanContableFiltro : UbicaionPlanContable;
  public CuentaMayorMark: string = 'Seleccione una Cuenta Mayor';
  public SubCuentaMark: string = 'Seleccione una Sub Cuenta';
  
  public dataPlanContable;
  public PlanContableFilds: Object = { text:'cPlanConMayorDescripcion',value: 'iPlanConMayorId' };
  public dataSubCuenta;
  public SubCuentaFields: Object = { text:'cPlanConSubCueSubDescripcion',value: 'iPlanConSubCueId'};

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('cPlanConMayorDescripcion', 'contains', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dataPlanContable, query);
}


  constructor(private ApiPlanContable: ApiReporteService, private ApiSubCuenta:ApiReporteService ) { console.log("looooool");}

  @ViewChild('PlanContableList',{static: true})
  // country DropDownList instance
  public PlanContableObj: DropDownListComponent;
  @ViewChild('SubCuentaList',{static: true})
    // state DropDownList instance
    public SubCuentaObj: DropDownListComponent;

    public Ok: EmitType<object> = () => {   
      console.log("--"+this.PlanContableObj.text);//si
      console.log("-.-"+this.PlanContableFiltro.cPlanConMayorCodigo);
      console.log("-.-."+this.PlanContableFiltro.iPlanConMayorId);//si
      console.log("-"+this.PlanContableFiltro.cPlanConMayorDescripcion);
      console.log(this.SubCuentaObj.value);
      console.log(this.SubCuentaObj.text);
     
      }; 
      
    

    public onChange1(): void {         
      this.SubCuentaObj.enabled = true;
      // query the data source based on country DropDownList selected value
      let tempQuery: Query = new Query().where('iPlanConMayorId', 'equal', this.PlanContableObj.value);
      this.SubCuentaObj.query = tempQuery;
      this.SubCuentaObj.text = null;
      this.SubCuentaObj.dataBind();
   }

   @Output() devuelve_hijo:EventEmitter<UbicaionSubCuenta> = new EventEmitter<UbicaionSubCuenta>()
   ///
  @ViewChild('PlanContableFiltroForm',{static: true}) form: any;//fromulario

  ngOnInit() {
    this.PlanContableFiltro={
      iPlanConMayorId : '',
      cPlanConMayorCodigo : '',
      cPlanConMayorDescripcion  : ''
    };
    this.ApiPlanContable.getComboCuentaMayor().subscribe((respon)=>{ this.dataPlanContable=respon;
      console.log (this.dataPlanContable);
  });
  }
  public OkDependenciaFiltro(): void {
    //this.ubicacionEmpelado.empleadoNombre=this.EmpleadoaObj.text;
    this.ApiSubCuenta.getComboSubCuenta(this.PlanContableFiltro.iPlanConMayorId).subscribe((respon)=>{ 
      
    console.log(this.PlanContableFiltro.iPlanConMayorId);
    this.dataSubCuenta=respon;
    console.log(this.dataSubCuenta);
    
    }); 
    
    
     
  }



}
