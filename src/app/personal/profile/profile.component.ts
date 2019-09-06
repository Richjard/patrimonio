import { Component, OnInit } from '@angular/core';
import { LocalService } from './../../servicios/local.services';
import { DocenteService } from 'src/app/servicios/docente.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  info: any;
  fotos;
  rutas;
  datos;

  constructor(private local: LocalService, private service: DocenteService) {}

  ngOnInit() {
    this.getInfoPersonal();
    this.getdatoDocente();
  }
  getInfoPersonal() {
    let informacion = this.local.getItem('userInfo');
    this.info = informacion['grl_persona'];
    console.log(this.info);
  }

  getdatoDocente() {
    this.service.getDatosDocente().subscribe(data => {
      this.rutas = data['rutas'][0]['cConfigGrlesPathFotosReniec'];
      this.fotos = data['reniec'][0]['cReniecFotografia'];
      this.datos = data;
      console.log(data['results']['cDocenteTitulo']);
    });
  }
}
