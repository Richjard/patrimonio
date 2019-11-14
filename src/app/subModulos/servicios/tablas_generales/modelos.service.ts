import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {ModeloInterface} from './../../interfaces/tablasGenerales/modelo-tablasGenerales-interface';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Modelo:ModeloInterface){
      this.insertHead()
      return this.http.post<ModeloInterface>(`${environment.apiUrl}/pat/modelos`,Modelo,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Modelo:ModeloInterface){
        const idR=Modelo.iModeloId;
        this.insertHead()
        return this.http.put<ModeloInterface>(`${environment.apiUrl}/pat/modelos/${idR}`,Modelo,this.httpOptions)
        .pipe(map(data => data));
    }
   delete(id:string){
      this.insertHead()
      return this.http.delete<ModeloInterface>(`${environment.apiUrl}/pat/modelos/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   
   getComboAreas(): Observable<ModeloInterface[]>{
    this.insertHead()
    return this.http.post<ModeloInterface[]>(`${environment.apiUrl}/pat/modelos/combo`,this.httpOptions)
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

