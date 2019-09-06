import { Component, OnInit, Input, EventEmitter, Output, OnChanges,SimpleChanges,HostListener  } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit,OnChanges {

  @Input() data
  @Input() format
  texto:string = ''
  @Output() etext = new EventEmitter();
  @Output() row = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
   this.data = []
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.data){
      for(let d in this.data){
        this.data[d]['texto'] = ""
        for(let x in this.format){
          this.data[d]['texto'] += " " + this.data[d][this.format[x]]
        }
      }
    }
  }
  buscar(){
    let nl = this.texto.length
    if(nl >= 3){
      this.etext.emit(this.texto)
    }
    
  }
  result(row){
    this.row.emit(row)
    this.data = []
  }
}
