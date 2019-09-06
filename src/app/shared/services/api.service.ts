import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from './local-store.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //private baseUrl = 'http://200.60.83.163/api';
  //private baseUrl = 'http://127.0.0.1:8000/api';
  private baseUrl = environment.serverRutas; //'http://backsigeun.test/api';
  headers: any;
  token: any;
  ls = window.localStorage;
  httpOptions: any;
  constructor(private http: HttpClient, private store: LocalStoreService) {}
  insertHead() {
    this.ls.getItem('unamToken');
    let data = this.store.getItem('unamToken');
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
  getUser(data) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }
  saveBlockHorario(predata) {
    this.insertHead();
    return this.http.post(
      `${this.baseUrl}/ura/docente/insertarBloqueHorario`,
      predata,
      this.httpOptions,
    );
  }
  getProfile() {
    this.insertHead();
    return this.http.get(`${this.baseUrl}/obtenerInfoCredencial`, this.httpOptions);
  }
}
