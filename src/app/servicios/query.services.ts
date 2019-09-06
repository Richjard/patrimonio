import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from './local.services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  //private baseUrl = 'http://200.60.83.163/api';
  //private baseUrl = 'http://127.0.0.1:8000/api';
  private baseUrl = environment.serverRutas; // 'http://backsigeun.test/api';
  private codEstu: string = '';

  carrera: any;
  sede: any;

  plana: any;
  cursoa: any;
  cicloa: any;
  idpers: any;
  ciclo: any;

  headers: any;
  token: any;
  httpOptions: any;

  data: any = [];
  gdata: any = [];
  checkedList: any = [];

  constructor(private http: HttpClient, private local: LocalService) {
    this.insertHead();
  }
  insertHead() {
    let data = this.local.getItem('unamToken');
    this.token = data['access_token'];
    if (data['access_token']) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        }),
      };
    }
  }
  getIds() {
    let ids = this.local.getItem('codigo');
    let predata = ids.split('-');
    let idCarrera, idSede;
    this.carrera = idCarrera;
    this.sede = idSede;
  }
  getUser(data) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }
  ss(data) {
    console.log(data);
    return this.http.post(`${this.baseUrl}/ura/docente/insertarBloqueHorario`, data);
  }
  getCod() {
    this.codEstu = this.local.getItem('codigo');
  }

  saveCargaH(data) {
    let ids = this.local.getItem('codigo');
    let predata = ids.split('-');
    let idCarrera, idSede;
    idCarrera = predata[1];
    idSede = predata[2];
    data['carreraId'] = idCarrera;
    data['filialId'] = idSede;
    console.log(data);
    return this.http.post(
      `${this.baseUrl}/ura/docente/guardarCargaHoraria`,
      data,
      this.httpOptions,
    );
  }
  searchDocent(text) {
    return this.http.get(`${this.baseUrl}/ura/general/buscarDocentes/${text}`, this.httpOptions);
  }
  getEstudiantesAll(text) {
    let data = {
      busqueda: text,
      orden: 'asc',
      pagina: '1',
      nRegistros: '45',
    };
    return this.http.get(`${this.baseUrl}/ura/general/buscarEstudiantes`, { params: data });
  }

  verificarSeguro(codUniv, dni) {
    return this.http.get(
      `${this.baseUrl}/estudiante/matricula/verificarRequisitosOBU/${codUniv}/${dni}`,
      this.httpOptions,
    );
  }
  editcheck(modo, check, cod, ciclo) {
    let data = {
      modo: modo,
      check: check,
      codUniv: cod,
      cicloAcad: ciclo,
    };
    return this.http.post(
      `${this.baseUrl}/dbu/control/guardarActualizarChecksObu`,
      data,
      this.httpOptions,
    );
  }

