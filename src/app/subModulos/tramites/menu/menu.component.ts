import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menus;

  @Output() option = new EventEmitter();

  constructor(private modal: NgbModal) {}

  ngOnInit() {
    this.loadMenu();
  }
  loadMenu() {}
  open(n) {
    this.option.emit(n);
  }
  openModal(content) {
    this.modal.open(content, {});
  }
}
