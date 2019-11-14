
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {DocumentoInterface} from '../../interfaces/tablasGenerales/documento-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Doc:DocumentoInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<DocumentoInterface>(`${environment.apiUrl}/pat/documentos`,Doc,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Doc:DocumentoInterface){
     console.log("crud MODIFICSR:::");
        const idR=Doc.iDocAdqId;
        this.insertHead()
        return this.http.put<DocumentoInterface>(`${environment.apiUrl}/pat/documentos/${idR}`,Doc,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<DocumentoInterface>(`${environment.apiUrl}/pat/documentos/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<DocumentoInterface[]>{
    this.insertHead()
    return this.http.post<DocumentoInterface[]>(`${environment.apiUrl}/pat/documentos/combo`,this.httpOptions)
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
