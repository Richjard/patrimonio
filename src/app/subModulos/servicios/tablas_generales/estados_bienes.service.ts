
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {EstadoBienInterface} from '../../interfaces/tablasGenerales/estado_bien-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';
import {retryWithBackoff} from '../../servicios/retri'
@Injectable({
  providedIn: 'root'
})
export class EstadosBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   /*crear(FormaAdq:FormaAdquisicionInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<FormaAdquisicionInterface>(`${environment.apiUrl}/pat/formas_adquisicion`,FormaAdq,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(FormaAdq:FormaAdquisicionInterface){
     console.log("crud MODIFICSR:::");
        const idR=FormaAdq.iFormaAdqId;
        this.insertHead()
        return this.http.put<FormaAdquisicionInterface>(`${environment.apiUrl}/pat/formas_adquisicion/${idR}`,FormaAdq,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<FormaAdquisicionInterface>(`${environment.apiUrl}/pat/formas_adquisicion/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }*/
   
   getCombo(): Observable<EstadoBienInterface[]>{
    this.insertHead()
    return this.http.post<EstadoBienInterface[]>(`${environment.apiUrl}/pat/estados_bien/combo`,this.httpOptions)
    .pipe(
      retryWithBackoff(100),
      map(data => data));
   }

   
   getCombo2(): Observable<EstadoBienInterface[]>{
    this.insertHead()
    return this.http.put<EstadoBienInterface[]>(`${environment.apiUrl}/pat/estados_bien/combo2`,this.httpOptions)
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
