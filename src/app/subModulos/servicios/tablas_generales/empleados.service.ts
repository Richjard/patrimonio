
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {EmpleadoInterface} from '../../interfaces/tablasGenerales/empleado-tablasGenerales-interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  ls = window.localStorage;
  httpOptions:any
  headers:any
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {
   }
   crear(Empleado:EmpleadoInterface){
    console.log("crud NUEVOOOO:::");
      this.insertHead()
      return this.http.post<EmpleadoInterface>(`${environment.apiUrl}/pat/empleados`,Empleado,this.httpOptions)
      .pipe(map(data => data));
   }
   modificar(Empleado:EmpleadoInterface){
     console.log("crud MODIFICSR:::");
        const idR=Empleado.iEmpleadoId;
        this.insertHead()
        return this.http.put<EmpleadoInterface>(`${environment.apiUrl}/pat/empleados/${idR}`,Empleado,this.httpOptions)
        .pipe(map(data => data));
    }
    delete(id:string){
      this.insertHead()
      return this.http.delete<EmpleadoInterface>(`${environment.apiUrl}/pat/empleados/${id}`,this.httpOptions)
      .pipe(map(data => data));
   }

   getCombo(): Observable<EmpleadoInterface[]>{
    this.insertHead()
    return this.http.post<EmpleadoInterface[]>(`${environment.apiUrl}/pat/empleados/combo`,this.httpOptions)
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
