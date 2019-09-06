import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/servicios/query.services';
import { LocalService } from 'src/app/servicios/local.services';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.scss'],
})
export class MisAsistenciasComponent implements OnInit {
  cursos;
  data: any = [];
  preCurso: any;
  ciclo: string = '';
  activo;
  gdocente;
  ControlCicloAcad;
  PersId;
  asist;
  alumnosList;
  titulo;
  asistlist;
  cFechaAsis;
  listEstudiantes;

  @Input() curso;

  constructor(
    private query: QueryService,
    private sanitizer: DomSanitizer,
    private local: LocalService,
  ) {}

  ngOnInit() {
    //this.getcursosList();
    //this.activo = 1;
    this.getlistestudiante();
  }

  getcursosList() {
    this.gdocente = this.local.getItem('userInfo');
    this.ControlCicloAcad = this.gdocente['cicloVigente']['iControlCicloAcad'];
    this.PersId = this.gdocente['grl_persona']['iPersId'];

    console.log(this.PersId);
    this.query.getCursosDocente().subscribe(
      data => {
        this.cursos = data;
        console.log('getcursosList' + JSON.stringify(this.cursos));
      },
      error => {
        console.log(error);
      },
    );
  }
  goAsistencias() {
    this.query
      .getAsistenciaCabecera(
        this.curso.cDoceDni,
        this.curso.iControlCicloAcad,
        this.curso.iCarreraId,
        this.curso.cCurricCursoCod,
        this.curso.iCurricId,
        this.curso.iSeccionId,
      )
      .toPromise()
      .then(
        res => {
          this.titulo = res;
          this.asist = res;
          console.log('goAsistencias' + this.asist + this.titulo);
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }

  goAsistenciasList(data) {
    this.query
      .getasistenciaList(
        data.cDoceDni,
        data.iControlCicloAcad,
        data.iCarreraId,
        data.cCurricCursoCod,
        this.cFechaAsis,
        data.iSeccionId,
      )
      .toPromise()
      .then(
        res => {
          console.log(this.asistlist);
          //this.titulo = res[0]['Curso'];
          this.asistlist = res;
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
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
  Actual;
  getDownestudiante() {
    //console.log('getDownestudiante ' + JSON.stringify(data));
    window.open(
      'http://backsigeun.test/api/docente/control/downloadestudiante/' +
        this.curso.iControlCicloAcad +
        '/' +
        this.curso.iCarreraId +
        '/' +
        this.curso.iCurricId +
        '/' +
        this.curso.cCurricCursoCod +
        '/' +
        this.curso.iSeccionId +
        '/' +
        this.curso.iDocenteId,
    );
    this.query
      .getDownestudiante(
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
          let blob: Blob;
          // @ts-ignore
          blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const blobUrl = URL.createObjectURL(blob);
          // objectTag.data = blobUrl;
          this.Actual = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
          // this.pdfActual = datos;
          //this.cargandoPdf = false;
          //this.titulo = res[0]['Curso'];
          this.listEstudiantes = res;
          console.log('getDownestudiante' + JSON.stringify(this.listEstudiantes));
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }

  getDescargaestudiante() {
    //console.log('getDownestudiante ' + JSON.stringify(data));
    window.open(
      environment.serverRutas +
        '/docente/control/descargaestudiante/' +
        this.curso.iControlCicloAcad +
        '/' +
        this.curso.iCarreraId +
        '/' +
        this.curso.iCurricId +
        '/' +
        this.curso.cCurricCursoCod +
        '/' +
        this.curso.iSeccionId +
        '/' +
        this.curso.iDocenteId,
    );

    this.query
      .getDownestudiante(
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
          let blob: Blob;
          // @ts-ignore
          blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const blobUrl = URL.createObjectURL(blob);
          // objectTag.data = blobUrl;
          this.Actual = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
          // this.pdfActual = datos;
          //this.cargandoPdf = false;
          //this.titulo = res[0]['Curso'];
          this.listEstudiantes = res;
          console.log('getDownestudiante' + JSON.stringify(this.listEstudiantes));
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }
}
