import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QueryService } from './../../servicios/query.services'
import { LocalService }   from './../../servicios/local.services'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  correo:string  = ""
  celular:string  = ""
  newPass:string 
  repPass:string 

  registerForm: FormGroup;
  submitted = false;
  code:string = ''
  @Output() reload = new EventEmitter();

  constructor(
    private query:QueryService,
    private local:LocalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public modal: NgbModal,
    
  ) { }

  ngOnInit() {
    this.getPersonData()
    this.registerForm = this.formBuilder.group({
      newPass: ['', [Validators.required, Validators.min(6)]],
      repPass: ['', [Validators.required, Validators.min(6)]]
    }); 
  }
  get f() { return this.registerForm.controls; }
  
  getPersonData(){
    this.query.getContactData()
    .subscribe(
      data=>{
        this.registerForm.setValue({
          newPass:'', 
          repPass:''}
        );
        console.log(data)
      },
      
      error=>{
        
        console.log(error)
      }
    )
  }
  savePersonData(){
    let userInfo = this.local.getItem('userInfo');
    this.code = userInfo['grl_persona'].cPersDocumento;
 
    let dataDocente = this.local.getItem('userInfo')

      let data = {

        clave: this.newPass,
        clave2: this.repPass,
        cDoceDni: this.code,
      }
      this.query.savePersonData(data)
      .subscribe(
        data => {
            Swal.fire('Genial', data['mensaje'], 'success');
            this.modal.dismissAll()
    
            //this.router.navigateByUrl('/user/perfil');
            this.reload.emit(true);
          },
          error => {
            console.log(error);
            if (error.error.hasOwnProperty('validated')) {
              Swal.fire('¡Hay un problema!', error.error.mensaje, 'error');
            }
            else {
              let mensaje = '';
              for (const i in  error.error.errors) {
                for (const j in error.error.errors[i]) {
                  let errorMensaje = error.error.errors[i][j]
                  mensaje += `${errorMensaje}<br>`
                }
              }
              Swal.fire('Validación incompleta', mensaje, 'warning');
            }
            
          },
      )
  }
}