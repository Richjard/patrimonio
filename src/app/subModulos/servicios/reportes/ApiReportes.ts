import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { LocalService } from '../../../servicios/local.services'
import { map } from 'rxjs/operators';
import {BienReportInterface} from '../../interfaces/reportes/BienReport-interface';
import { UbicaionCentroCOsto } from 'src/app/subModulos/interfaces/reportes/ubicacion-CentroCosto';
import { environment,environmentCliente } from '../../../../environments/environment';
import {retryWithBackoff} from '../../servicios/retri'

@Injectable({
  providedIn: 'root'
})
export class ApiReporteService {

  ls = window.localStorage;
  httpOptions:any
  headers:HttpHeaders
  token:any
  constructor(private http:HttpClient,private store: LocalService,) {

    this.ls.getItem('unamToken');
    let data = this.store.getItem("unamToken");
    this.token = data['access_token']
    if(data['access_token']){
      this.headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.token
        },
        )
      
    }
    
   }
 
   getUbicacionPorDepdenciaBines(id:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.post<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/ubicacionPorDependencia/${id}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }
   getUbicacionPorDepenSubaBines(id:any,id2:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.post<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/ubicacionPorDepenSub/${id}/${id2}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }
   getUbicacionPorDepenaEmp(id:any,id2:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.post<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/getDataComboubicacionEmpleado/${id}/${id2}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }
   getDepenSubDep(id:any,id2:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.post<BienReportInterface[]>(`${environmentCliente.apiUrl}/subModulos/reportes/por_dependecia_empleado/${id}/${id2}`,{headers:this.httpOptions})
    .pipe(map(data => data));
   }
   
   getUbicacionPorCentroCostoBienes(id:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.get<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/ubicacionPorDepenSubEmp/${id}`,{headers:this.httpOptions})   

    .pipe(map(data => data));
   }

   getUbicacionEmpleado(): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.get<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/ubicacionEmpleado`,{headers:this.httpOptions})   

    .pipe(map(data => data));
   }
   getDataCentroCosto(id:any): Observable<UbicaionCentroCOsto[]>{
    this.insertHead()
    return this.http.get<UbicaionCentroCOsto[]>(`${environment.apiUrl}/pat/reportes/getDataCentroCosto/${id}`,{headers:this.httpOptions})   

    .pipe(map(data => data));
   }
   getDataBienNoDepreciable(): Observable<UbicaionCentroCOsto[]>{
    this.insertHead()
    return this.http.get<UbicaionCentroCOsto[]>(`${environment.apiUrl}/pat/reportes/getBienNoDepreciable`,{headers:this.httpOptions})   

    .pipe(map(data => data));
   }
   
   getComboCuentaMayor(): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.get<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/getComboCuentaMayor`,{headers:this.httpOptions})   

    .pipe(retryWithBackoff(100),map(data => data));
   }
   getComboSubCuenta(): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.get<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/getComboCuentaContable`,{headers:this.httpOptions})   

    .pipe(retryWithBackoff(100),map(data => data));
   }
   getBienCuentaContable(id:any): Observable<BienReportInterface[]>{
    this.insertHead()
    return this.http.get<BienReportInterface[]>(`${environment.apiUrl}/pat/reportes/getBienCuentaMayor/${id}`,{headers:this.httpOptions})   

    .pipe(retryWithBackoff(100),map(data => data));
   }



   

  insertHead(){
    
    
  }
  

}

