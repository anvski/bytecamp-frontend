import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid && !this.auth.isAuthenticated) {
      this.auth
        .login(
          this.form.get('username')?.value,
          this.form.get('password')?.value
        )
        .subscribe((val) => {
          if (val) this.router.navigate(['']);
        });
    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
