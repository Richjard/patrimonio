import { Component, OnInit } from '@angular/core';
import { QueryService } from './../../../servicios/query.services'
import { LocalService } from './../../../servicios/local.services'
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-all-cursos',
  templateUrl: './all-cursos.component.html',
  styleUrls: ['./all-cursos.component.scss'],
  animations: [SharedAnimations]
})
export class AllCursosComponent implements OnInit {
  
  cursos:any = [];
  data:any = [];
  preCurso:any;
  ciclo:string = ''

  constructor(
    private query:QueryService,
    private local:LocalService
  ) { }

  ngOnInit() {
    let dataUser = this.local.getItem('userInfo')
    this.ciclo = dataUser['cicloVigente'].iControlCicloAcad
    this.getCursos()
  }
  getCursos(){
    //console.log(this.ciclo)
    //this.query.getCursosDocente('20182','260')
    this.query.getCursosDocente()
    .subscribe(
      data => {
        this.cursos = data
      },
      error => {
        console.log(error)
      }
    )
  }
}

