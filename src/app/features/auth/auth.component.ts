import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signInForm: FormGroup;

  submitted = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.invalid) {
      this.submitted = true;
      return;
    }

    this.auth.signInWithEmailAndPassword(
      this.signInForm.value.email!,
      this.signInForm.value.password!
    );
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
}
