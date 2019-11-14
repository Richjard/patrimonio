import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {ClaseGenInterface} from '../../interfaces/catalogoSBN/ClaseGen-catalogoSBN-interface';
import { environment } from '../../../../environments/environment';
import { LocalesInterface } from '../../interfaces/ubicacion/local-list-ubicacion-Interface';


@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(ClaseGen:ClaseGenInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<ClaseGenInterface>(`${environment.apiUrl}/pat/clases`,ClaseGen,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(ClaseGen:ClaseGenInterface){
     console.log("crud MODIFICSR:::");
        const idR=ClaseGen.iClaseGenId;
        this.insertHead()
        return this.http.put<ClaseGenInterface>(`${environment.apiUrl}/pat/clases/${idR}`,ClaseGen,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<ClaseGenInterface>(`${environment.apiUrl}/pat/clases/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<ClaseGenInterface[]>{
    this.insertHead()
    return this.http.post<ClaseGenInterface[]>(`${environment.apiUrl}/pat/clases/combo`,this.httpOptions)
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
