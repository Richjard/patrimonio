import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { ToastrService  } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = false;
  private baseUrl = 'http://192.168.1.145/api';
  modulo: number = 11

  constructor(
    private store: LocalStoreService, 
    private router: Router,
    private http: HttpClient, 
    private api:ApiService,
    private toastr: ToastrService
    ) {
    this.checkAuth();
  }

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

  getuser() {
    return of({});
  }

  signin(credentials) {
    
    this.api.getUser(credentials)
    .subscribe(
      data => {
        if(data['access_token']){
          this.authenticated = true;
          this.store.setItem("unamToken", data);
          this.api.getProfile().subscribe(data => { 
            this.store.setItem('userInfo',data);
            this.store.setItem('iYearId',credentials.iYearId)
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
    return of({}).pipe(delay(5000));
  }

  signout() {
    this.authenticated = false;
    this.store.clear();
    this.router.navigateByUrl("/sessions/signin");
  }
}
