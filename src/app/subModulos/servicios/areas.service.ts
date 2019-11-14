import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from '../../servicios/local.services'
import { map } from 'rxjs/operators';
import {AreaInterface} from './../interfaces/ubicacion/area-ubicacion-interface';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AreasService {
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(area:AreaInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<AreaInterface>(`${environment.apiUrl}/pat/areas`,area,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(area:AreaInterface){
     console.log("crud MODIFICSR:::");
        const idR=area.iAreaId;
        this.insertHead()
        return this.http.put<AreaInterface>(`${environment.apiUrl}/pat/areas/${idR}`,area,this.httpOptions)
        .pipe(map(data => data));
    }
   delete(id:string){
      this.insertHead()
      return this.http.delete<AreaInterface>(`${environment.apiUrl}/pat/areas/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   
   getComboAreas(): Observable<AreaInterface[]>{
    this.insertHead()
    return this.http.post<AreaInterface[]>(`${environment.apiUrl}/pat/areas/combo`,this.httpOptions)
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

