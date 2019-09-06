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

  constructor(private route: ActivatedRoute, private query: QueryService) {
    this.route.paramMap.subscribe(params => {
      this.codigo = params.get('dni');
    });
    this.option = { n: 0, titulo: 'Panel de Control', image: 'm1', ruta: '' };
  }

  ngOnInit() {
    this.menus = [
      { n: 1, titulo: 'Ingreso de Notas de manera extemporánea', image: 'm1', tipo: 'seccion' },
      { n: 2, titulo: 'Ingreso de asistencia extemporánea', image: 'seguridad', tipo: 'seccion' },
      { n: 3, titulo: 'Modificación de Notas de Unidad', image: 'mt4', tipo: 'seccion' },
      { n: 4, titulo: 'Reprogramación de Clases', image: 'mt5', tipo: 'seccion' },
      { n: 5, titulo: 'Reprogramación de Exámenes', image: 'mt2', tipo: 'seccion' },
      { n: 6, titulo: 'Descargo por Inasistencia (Docente)', image: 'mt6', tipo: 'seccion' },
    ];
  }
}
