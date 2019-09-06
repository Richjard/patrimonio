import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Only for demo purpose
  authenticated = false;
  //private baseUrl = 'http://200.60.83.163/api';
  private baseUrl = environment.serverRutas;
  //'http://127.0.0.1:8000/api';
  //private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient,
    private api: ApiService,
    private toastr: ToastrService,
  ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = this.store.getItem('unamToken');
    //console.log(this.authenticated)
  }
/*
checkAuth() {
  this.authenticated = this.store.getItem("unamToken");
  if(this.authenticated){
    this.api.verificarLoggued(this.modulo)
    .subscribe(
      data => {
        if (!data['access']) {
          this.signout()
        }
      },
      error => {
        this.signout()
      }
    )
  }
}
*/
  getuser() {
    return of({});
  }
//final
  signin(credentials) {
    this.api.getUser(credentials)
      .subscribe(
        data => {
          if(data['access_token']){
            this.authenticated = true;
            this.store.setItem("unamToken", data);
            this.api.getProfile().subscribe(data => {
              this.store.setItem('userInfo',data)
              if(credentials['usuario'] == credentials['password'] ){
                this.router.navigateByUrl('/user/resetPassword');
              }else{
                  this.router.navigateByUrl('/');
              }
            })
          }else{
            this.authenticated = false;
            this.store.setItem("unamToken", true);
          } 
        },
        error => {
          if (error.status == 401) {
            this.toastr.error('Verifica tu usuario y clave.', 'Acceso Denegado!');
          }
          if (error.status == 403) {
            this.toastr.error('No cuenta con permisos para ingresar a este módulo', '¡Acceso Prohibido!');
          }
          
        }
      )
      return of({}); 
  }

  signout() {
    this.authenticated = false;
    this.store.clear();
    //this.store.setItem('unamToken', false);
    //this.store.remove('codigo');
    this.router.navigateByUrl('/sessions/signin');
  }
}
