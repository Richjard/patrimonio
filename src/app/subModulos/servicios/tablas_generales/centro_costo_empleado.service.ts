
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {CentroCostoEmpleadoInterface} from '../../interfaces/tablasGenerales/centro_costo_empleado-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CentroCostoEmpleadoService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(CentroCostoEmpleado:CentroCostoEmpleadoInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<CentroCostoEmpleadoInterface>(`${environment.apiUrl}/pat/centro_costo_empleado`,CentroCostoEmpleado,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(CentroCostoEmpleado:CentroCostoEmpleadoInterface){
     console.log("crud MODIFICSR:::");
        const idR=CentroCostoEmpleado.idCentroCostoEmpleado;
        this.insertHead()
        return this.http.put<CentroCostoEmpleadoInterface>(`${environment.apiUrl}/pat/centro_costo_empleado/${idR}`,CentroCostoEmpleado,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<CentroCostoEmpleadoInterface>(`${environment.apiUrl}/pat/centro_costo_empleado/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<CentroCostoEmpleadoInterface[]>{
    this.insertHead()
    return this.http.post<CentroCostoEmpleadoInterface[]>(`${environment.apiUrl}/pat/centro_costo_empleado/combo`,this.httpOptions)
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
