import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {BienInterface} from '../../interfaces/bienes/catalogo-bienes-nterface';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Bien:BienInterface){
      this.insertHead()      
      return this.http.post<BienInterface>(`${environment.apiUrl}/pat/bienes`,Bien,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Bien:BienInterface){
        const idR=Bien.iBienId;
        this.insertHead()
        return this.http.put<BienInterface>(`${environment.apiUrl}/pat/bienes/${idR}`,Bien,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<BienInterface>(`${environment.apiUrl}/pat/bienes/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<BienInterface[]>{
    this.insertHead()
    return this.http.post<BienInterface[]>(`${environment.apiUrl}/pat/bienes/combo`,this.httpOptions)
    .pipe(map(data => data));
   }

   baja(Bien:BienInterface){  
       const idR=Bien.iBienId;
       this.insertHead()
       return this.http.put<BienInterface>(`${environment.apiUrl}/pat/bienes/baja/${idR}`,Bien,this.httpOptions)
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

