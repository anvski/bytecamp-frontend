import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @ViewChild(SidenavComponent, { static: false }) sidenav!: SidenavComponent;

  onShowMenu() {
    this.sidenav.onDraw();
  }
}
