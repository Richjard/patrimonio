import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {GrupoClaseGenInterface} from '../../interfaces/catalogoSBN/grupoclaseGen-catalogoSBN-interface';
import { environment } from '../../../../environments/environment';
import { LocalesInterface } from '../../interfaces/ubicacion/local-list-ubicacion-Interface';


@Injectable({
  providedIn: 'root'
})
export class GruposClasesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(GrupoClaseGen:GrupoClaseGenInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<GrupoClaseGenInterface>(`${environment.apiUrl}/pat/grupos_clases`,GrupoClaseGen,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(GrupoClaseGen:GrupoClaseGenInterface){
     console.log("crud MODIFICSR:::");
        const idR=GrupoClaseGen.iGrupoClaseGenId;
        this.insertHead()
        return this.http.put<GrupoClaseGenInterface>(`${environment.apiUrl}/pat/grupos_clases/${idR}`,GrupoClaseGen,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<GrupoClaseGenInterface>(`${environment.apiUrl}/pat/grupos_clases/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<GrupoClaseGenInterface[]>{
    this.insertHead()
    return this.http.post<GrupoClaseGenInterface[]>(`${environment.apiUrl}/pat/grupos_clases/combo`,this.httpOptions)
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
