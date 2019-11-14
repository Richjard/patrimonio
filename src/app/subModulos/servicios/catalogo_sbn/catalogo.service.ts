import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {CatalogoSBNInterface} from './../../interfaces/catalogoSBN/catalogo-sbn-nterface';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(catalogo:CatalogoSBNInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<CatalogoSBNInterface>(`${environment.apiUrl}/pat/catalogoSBN`,catalogo,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(catalogo:CatalogoSBNInterface){
     console.log("crud MODIFICSR:::");
        const idR=catalogo.iCatSbnId;
        this.insertHead()
        return this.http.put<CatalogoSBNInterface>(`${environment.apiUrl}/pat/catalogoSBN/${idR}`,catalogo,this.httpOptions)
        .pipe(map(data => data));
    }
   delete(id:string){
      this.insertHead()
      return this.http.delete<CatalogoSBNInterface>(`${environment.apiUrl}/pat/catalogoSBN/${id}`,this.httpOptions)
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