//---------------CAMBIAR  CONTRASEÑA---------------------
getContactData() {
  let userInfo = this.local.getItem('userInfo');
  this.codEstu = userInfo['grl_persona'].cPersDocumento;

  //let codEstu = this.local.getItem('userInfo');
  return this.http.get(
    `${this.baseUrl}/docente/cursos/obtenerDatosContacto/${this.codEstu}`,
    this.httpOptions,
  );
}
savePersonData(data) {
  this.insertHead();
  return this.http.post(`${this.baseUrl}/docente/cursos/editarDatosContacto`, data, this.httpOptions);
}
//------------------------------------
  
  getAsistenciaCabecera(
    cDoceDni,
    iControlCicloAcad,
    iCarreraId,
    cCurricCursoCod,
    iCurricId,
    iSeccionId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/asistencia/${cDoceDni}/${iControlCicloAcad}/${iCarreraId}/${cCurricCursoCod}/${iCurricId}/${iSeccionId}`,
      this.httpOptions,
    );
  }

  getasistenciaList(
    cDoceDni,
    iControlCicloAcad,
    iCarreraId,
    cCurricCursoCod,
    cFechaAsis,
    iSeccionId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/asistencialist/${cDoceDni}/${iControlCicloAcad}/${iCarreraId}/${cCurricCursoCod}/${cFechaAsis}/${iSeccionId}`,
      this.httpOptions,
    );
  }

  getlistestudiante(
    iControlCicloAcad,
    iCarreraId,
    iCurricId,
    cCurricCursoCod,
    iSeccionId,
    iDocenteId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/listestudiante/${iControlCicloAcad}/${iCarreraId}/${iCurricId}/${cCurricCursoCod}/${iSeccionId}/${iDocenteId}`,
      this.httpOptions,
    );
  }

  getDownestudiante(
    iControlCicloAcad,
    iCarreraId,
    iCurricId,
    cCurricCursoCod,
    iSeccionId,
    iDocenteId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/downloadestudiante/${iControlCicloAcad}/${iCarreraId}/${iCurricId}/${cCurricCursoCod}/${iSeccionId}/${iDocenteId}`,
      this.httpOptions,
    );
  }

  getDescargaHorario(
    persid,
    cicloId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/downloadestudiante/${persid}/${cicloId}`,
      this.httpOptions,
    );
  }

  getdescargaestudiante(
    iControlCicloAcad,
    iCarreraId,
    iCurricId,
    cCurricCursoCod,
    iSeccionId,
    iDocenteId,
  ) {
    return this.http.get(
      `${this.baseUrl}/docente/control/descargaestudiante/${iControlCicloAcad}/${iCarreraId}/${iCurricId}/${cCurricCursoCod}/${iSeccionId}/${iDocenteId}`,
      this.httpOptions,
    );
  }

  /*importamos los datos para obtener cursos del docente*/
  //getCursosDocente(ciclo, idpers) {

  //getCursosDocente(ciclo) {

  getCursosDocente() {
    let userInfo = this.local.getItem('userInfo');
    this.ciclo = userInfo['cicloVigente'].iControlCicloAcad;
    return this.http.get(
      `${this.baseUrl}/docente/cursos/obternerCursosDocente/${this.ciclo}/${userInfo.iPersId}`,
      this.httpOptions,
    );
    //return this.http.get(`${this.baseUrl}/docente/cursos/obternerCursosDocente/${ciclo}/${userInfo.iPersId}`,this.httpOptions)
    //return this.http.get(`${this.baseUrl}/docente/cursos/obternerCursosDocente/${ciclo}/${idpers}`, this.httpOptions,);
  }

  getCursosDocenteSilabo(cicloa, cursoa) {
    //getCursosDocenteSilabo(cicloa){
    //let cursoa = this.getCursosDocente('cursoa')
    //return this.http.get(`${this.baseUrl}/docente/cursossilabo/obternerCursosDocenteSilabo/${cicloa}/${cursoa}`,this.httpOptions)
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obternerCursosDocenteSilabo/${cicloa}/${cursoa}`,
      this.httpOptions,
    );
  }

  //-------------------------------------
  //Guardar Detalle Unidad
  saveDetallesUnidades(dataSaveDU) {
    console.log('dataSaveDU');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleUnidad`,
      dataSaveDU,
      this.httpOptions,
    );
  }

  //Guardar Detalle Conceptuales
  saveDetallesConceptuales(dataSaveDC) {
    console.log('dataSaveDC');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleConceptuales`,
      dataSaveDC,
      this.httpOptions,
    );
  }

  //Guardar Detalle Actitudinales
  saveDetallesActitudinales(dataSaveDA) {
    console.log('dataSaveDA');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleActitudinales`,
      dataSaveDA,
      this.httpOptions,
    );
  }
  //Guardar Detalle Procedimentales
  saveDetallesProcedimentales(dataSaveDP) {
    console.log('dataSaveDP');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleProcedimentales`,
      dataSaveDP,
      this.httpOptions,
    );
  }
  //-------------------------------------

  //Guardar detalle_evaluacion
  saveDetallesCompetencias(dataSaveC) {
    console.log('dataSaveC');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleCompetencias`,
      dataSaveC,
      this.httpOptions,
    );
  }

  //Guardar detalle_evaluacion
  saveDetallesProcedimientos(dataSaveP) {
    console.log('dataSaveP');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleProcedimientos`,
      dataSaveP,
      this.httpOptions,
    );
  }

  //Guardar Aprendizaje
  saveAprendizaje(dataSaveA) {
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarAprendizajes`,
      dataSaveA,
      this.httpOptions,
    );
  }

  //Guardar detalle_equipos
  saveDetalleEquipos(dataSaveE) {
    console.log('dataSaveE');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleEquipos`,
      dataSaveE,
      this.httpOptions,
    );
  }

  //Guardar detalle_materiales
  saveDetalleMateriales(dataSaveM) {
    console.log('dataSaveE');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleMateriales`,
      dataSaveM,
      this.httpOptions,
    );
  }

  //Guardar detalle_evaluacion
  saveDetalleEvaluaciones(dataSaveDE) {
    console.log('dataSaveDE');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarDetalleEvaluacion`,
      dataSaveDE,
      this.httpOptions,
    );
  }

  //Guardar FuenteTextoBase
  saveFuenteTextoBase(dataSaveFTB) {
    console.log('dataSaveFTB');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarFuenteTextoBase`,
      dataSaveFTB,
      this.httpOptions,
    );
  }
  //Guardar FuenteBibliografiaComplementaria
  saveFuenteBibliografiaComplementaria(dataSaveFBC) {
    console.log('dataSaveFBC');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarFuenteBibliografiaComplementaria`,
      dataSaveFBC,
      this.httpOptions,
    );
  }
  //Guardar FuenteElectronicas
  saveFuenteElectronicas(dataSaveFE) {
    console.log('dataSaveFE');
    return this.http.post(
      `${this.baseUrl}/docente/cursossilabo/insertarFuenteElectronicas`,
      dataSaveFE,
      this.httpOptions,
    );
  }

  //Seleccionar segun tabla
  getProcedimientosTecnicas() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboProcedimientosTecnicas`,
      this.httpOptions,
    );
  }

  getEquipos() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboEquipos`,
      this.httpOptions,
    );
  }
  getMateriales() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboMateriales`,
      this.httpOptions,
    );
  }

  getEvaluacionPermanente() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboEvaluacionPermanente`,
      this.httpOptions,
    );
  }
  getClaseSilabo() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboClaseSilabo`,
      this.httpOptions,
    );
  }

  getSemanaSilabo() {
    return this.http.get(
      `${this.baseUrl}/docente/cursossilabo/obtenerSilaboSemanaSilabo`,
      this.httpOptions,
    );
  }

  //Ver Horario del Docente
  getHorarioDocente(){
    let userInfo = this.local.getItem('userInfo');
    console.log(userInfo.iPersId);
    this.ciclo = userInfo['cicloVigente'].iControlCicloAcad;
    console.log(this.ciclo);
    return this.http.get(
      `${this.baseUrl}/ura/docente/obtenerHorarioDocente/${userInfo.iPersId}/${this.ciclo}`,
      this.httpOptions,
    );
  }


//Guardar Nota
  enviarNota(nota) {
    //console.log(nota);
    return this.http.post(
        `${this.baseUrl}/docente/control/NotasEstudiante/`,
        nota,
        this.httpOptions,
    );
}


}
