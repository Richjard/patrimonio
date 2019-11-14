import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {CatalogoNoPatrimonialInterface} from '../../interfaces/tablasGenerales/catalogoNoPatrimonial-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CatalogoNoPatrimonialService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(CatalogoNP:CatalogoNoPatrimonialInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<CatalogoNoPatrimonialInterface>(`${environment.apiUrl}/pat/calogosNoPatrimoniales`,CatalogoNP,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(CatalogoNP:CatalogoNoPatrimonialInterface){
     console.log("crud MODIFICSR:::");
        const idR=CatalogoNP.iCatalogoNoPatId;
        this.insertHead()
        return this.http.put<CatalogoNoPatrimonialInterface>(`${environment.apiUrl}/pat/calogosNoPatrimoniales/${idR}`,CatalogoNP,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<CatalogoNoPatrimonialInterface>(`${environment.apiUrl}/pat/calogosNoPatrimoniales/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<CatalogoNoPatrimonialInterface[]>{
    this.insertHead()
    return this.http.post<CatalogoNoPatrimonialInterface[]>(`${environment.apiUrl}/pat/calogosNoPatrimoniales/combo`,this.httpOptions)
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
