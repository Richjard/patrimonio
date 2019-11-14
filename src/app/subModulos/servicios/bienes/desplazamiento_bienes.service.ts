import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {DesplazamientoBienInterface} from '../../interfaces/bienes/desplazamiento-bienes-nterface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DesplazamientoBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(DesplazamientoBien:DesplazamientoBienInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento`,DesplazamientoBien,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(DesplazamientoBien:DesplazamientoBienInterface){
     console.log("crud MODIFICSR:::");
        const idR=DesplazamientoBien.iDespBienId;
        this.insertHead()
        return this.http.put<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento/${idR}`,DesplazamientoBien,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<DesplazamientoBienInterface>(`${environment.apiUrl}/pat/desplazamiento/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<DesplazamientoBienInterface[]>{
    this.insertHead()
    return this.http.post<DesplazamientoBienInterface[]>(`${environment.apiUrl}/pat/desplazamiento/combo`,this.httpOptions)
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

