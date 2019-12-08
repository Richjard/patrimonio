
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import { DataStateChangeEventArgs, Sorts, DataResult } from '@syncfusion/ej2-angular-grids'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


import { LocalService } from '../../../servicios/local.services'
import {retryWithBackoff} from '../../servicios/retri'
import { IsLoadingService } from '@service-work/is-loading';

import {CuentasInterface} from '../../interfaces/tablasGenerales/cuentas-tablasGenerales-interface';
//@Injectable()
@Injectable({
    providedIn: 'root'
  })
export class OcItemSyService extends Subject<DataStateChangeEventArgs> { 
  isLoading: Observable<boolean>;
    parametros_consulta:any=[];
    orderBy:any=[];
    ls = window.localStorage;
    httpOptions:any
    headers:any
    token:any
    constructor(private http: HttpClient,private store: LocalService,private isLoadingService: IsLoadingService) {
        super();

        this.ls.getItem('unamToken');
        let data = this.store.getItem("unamToken");
        this.token = data['access_token']
        if(data['access_token']){
          this.headers = new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + this.token
            },
            )
          
        }
    }

    public execute(state: any,nrooc:any): void {
      this.isLoading = this.isLoadingService.isLoading$();
      this.isLoadingService.add(  this.getData(state,nrooc).subscribe(x => super.next(x)));
    }

    protected getData(state: DataStateChangeEventArgs,nrooc): Observable<DataStateChangeEventArgs> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';

        if ((state.sorted || []).length) {          
            state.sorted.map((obj: Sorts) => {
              obj.direction === 'descending'? sortQuery=obj.name+' desc': sortQuery=obj.name;            
            }).reverse().join(',');             
        }      
        this.parametros_consulta = {
          skip: state.skip+1,
          top: state.skip+15,
          filter:state.where,
          order:sortQuery,
          nrooc:nrooc
        };

        return this.http 
           .post(`${environment.apiUrl}/pat/oc_item/result`,this.parametros_consulta,{headers:this.headers}) 
           .pipe(retryWithBackoff(100),map((response: any) => response))
           .pipe(retryWithBackoff(100),map((response: any) => (<DataResult>{
                result: response['results'],
                count: parseInt(response['count'], 10)
        })))
        .pipe(retryWithBackoff(100),(data: any) => data);
    }


    getCombo(anio,clasificador,GRUPO_BIEN,CLASE_BIEN,FAMILIA_BIEN): Observable<CuentasInterface[]>{
     
      return  this.isLoadingService.add(this.http.get<CuentasInterface[]>(`${environment.apiUrl}/pat/oc_item/comboCuentas/${anio}/${clasificador}/${GRUPO_BIEN}/${CLASE_BIEN},/${FAMILIA_BIEN}`,{headers:this.headers})
      .pipe(retryWithBackoff(100),map(data => data)));
     }
  

}
