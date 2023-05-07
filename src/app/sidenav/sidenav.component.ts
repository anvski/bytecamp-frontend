import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  showFiller = false;
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  onDraw() {
    this.drawer.toggle();
  }
}
