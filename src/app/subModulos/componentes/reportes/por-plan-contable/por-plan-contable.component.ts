import { Component, OnInit,ViewChild,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { rippleEffect,EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { BienReportInterface } from 'src/app/subModulos/interfaces/reportes/BienReport-interface';
import { ApiReporteService } from 'src/app/subModulos/servicios/reportes/ApiReportes';
import { UbicaionPlanContable } from 'src/app/subModulos/interfaces/reportes/ubicacion-PlanContable';
import { UbicaionSubCuenta } from 'src/app/subModulos/interfaces/reportes/ubicacion-PlanContable';
import { DocumentoReportService } from 'src/app/subModulos/servicios/reportes/DocumentoReport';
import { IsLoadingService } from '@service-work/is-loading';

import { faPlus, faEdit, faTrashAlt,faSave ,faFilter,faList,faCheckCircle} from '@fortawesome/free-solid-svg-icons';


import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-por-plan-contable',
  templateUrl: './por-plan-contable.component.html',
  styleUrls: ['./por-plan-contable.component.scss']
})
export class PorPlanContableComponent implements OnInit {
  isLoading: Observable<boolean>;

  public faCheckCircle=faCheckCircle;
  public PlanContableFiltro : UbicaionPlanContable;
  public CuentaMayorMark: string = 'Seleccione una Cuenta Mayor';
  public SubCuentaMark: string = 'Seleccione una Sub Cuenta';
  
  public dataPlanContable;
  public PlanContableFilds: Object = { text:'cuenta',value: 'iPlanConMayorId' };
  public dataSubCuenta;
  public SubCuentaFields: Object = { text:'subcuenta',value: 'iPlanConSubCueId'};
  public dataBienes;

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('cuenta', 'contains', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dataPlanContable, query);
}


  constructor( private isLoadingService: IsLoadingService,private ApiPlanContable: ApiReporteService, private ApiSubCuenta:ApiReporteService, private ApiBienes:ApiReporteService, private DocGenReport:DocumentoReportService ) { console.log("looooool");}

  @ViewChild('PlanContableList',{static: true})
  // country DropDownList instance
  public PlanContableObj: DropDownListComponent;
  @ViewChild('SubCuentaList',{static: true})
    // state DropDownList instance
    public SubCuentaObj: DropDownListComponent;

    public Ok: EmitType<object> = () => {   
      console.log("-mayor nombre-"+this.PlanContableObj.text);//si
      console.log("-mayor id-."+this.PlanContableFiltro.iPlanConMayorId);//si
      console.log("-sub nomre-."+this.SubCuentaObj.text);//si
      this.isLoadingService.add(this.ApiBienes.getBienCuentaContable(this.SubCuentaObj.value).subscribe((respon)=>{ this.dataBienes=respon;      //este recibe la data de los biens
        console.log (this.dataBienes);
        pdfMake.createPdf(this.DocGenReport.documento4(respon,this.PlanContableObj.text,this.SubCuentaObj.text)).open();

    }));
      //as
      

    

     
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
    this.isLoading = this.isLoadingService.isLoading$();

    this.PlanContableFiltro={
      iPlanConMayorId : '',
      cPlanConMayorCodigo : '',
      cuenta  : ''
    };
    this.isLoadingService.add(this.ApiPlanContable.getComboCuentaMayor().subscribe((respon)=>{ this.dataPlanContable=respon;
      //console.log (this.dataPlanContable);
  }));
  
  this.isLoadingService.add(this.ApiSubCuenta.getComboSubCuenta().subscribe((respon)=>{ 
      
    this.dataSubCuenta=respon;
   // console.log(this.dataSubCuenta);
    
    })); 
  }
  public OkDependenciaFiltro(): void {
    //this.ubicacionEmpelado.empleadoNombre=this.EmpleadoaObj.text;
    
    
    
     
  }



}
