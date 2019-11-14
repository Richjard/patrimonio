import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../servicios/local.services'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public date: Object = new Date()
  info:any
  to:any;
  constructor(
    private local:LocalService
  ) { }

  ngOnInit() {
    this.getInfoPersonal()
  }
  getInfoPersonal(){
   /* let informacion = this.local.getItem('userInfo')
    this.info = informacion['grl_persona']
    let tokkk = this.local.getItem('unamToken')
    this.to= tokkk['access_token']
    console.log(this.info+" probando consola"+this.to)*/
    console.log("ppp");
  }
}
