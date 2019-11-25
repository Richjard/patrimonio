import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {EmpleadoBienesInterface} from '../../interfaces/bienes/empleado-bienes-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoBienesService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(EmpleadoBienes:EmpleadoBienesInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<EmpleadoBienesInterface>(`${environment.apiUrl}/pat/empleado_bienes`,EmpleadoBienes,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(EmpleadoBienes:EmpleadoBienesInterface){
     console.log("crud MODIFICSR:::");
        const idR=EmpleadoBienes.iDespBienDetID;
        this.insertHead()
        return this.http.put<EmpleadoBienesInterface>(`${environment.apiUrl}/pat/empleado_bienes/${idR}`,EmpleadoBienes,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<EmpleadoBienesInterface>(`${environment.apiUrl}/pat/empleado_bienes/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getData(iCentroCostoEmpleadoId): Observable<EmpleadoBienesInterface[]>{
    this.insertHead()
    return this.http.post<EmpleadoBienesInterface[]>(`${environment.apiUrl}/pat/empleado_bienes/data/${iCentroCostoEmpleadoId}`,this.httpOptions)
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

