import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/servicios/query.services';
import { NgbDatepickerConfig, NgbCalendar, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-gestion-asistencia',
  templateUrl: './gestion-asistencia.component.html',
  styleUrls: ['./gestion-asistencia.component.scss'],
  providers: [DatePipe, NgbDateNativeAdapter],
})
export class GestionAsistenciaComponent implements OnInit {
  cursos;
  activo;
  listEstudiantes;
  hoy;
  datos;
  model;
  fecha;

  checkd;
  games = [
    {
      name: 'Chess',
      id: 1,
      selected: true,
    },
    {
      name: 'Ludo',
      id: 2,
      selected: false,
    },
    {
      name: 'Snakes & Ladders',
      id: 3,
      selected: false,
    },
    {
      name: 'Carrom',
      id: 4,
      selected: false,
    },
    {
      name: 'Scrabble',
      id: 5,
      selected: false,
    },
    {
      name: 'Monopoly',
      id: 6,
      selected: true,
    },
    {
      name: 'Uno',
      id: 7,
      selected: false,
    },
  ];

  @Input() curso;
  constructor(
    private query: QueryService,
    private calendar: NgbCalendar,
    private datePipe: DatePipe,
    private config: NgbDatepickerConfig,
    private native: NgbDateNativeAdapter,
  ) {
    config.maxDate = calendar.getToday();
  }

  ngOnInit() {
    //this.getcursosList();
    //this.activo = 1;
    this.hoy = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.getestudiante();
    this.checkd = 1;
  }

  getcursosList() {
    this.query.getCursosDocente().subscribe(
      data => {
        this.cursos = data;
      },
      error => {
        console.log(error);
      },
    );
  }

  getestudiante() {
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
          console.log(this.listEstudiantes);
          for (var i = 0; i < this.listEstudiantes.length; i++) {
            this.listEstudiantes[i].checkd = true; // Se añade y se inicializa para marcar asistencia
          }
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }

  getasistencias(data) {
    this.query
      .getasistenciaList(
        data.cDoceDni,
        data.iControlCicloAcad,
        data.iCarreraId,
        data.cCurricCursoCod,
        data.cFechaAsis,
        data.iSeccionId,
      )
      .toPromise()
      .then(
        res => {
          //this.titulo = res[0]['Curso'];
          this.listEstudiantes = res;
          console.log(this.listEstudiantes);
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }

  prueba(a) {
    console.log(this.curso);
    this.fecha = this.datePipe.transform(this.native.toModel(a), 'dd-MM-yyyy');
    console.log(this.fecha);
    this.datos = {
      cDoceDni: this.curso.cDoceDni,
      iControlCicloAcad: this.curso.iControlCicloAcad,
      iCarreraId: this.curso.iCarreraId,
      cCurricCursoCod: this.curso.cCurricCursoCod,
      cFechaAsis: this.fecha,
      iSeccionId: this.curso.iSeccionId,
    };
    this.getasistencias(this.datos);
    console.log(this.fecha);
  }

  ingresarAsistencia() {
    console.log('Ya ingresaste las asistencias');
    console.log(this.listEstudiantes);
  }
  corregirAsistencia() {
    console.log('Ya corregiste las asistencias');
    console.log(this.listEstudiantes);
  }
}
