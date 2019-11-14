


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {TipoInterface} from './../../interfaces/tablasGenerales/tipo-tablasGenerales-interface';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TiposService {
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Tipo:TipoInterface){
      this.insertHead()
      return this.http.post<TipoInterface>(`${environment.apiUrl}/pat/tipos`,Tipo,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Tipo:TipoInterface){
        const idR=Tipo.iTipoId;
        this.insertHead()
        return this.http.put<TipoInterface>(`${environment.apiUrl}/pat/tipos/${idR}`,Tipo,this.httpOptions)
        .pipe(map(data => data));
    }
   delete(id:string){
      this.insertHead()
      return this.http.delete<TipoInterface>(`${environment.apiUrl}/pat/tipos/${id}`,this.httpOptions)
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

