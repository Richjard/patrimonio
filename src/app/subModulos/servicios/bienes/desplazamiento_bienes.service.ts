import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {DesplazamientoBienInterface} from '../../interfaces/bienes/desplazamiento-bienes-nterface';
import {AsignacionBienesInterface} from '../../interfaces/bienes/asignacion-bienes-interface';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DesplazamientoBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:HttpHeaders
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {

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
   crear(DesplazamientoBien:DesplazamientoBienInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento`,DesplazamientoBien,{headers:this.httpOptions})
      .pipe(map(data => data));
   }
   modificar(DesplazamientoBien:DesplazamientoBienInterface){
     console.log("crud MODIFICSR:::");
        const idR=DesplazamientoBien.iDespBienId;
        this.insertHead()
        return this.http.put<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento/${idR}`,DesplazamientoBien,{headers:this.httpOptions})
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento/${id}`,{headers:this.httpOptions})
      .pipe(map(data => data));
   }

   getCombo(): Observable<DesplazamientoBienInterface[]>{
    this.insertHead()
    return this.http.post<DesplazamientoBienInterface[]>(`${environment.apiUrl}/pat/desplazamiento/combo`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }

   getDataBienesPorOC(iDocAdqId): Observable<AsignacionBienesInterface[]>{
    this.insertHead()
    return this.http.post<AsignacionBienesInterface[]>(`${environment.apiUrl}/pat/desplazamiento/dataAsignacionBienes/${iDocAdqId}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }
   getDataPrint(iDocAdqId): Observable<AsignacionBienesInterface[]>{
    this.insertHead()
    return this.http.get<AsignacionBienesInterface[]>(`${environment.apiUrl}/pat/desplazamiento/getResultRow/${iDocAdqId}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }



  insertHead(){
    
    
  }

  

}

