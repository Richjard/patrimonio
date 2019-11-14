import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import { DataStateChangeEventArgs, Sorts, DataResult } from '@syncfusion/ej2-angular-grids'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';


import { LocalService } from '../../servicios/local.services'

//@Injectable()
@Injectable({
    providedIn: 'root'
  })
export class LocalesSyService extends Subject<DataStateChangeEventArgs> {

  
    //private baseUrl = 'http://192.168.1.145/backsigeun-master/public/api';//login server
   
    parametros_consulta:any=[];
    orderBy:any=[];
    ls = window.localStorage;
    httpOptions:any
    headers:any
    token:any

    private BASE_URL = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders'; 

    constructor(private http: HttpClient,private store: LocalService,) {
        super();
    }

    public execute(state: any): void {
        this.getData(state).subscribe(x => super.next(x));
    }

    protected getData(state: DataStateChangeEventArgs): Observable<DataStateChangeEventArgs> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';

        if ((state.sorted || []).length) {

           /* sortQuery = `&$orderby=` + state.sorted.map((obj: Sorts) => {
                return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
            }).reverse().join(',');*/

            state.sorted.map((obj: Sorts) => {
              obj.direction === 'descending'? sortQuery=obj.name+' desc': sortQuery=obj.name;
             /* if(obj.direction === 'descending'){
                this.orderBy={
                  field:obj.name,
                  order:"desc"
                }
              }else{
                this.orderBy={
                  field:obj.name,
                  order:"asc"
                }

              }*/
            }).reverse().join(',');

             
        }
        
       

            this.parametros_consulta = {
              skip: state.skip+1,
              top: state.skip+15,
              filter:state.where,
              order:sortQuery
            };
        
          
        

        console.log("que hay aca :"+JSON.stringify(state.where));
        this.insertHead();
        /*return this.http 
           .get(`${this.BASE_URL}?${pageQuery}${sortQuery}&$inlinecount=allpages&$format=json`) 
           .pipe(map((response: any) => response))
           .pipe(map((response: any) => (<DataResult>{
                result: response['d']['results'],
                count: parseInt(response['d']['__count'], 10)
        })))
        .pipe((data: any) => data);*/


        //carl net
        return this.http 
        //  .get(`${environment.apiUrl}/pat/locales?${pageQuery}${sortQuery}&$inlinecount=allpages&$format=json`,this.httpOptions) 
           .post(`${environment.apiUrl}/pat/locales/result`,this.parametros_consulta,this.httpOptions) 
           .pipe(map((response: any) => response))
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
