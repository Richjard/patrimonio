import { Component, OnInit,ViewChild } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { AniosService } from 'src/app/subModulos/servicios/tablas_generales/anios.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastrService  } from 'ngx-toastr';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    usuario: string;
    clave: string;
    iYearId: string;

    public dataAnio;
    public AnioFields: Object = { text: 'iYearId', value: 'iYearId' };
    // set the height of the popup element
    // set the placeholder to DropDownList input element
    public AnioMark: string = 'Selecccione un año';
    @ViewChild('AnioObj',{static: true})
    public AnioObjL: DropDownListComponent;
    public valueAnio:string;
    
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private dataApiAnio:AniosService,
        private toastr: ToastrService
    ) { }
  
    ngOnInit() {
        
        let date: Date = new Date();  
       
         this.valueAnio=''+date.getFullYear(); 
        this.dataApiAnio.getCombo_().subscribe((respon)=>{ this.dataAnio=respon;  this.AnioObjL.value=this.valueAnio;});
       
        console.log("anio"+'2019');
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Cargando la interfaz del modulo de patrimonio..';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            usuario: [this.usuario, Validators.required],
            password: [this.clave, Validators.required],
            iYearId:[this.iYearId, Validators.required],
            modulo: [ 11 ]
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Iniciando sesión...';
        console.log("data session:",this.signinForm.value.iYearId);
        if(this.signinForm.value.iYearId == null){
            this.toastr.error('Debe de seleccionar un año', '¡Seleccione un año!');
        }else{
            this.auth.signin(this.signinForm.value)
            .subscribe(res => {
                this.router.navigateByUrl('/');
                this.loading = false;
            });
        }
        
    }

}
