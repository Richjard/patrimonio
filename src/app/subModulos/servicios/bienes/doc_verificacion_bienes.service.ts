import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {DocVerificacionBienesInterface} from '../../interfaces/bienes/docVerificacion-bienes-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocVerificacionBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(DocVerificacion:DocVerificacionBienesInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<DocVerificacionBienesInterface>(`${environment.apiUrl}/pat/doc_verificacion`,DocVerificacion,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(DocVerificacion:DocVerificacionBienesInterface){
     console.log("crud MODIFICSR:::");
        const idR=DocVerificacion.iYearId;
        this.insertHead()
        return this.http.put<DocVerificacionBienesInterface>(`${environment.apiUrl}/pat/doc_verificacion/${idR}`,DocVerificacion,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:number){
      this.insertHead()
      return this.http.delete<DocVerificacionBienesInterface>(`${environment.apiUrl}/pat/doc_verificacion/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<DocVerificacionBienesInterface[]>{
    this.insertHead()
    return this.http.post<DocVerificacionBienesInterface[]>(`${environment.apiUrl}/pat/doc_verificacion/combo`,this.httpOptions)
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

