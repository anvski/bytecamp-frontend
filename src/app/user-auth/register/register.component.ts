import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  matcher = new MyErrorStateMatcher();
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.form.valid) return;
    this.auth
      .register(
        this.form.get('username')?.value,
        this.form.get('password')?.value,
        this.form.get('emailFormControl')?.value,
        this.form.get('firstName')?.value,
        this.form.get('lastName')?.value
      )
      .subscribe((val) => {
        if (val) this.router.navigate(['']);
      });
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
