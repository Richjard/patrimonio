import { Component, OnInit } from '@angular/core';
import { LocalService } from './../../servicios/local.services'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  info:any

  constructor(
    private local:LocalService
  ) { }

  ngOnInit() {
    this.getInfoPersonal()
  }
  getInfoPersonal(){
    let informacion = this.local.getItem('userInfo')
    this.info = informacion['grl_persona']
    console.log(this.info)
  }
}
