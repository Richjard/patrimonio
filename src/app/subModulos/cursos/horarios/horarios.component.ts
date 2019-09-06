import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../servicios/query.services';
import { LocalService } from '../../../servicios/local.services';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent implements OnInit {
  mihorario;
  cicloid;
  persid;

  constructor(private query: QueryService, private local: LocalService, private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.query.getHorarioDocente().subscribe(data => {
      let userInfo = this.local.getItem('userInfo');
      this.cicloid = userInfo['cicloVigente'].iControlCicloAcad;
      this.mihorario = data;
      console.log(this.mihorario);
    });
  }
  Actual;
  
  getDescargaHorario() {
    //console.log(' mihorario ' + JSON.stringify(this.mihorario));
    let userInfo = this.local.getItem('userInfo');
    this.cicloid = userInfo['cicloVigente'].iControlCicloAcad;
    this.persid = userInfo['cicloVigente'].iPersId;
    //console.log(this.mihorario[0].iPersId);
    window.open(
      environment.serverRutas +
        '/docente/control/descargahorario/' +
        this.mihorario[0].iPersId +
        '/' +
        this.cicloid ,
    );

    this.query
      .getDescargaHorario(
        this.mihorario[0].iPersId,
        this.cicloid
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
          
          this.Actual = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
         
          this.mihorario = res;
          console.log(' getDescargaHorario' + JSON.stringify(this.mihorario));
        },
        error => {
          //this.toastr.error('Acceso Denegado!', 'Verifica tu usuario y clave!');
        },
      );
  }
}
