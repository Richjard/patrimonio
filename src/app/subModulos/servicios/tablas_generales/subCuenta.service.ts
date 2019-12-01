
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {SubCuentaInterface} from '../../interfaces/tablasGenerales/subCuenta-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';
import {retryWithBackoff} from '../../servicios/retri'
import { IsLoadingService } from '@service-work/is-loading';
@Injectable({
  providedIn: 'root'
})
export class SubCuentaService {
  isLoading: Observable<boolean>;
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,private isLoadingService: IsLoadingService,) {
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
  /*crear(Plan:PlanInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<PlanInterface>(`${environment.apiUrl}/pat/planes`,Plan,{headers:this.headers})
      .pipe(map(data => data));
   }
   modificar(Plan:PlanInterface){
     console.log("crud MODIFICSR:::");
        const idR=Plan.iPlanConMayorId;
        this.insertHead()
        return this.http.put<PlanInterface>(`${environment.apiUrl}/pat/planes/${idR}`,Plan,{headers:this.headers})
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<PlanInterface>(`${environment.apiUrl}/pat/planes/${id}`,{headers:this.headers})
      .pipe(map(data => data));
   }*/

   getCombo(): Observable<SubCuentaInterface[]>{
    return this.isLoadingService.add(this.http.get<SubCuentaInterface[]>(`${environment.apiUrl}/pat/subcuenta/combo`,{headers:this.headers})
    .pipe(retryWithBackoff(100),map(data => data)));
   }



  

}
