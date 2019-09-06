import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingreso-asistencia',
  templateUrl: './ingreso-asistencia.component.html',
  styleUrls: ['./ingreso-asistencia.component.scss'],
})
export class IngresoAsistenciaComponent implements OnInit {
  public mySentences: type[] = [
    {
      id: 1,
      apellidos: 'Valderrama Eyzaguirre',
      nombres: 'Jhoand',
      asis1: 'si',
      asis2: 'si',
      asis: '',
      asisp: 20,
    },
    {
      id: 2,
      apellidos: 'Velasquez Marca',
      nombres: 'Hernand',
      asis1: 'no',
      asis2: 'si',
      asis: '',
      asisp: 70,
    },
    {
      id: 3,
      apellidos: 'Arce Marin',
      nombres: 'Heather',
      asis1: 'si',
      asis2: 'si',
      asis: '',
      asisp: 90,
    },
    {
      id: 4,
      apellidos: 'Meza Valk',
      nombres: 'Luis',
      asis1: 'si',
      asis2: 'no',
      asis: '',
      asisp: 90,
    },
    {
      id: 5,
      apellidos: 'Quintanilla Fung',
      nombres: 'Jorge',
      asis1: 'no',
      asis2: 'si',
      asis: '',
      asisp: 80,
    },
    {
      id: 6,
      apellidos: 'Vargas Roque',
      nombres: 'Elieth',
      asis1: 'si',
      asis2: 'si',
      asis: '',
      asisp: 40,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
export interface type {
  id: number;
  apellidos: string;
  nombres: string;
  asis1: string;
  asis2: string;
  asis: string;
  asisp: number;
}
