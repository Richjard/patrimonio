import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {GrupoGenInterface} from '../../interfaces/catalogoSBN/grupoGen-catalogoSBN-interface';
import { environment } from '../../../../environments/environment';
import { LocalesInterface } from '../../interfaces/ubicacion/local-list-ubicacion-Interface';


@Injectable({
  providedIn: 'root'
})
export class GruposService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(grupoGen:GrupoGenInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<GrupoGenInterface>(`${environment.apiUrl}/pat/grupos`,grupoGen,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(grupoGen:GrupoGenInterface){
     console.log("crud MODIFICSR:::");
        const idR=grupoGen.iGrupoGenId;
        this.insertHead()
        return this.http.put<GrupoGenInterface>(`${environment.apiUrl}/pat/grupos/${idR}`,grupoGen,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<GrupoGenInterface>(`${environment.apiUrl}/pat/grupos/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<GrupoGenInterface[]>{
    this.insertHead()
    return this.http.post<GrupoGenInterface[]>(`${environment.apiUrl}/pat/grupos/combo`,this.httpOptions)
    .pipe(map(data => data));
   }

   /*getComboLocales(): Observable<GrupoGenInterface[]>{
    this.insertHead()
    return this.http.post<GrupoGenInterface[]>(`${environment.apiUrl}/pat/grupos/combo`,this.httpOptions)
    .pipe(map(data => data));
 }*/



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
