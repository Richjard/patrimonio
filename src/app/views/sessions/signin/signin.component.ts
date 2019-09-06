import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalService } from 'src/app/servicios/local.services';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from 'src/app/servicios/query.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations],
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    usuario: string;
    clave: string
    
    @Output() reload = new EventEmitter();
   //correo:string  = ""
   //celular:string  = ""
    newPass:string 
    repPass:string 
  
    registerForm: FormGroup;
    submitted = false;
    code:string = ''


    constructor(
        public modal: NgbModal,

        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,

        config: NgbModalConfig, 
        private modalService: NgbModal,

        private query:QueryService,
        private local:LocalService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService



    ) { 
        config.backdrop = 'static';
        config.keyboard = false;

    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            newPass: ['', [Validators.required, Validators.min(6)]],
            repPass: ['', [Validators.required, Validators.min(6)]]
        }); 

        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signinForm = this.fb.group({
      usuario: [this.usuario, Validators.required],
      password: [this.clave, Validators.required],
      modulo: [2],
    });
  }

    signin() {
        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.auth.signin(this.signinForm.value)
            .subscribe(res => {
                this.router.navigateByUrl('/');
                this.loading = false;
            });
    }
//---
}