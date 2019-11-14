
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {PlanInterface} from '../../interfaces/tablasGenerales/plan-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Plan:PlanInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<PlanInterface>(`${environment.apiUrl}/pat/planes`,Plan,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Plan:PlanInterface){
     console.log("crud MODIFICSR:::");
        const idR=Plan.iPlanContId;
        this.insertHead()
        return this.http.put<PlanInterface>(`${environment.apiUrl}/pat/planes/${idR}`,Plan,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<PlanInterface>(`${environment.apiUrl}/pat/planes/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<PlanInterface[]>{
    this.insertHead()
    return this.http.post<PlanInterface[]>(`${environment.apiUrl}/pat/planes/combo`,this.httpOptions)
    .pipe(map(data => data));
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
