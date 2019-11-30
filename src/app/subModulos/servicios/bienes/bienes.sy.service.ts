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

//@Injectable()
@Injectable({
    providedIn: 'root'
  })
export class BienSyService extends Subject<DataStateChangeEventArgs> { 
    parametros_consulta:any=[];
    orderBy:any=[];
    ls = window.localStorage;
    httpOptions:any
    headers:any
    token:any
    anio:string
    constructor(private http: HttpClient,private store: LocalService,private local:LocalService,) {
        super();
    }

    public execute(state: any,iSituacionBienId:number): void {
        this.getData(state,iSituacionBienId).subscribe(x => super.next(x));
    }

    protected getData(state: DataStateChangeEventArgs,iSituacionBienId:number): Observable<DataStateChangeEventArgs> {
     // this.anio=this.local.getItem('iYearId');
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';

        if ((state.sorted || []).length) {          
            state.sorted.map((obj: Sorts) => {
              obj.direction === 'descending'? sortQuery=obj.name+' desc': sortQuery=obj.name;            
            }).reverse().join(',');             
        }      
        this.parametros_consulta = {
          skip: state.skip+1,
          top: state.skip+30,
          filter:state.where,
          order:sortQuery,
          iSituacionBienId:iSituacionBienId,
          baja:0,
          anio:this.anio
        
        };

       
        this.insertHead();  
        return this.http 
           .post(`${environment.apiUrl}/pat/bienes/result`,this.parametros_consulta,this.httpOptions) 
           .pipe( retryWithBackoff(100),map((response: any) => response))
           .pipe(map((response: any) => (<DataResult>{
                result: response['results'],
                count: parseInt(response['count'], 10)
        })))
        .pipe((data: any) => data);
    }

    insertHead(){
        this.ls.getItem('unamToken');
        let data = this.store.getItem("unamToken");
        this.token = data['access_token']
        if(data['access_token']){
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + this.token
            },
            )
          }
        }
    }
}
