import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/servicios/query.services';
import { LocalService } from 'src/app/servicios/local.services';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {
  
  Output,
  EventEmitter,
  
} from '@angular/core';
@Component({
  selector: 'app-gestion-notas',
  templateUrl: './gestion-notas.component.html',
  styleUrls: ['./gestion-notas.component.scss'],
  
  
})

export class GestionNotasComponent implements OnInit {
  
  cursos;
  nota;
  activo;
  listEstudiantes;
  procedimental;
  conceptual;
  actitudinal;
  prom;
  data: any = [];
  preCurso: any;
  ciclo: string = '';
 
  gdocente;
  ControlCicloAcad;
  PersId;
  asist;
  alumnosList;
  titulo;
  asistlist;
  cFechaAsis;
  unidad;
  
  @Input() curso;
  @Output() reload = new EventEmitter();
  constructor(
    private query: QueryService,
    private sanitizer: DomSanitizer,
    private local: LocalService,
   
  ) { 

    
  }

  ngOnInit() {
    //this.getcursosList();
    //this.activo = 1;
    
    this.getlistestudiante()
  }

 
  getlistestudiante() {
    //console.log('getListEstudiante ' + JSON.stringify(data));

    this.query
      .getlistestudiante(
        this.curso.iControlCicloAcad,
        this.curso.iCarreraId,
        this.curso.iCurricId,
        this.curso.cCurricCursoCod,
        this.curso.iSeccionId,
        this.curso.iDocenteId,
      )
      .toPromise()
      .then(
        res => {
          //this.titulo = res[0]['Curso'];
          this.listEstudiantes = res;
          
          console.log('getListEstudiante' + JSON.stringify(this.listEstudiantes));
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }
  
  

  getNotas(){
    this.nota = this.listEstudiantes;
    
    let nota = this.nota; 
    this.query.enviarNota(nota).subscribe(
      data => {

       Swal.fire(
          '¡Hecho!',
          'Se guardo correctamente',
          'success'
        )

        console.log(JSON.stringify( data))
      },
      error => {
        Swal.fire(
          '¡Hay un problema!',
          'Se ha encontrado un problema en el servidor.',
          'error'
        )
      }
    )
    //console.log(nota)
    }
  
}

