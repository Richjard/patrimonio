import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from '../../servicios/local.services'
import { map } from 'rxjs/operators';
import {OficinaInterface} from './../interfaces/ubicacion/oficina-ubicacion-interface';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OficinasService {
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(area:OficinaInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<OficinaInterface>(`${environment.apiUrl}/pat/oficinas`,area,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(area:OficinaInterface){
     console.log("crud MODIFICSR:::");
        const idR=area.iOficinaId;
        this.insertHead()
        return this.http.put<OficinaInterface>(`${environment.apiUrl}/pat/oficinas/${idR}`,area,this.httpOptions)
        .pipe(map(data => data));
    }
   delete(id:string){
      this.insertHead()
      return this.http.delete<OficinaInterface>(`${environment.apiUrl}/pat/oficinas/${id}`,this.httpOptions)
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

