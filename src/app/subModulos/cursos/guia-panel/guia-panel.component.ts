import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-guia-panel',
  templateUrl: './guia-panel.component.html',
  styleUrls: ['./guia-panel.component.scss'],
})
export class GuiaPanelComponent implements OnInit {
  @Input() codigo;
  @Input() title;
  @Input() curso;
  @Output() option = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  open() {
    let data = { n: 0, titulo: 'Panel de Control', image: 'm1', ruta: '' };
    this.option.emit(data);
  }
}
