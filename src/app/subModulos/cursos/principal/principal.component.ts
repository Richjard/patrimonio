import { Component, OnInit } from '@angular/core';
import { LocalService } from './../../../servicios/local.services';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from './../../../servicios/query.services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  codigo: string;
  titulo: string = 'Menu Principal';
  menus: any = [];
  option: any = {};
  cursos: any = [];
  datos;
  data: any = [];
  preCurso: any;
  ciclo: string = '';
  activo;
  gdocente;
  ControlCicloAcad;
  PersId;
  asist;
  alumnosList;

  asistlist;
  cFechaAsis;
  listEstudiantes;

  curso: any = 0;

  constructor(
    private route: ActivatedRoute,
    private query: QueryService,
    private local: LocalService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.codigo = params.get('dni');
    });
    this.option = { n: 0, titulo: 'Panel de Control', image: 'm1', ruta: '' };
  }
  //
  ngOnInit() {
    this.menus = [
      { n: 1, titulo: 'Gestión de Sílabos', image: 'm1', tipo: 'seccion' },
      { n: 2, titulo: 'Gestión de Asistencia', image: 'seguridad', tipo: 'seccion' },
      { n: 3, titulo: 'Gestión de Notas Estudiantes', image: 'mt10', tipo: 'seccion' },
      { n: 4, titulo: 'Gestión Exámenes Sustitutorio', image: 'mt1', tipo: 'seccion' },

      { n: 5, titulo: 'Gestión de Horarios', image: 'mt5', tipo: 'seccion' },
      { n: 6, titulo: 'Nominas de Estudiantes', image: 'mt2', tipo: 'seccion' },
      { n: 7, titulo: 'Gestión Registro Auxiliar', image: 'mt6', tipo: 'seccion' },
      { n: 8, titulo: 'Gestión de Reportes', image: 'mt9', tipo: 'seccion' },
    ];
    this.info();
    this.getcursosList();
    this.activo = 1;
  }
  info() {
    this.query.getCursosDocente().subscribe(
      data => {
        this.datos = data;
        console.log('info ' + JSON.stringify(this.datos));
      },
      error => {
        console.log(error);
      },
    );
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
}
