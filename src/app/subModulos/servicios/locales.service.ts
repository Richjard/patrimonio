import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../servicios/local.services'
import { map } from 'rxjs/operators';
import {LocalInterface} from './../interfaces/ubicacion/local-ubicacion-interface';
import { environment } from './../../../environments/environment';
import { LocalesInterface } from '../interfaces/ubicacion/local-list-ubicacion-Interface';

//interfaces

//import {LocalInterface} from '../interfaces/ubicacion'

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
 
  private baseUrl = 'http://192.168.1.145/backsigeun-master/public/api';//login server
  local:any[]=[
    {
      id:'01',
      descripcion:'mmmm'
    },
    {
      id:'02',
      descripcion:'fsfdsf'
    }
  ]


  

  constructor(private http:HttpClient,private store: LocalService,) {


    console.log("funcionando servicio XXDDX");
   }

   getLocales(){
     return this.local;
   }
   getAllLocales(mod){

    this.insertHead()
      return this.http.get(`${environment.apiUrl}/pat/locales`,this.httpOptions)
   }


   crearLocal(local:LocalInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<LocalInterface>(`${environment.apiUrl}/pat/locales`,local,this.httpOptions)
      .pipe(map(data => data));
   }
   modificarLocal(local:LocalInterface){
     console.log("crud MODIFICSR:::");
        const localID=local.iLocalId;
        this.insertHead()
        return this.http.put<LocalInterface>(`${environment.apiUrl}/pat/locales/${localID}`,local,this.httpOptions)
        .pipe(map(data => data));
    }
   deleteLocal(id:string){
      this.insertHead()
      return this.http.delete<LocalInterface>(`${environment.apiUrl}/pat/locales/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getComboLocales(): Observable<LocalesInterface[]>{
    this.insertHead()
    return this.http.post<LocalesInterface[]>(`${environment.apiUrl}/pat/locales/combo`,this.httpOptions)
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
