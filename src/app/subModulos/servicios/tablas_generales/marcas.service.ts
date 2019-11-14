
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {MarcaInterface} from '../../interfaces/tablasGenerales/marca-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Marca:MarcaInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<MarcaInterface>(`${environment.apiUrl}/pat/marcas`,Marca,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Marca:MarcaInterface){
     console.log("crud MODIFICSR:::");
        const idR=Marca.iMarcaId;
        this.insertHead()
        return this.http.put<MarcaInterface>(`${environment.apiUrl}/pat/marcas/${idR}`,Marca,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<MarcaInterface>(`${environment.apiUrl}/pat/marcas/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<MarcaInterface[]>{
    this.insertHead()
    return this.http.post<MarcaInterface[]>(`${environment.apiUrl}/pat/grupos_clases/combo`,this.httpOptions)
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
