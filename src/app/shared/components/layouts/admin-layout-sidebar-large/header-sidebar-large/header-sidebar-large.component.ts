import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import { LocalService } from './../../../../../servicios/local.services';
import * as $ from 'jquery';
import { DocenteService } from 'src/app/servicios/docente.service';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss'],
})
export class HeaderSidebarLargeComponent implements OnInit {
  notifications: any[];
  codigo: any;
  codigos: any = [];
  data: any = {};
  nombres: string = '';
  fotos;
  rutas;
  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private local: LocalService,
    private service: DocenteService,
    private auth: AuthService,
  ) {
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat',
      },
    ];
  }

  ngOnInit() {
    this.getCodigos();
    this.getdatoDocente();
    //this.getcodigo()
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;
    if (state.childnavOpen && state.sidenavOpen) {
      return (state.childnavOpen = false);
    }
    if (!state.childnavOpen && state.sidenavOpen) {
      return (state.sidenavOpen = false);
    }
    if (!state.sidenavOpen && !state.childnavOpen) {
      state.sidenavOpen = true;
      setTimeout(() => {
        state.childnavOpen = true;
      }, 50);
    }
  }
  modCodigo() {
    this.local.setItem('codigo', this.codigo);
    window.location.reload();
  }
  getcodigo() {
    this.codigo = this.local.getItem('codigo');
    if (this.codigo == null || this.codigo == undefined) {
      this.codigo = this.codigos[0].cod;
      this.local.setItem('codigo', this.codigo);
    }
  }
  getCodigos() {
    this.data = this.local.getItem('userInfo');
    this.getNombres();
    //console.log(this.data)
    for (let x in this.data['seg_credenciales_perfiles']) {
      if (this.data['seg_credenciales_perfiles'][x].iPerfilId == '2') {
        let pre = this.data['seg_credenciales_perfiles'][x];
        for (let h in pre['seg_credenciales_perfiles_filiales_carreras']) {
          let ids =
            pre['seg_credenciales_perfiles_filiales_carreras'][h]['iCredPerfSedeEscId'] +
            '-' +
            pre['seg_credenciales_perfiles_filiales_carreras'][h]['iCarreraId'] +
            '-' +
            pre['seg_credenciales_perfiles_filiales_carreras'][h]['iFilId'];
          let names =
            pre['seg_credenciales_perfiles_filiales_carreras'][h]['ura_carrera'].cCarreraCarn +
            ' - ' +
            pre['seg_credenciales_perfiles_filiales_carreras'][h]['grl_filial'].cFilDescripcion;
          this.codigos.push({ cod: ids, label: names });
        }
      }
    }
  }
  signout() {
    this.auth.signout();
  }
  getNombres() {
    if (this.data != undefined || this.data != null) {
      this.nombres =
        this.data['grl_persona']['cPersNombre'] + ' ' + this.data['grl_persona']['cPersPaterno'];
    }
  }

  getdatoDocente() {
    this.service.getDatosDocente().subscribe(data => {
      //console.log(JSON.stringify(data['rutas'][0]['cConfigGrlesPathFotosReniec']));
      this.rutas = data['rutas'][0]['cConfigGrlesPathFotosReniec'];
      this.fotos = data['reniec'][0]['cReniecFotografia'];
    });
  }
}
