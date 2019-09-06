import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reprogramacion-examenes',
  templateUrl: './reprogramacion-examenes.component.html',
  styleUrls: ['./reprogramacion-examenes.component.scss']
})
export class ReprogramacionExamenesComponent implements OnInit {
  public mySentences:type[] = [
    {id: 1,  curso:'Matemática', fecha:'10/11/19' },
    {id: 2,  curso:'Comunicacion', fecha:'10/11/19' },
    {id: 3,  curso:'Historia', fecha:'10/11/19'},
    {id: 4,  curso:'Ciencia', fecha:'10/11/19' },
    {id: 5,  curso:'Civica', fecha:'10/11/19' },
   
    
  ];
  constructor() { }

  ngOnInit() {
  }

}
export interface type{
  id:number;
  curso:string;
  fecha:string;
}