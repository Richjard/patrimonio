import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificacion-notas',
  templateUrl: './modificacion-notas.component.html',
  styleUrls: ['./modificacion-notas.component.scss']
})
export class ModificacionNotasComponent implements OnInit {
  public mySentences:type[] = [
    {id: 1, apellidos: 'Valderrama Eyzaguirre', nombres:'Jhoand', nota1:11 , nota2:14},
    {id: 2, apellidos: 'Velasquez Marca', nombres:'Hernand', nota1:12 , nota2:12},
    {id: 3, apellidos: 'Arce Marin', nombres:'Heather', nota1:9 , nota2:15},
    {id: 4, apellidos: 'Meza Valk', nombres:'Luis', nota1:15 , nota2:12},
    {id: 5, apellidos: 'Quintanilla Fung', nombres:'Jorge', nota1:10 , nota2:14},
    {id: 6, apellidos: 'Vargas Roque', nombres:'Elieth', nota1:11 , nota2:13},
    {id: 7, apellidos: 'Manchas Elias', nombres:'Drew', nota1:13 , nota2:10},
    {id: 8, apellidos: 'Apaza Alanoca', nombres:'Thadeo', nota1:12 , nota2:8}
    
  ];
  constructor() { }

  ngOnInit() {
  }

}
export interface type{
  id:number;
  apellidos:string;
  nombres:string;
  nota1:number;
  nota2:number;
}