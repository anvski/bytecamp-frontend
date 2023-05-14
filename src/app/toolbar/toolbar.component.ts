import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  authenticated: boolean = false;
  username: string | null = '';
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.authenticated = this.auth.isAuthenticated;
    this.auth.token.subscribe((val) => {
      if (val == null) {
        this.authenticated = false;
        this.username = '';
      } else {
        this.authenticated = true;
        this.username = val;
      }
    });
  }

  @ViewChild(SidenavComponent, { static: false }) sidenav!: SidenavComponent;

  onShowMenu() {
    this.sidenav.onDraw();
  }

  signOut() {
    this.auth.signOut();
  }
}
