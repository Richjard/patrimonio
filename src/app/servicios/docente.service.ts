import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from './local.services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  readonly urlPublic: string = 'http://200.48.160.218:8081/';

  private baseUrl = environment.serverRutas;
  token: any;
  httpOptions: any;

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
  getDatosDocente() {
    let userInfo = this.local.getItem('userInfo');

    return this.http.get(
      environment.serverRutas + '/docente/datos/datosdocente/' + userInfo.iPersId,
    );
  }
}
