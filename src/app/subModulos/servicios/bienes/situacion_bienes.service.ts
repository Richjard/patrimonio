import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {SituacionesBienesInterface} from '../../interfaces/bienes/situaciones-bienes-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SituacionBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(BienSituacion:SituacionesBienesInterface){
      this.insertHead()
      return this.http.post<SituacionesBienesInterface>(`${environment.apiUrl}/pat/situacion`,BienSituacion,this.httpOptions)
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

