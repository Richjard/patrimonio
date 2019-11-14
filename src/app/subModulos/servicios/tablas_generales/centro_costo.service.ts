
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {CentroCostoInterface} from '../../interfaces/tablasGenerales/centro_costo-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(CentroCosto:CentroCostoInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<CentroCostoInterface>(`${environment.apiUrl}/pat/centro_costo_pat`,CentroCosto,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(CentroCosto:CentroCostoInterface){
     console.log("crud MODIFICSR:::");
        const idR=CentroCosto.iCentroCostoId;
        this.insertHead()
        return this.http.put<CentroCostoInterface>(`${environment.apiUrl}/pat/centro_costo_pat/${idR}`,CentroCosto,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<CentroCostoInterface>(`${environment.apiUrl}/pat/centro_costo_pat/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<CentroCostoInterface[]>{
    this.insertHead()
    return this.http.post<CentroCostoInterface[]>(`${environment.apiUrl}/pat/centro_costo_pat/combo`,this.httpOptions)
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
