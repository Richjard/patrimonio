import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from './local.services'

@Injectable({
  providedIn: "root"
})
export class QueryService {
  private baseUrl = 'http://200.60.83.163/api';
  private codEstu:string = ''
  carrera:any
  sede:any

  headers:any
  token:any
  httpOptions:any
  constructor(
      private http: HttpClient,
      private local:LocalService
      ) {
    
  }
  insertHead(){
    let data = this.local.getItem("unamToken");
    this.token = data['access_token']
    if(data['access_token']){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.token
        })
      }
    }
    
  }
  getIds(){
    let ids = this.local.getItem('codigo')
    let predata = ids.split('-')
    let idCarrera, idSede
    this.carrera = idCarrera
    this.sede = idSede
  }
  getUser(data){
    return this.http.post(`${this.baseUrl}/auth/login`, data)
  }
  ss(data){
    console.log(data)
    return this.http.post(`${this.baseUrl}/ura/docente/insertarBloqueHorario`, data)
  }
  getCod(){
    this.codEstu = this.local.getItem('codigo')
  }
  
  saveCargaH(data){
    let ids = this.local.getItem('codigo')
    let predata = ids.split('-')
    let idCarrera, idSede
    idCarrera = predata[1]
    idSede = predata[2]
    data['carreraId'] = idCarrera
    data['filialId'] = idSede
    console.log(data)
    return this.http.post(`${this.baseUrl}/ura/docente/guardarCargaHoraria`,data ,this.httpOptions )
  }
  searchDocent(text){
    return this.http.get(`${this.baseUrl}/ura/general/buscarDocentes/${text}` ,this.httpOptions )
  }
  getEstudiantesAll(text){
    let data = {
      busqueda:text, 
      orden:'asc', 
      pagina:'1', 
      nRegistros:'45'
    }
    return this.http.get(`${this.baseUrl}/ura/general/buscarEstudiantes`, { params:data})
  }
  verificarSeguro(codUniv,dni){
    return this.http.get(`${this.baseUrl}/estudiante/matricula/verificarRequisitosOBU/${codUniv}/${dni}`,this.httpOptions)
  }
  editcheck(modo,check,cod,ciclo){
    let data = {
      modo:modo, 
      check:check, 
      codUniv:cod, 
      cicloAcad:ciclo
    }
    return this.http.post(`${this.baseUrl}/dbu/control/guardarActualizarChecksObu`,data,this.httpOptions)
  }
}
