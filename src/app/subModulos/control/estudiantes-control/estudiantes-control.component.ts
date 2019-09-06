import { Component, OnInit } from '@angular/core';
import { QueryService } from './../../../servicios/query.services'
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-estudiantes-control',
  templateUrl: './estudiantes-control.component.html',
  styleUrls: ['./estudiantes-control.component.scss']
})
export class EstudiantesControlComponent implements OnInit {

  textEstudiante:string = ''
  estudiantes:any = []
  p: number = 1;
  
  constructor(
    private query:QueryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  buscar(){
    this.query.getEstudiantesAll(this.textEstudiante)
    .subscribe(
      data => {
        this.estudiantes = data
      },
      error => {
        console.log(error)
      }
    )
  }
  verificar(codUniv,dni,ciclo){
    this.query.verificarSeguro(codUniv,dni)
    .subscribe(
      data => {
        let vali = data['seguro_proveedor']
        if(vali != null){
          this.toastr.success('Estudiante tiene seguro: ' + vali, 'Exito!');
          this.editRow(2,1,codUniv,ciclo)
        }else{
          this.toastr.error('No se encontro un seguro afiliado!', 'Alerta!');
        }
        
      },
      error => {
        console.log(error)
      }
    )
  }
  editRow(modo,check,cod,ciclo){
    this.query.editcheck(modo,check,cod,ciclo)
    .subscribe(
      data => {
        this.toastr.success('Datos Actualizados exitosamente!', 'Exito!');
        this.buscar()
      },
      error => {
        this.toastr.error('el registro no se guardo!', 'Error!');
      }
    )
  }
}
