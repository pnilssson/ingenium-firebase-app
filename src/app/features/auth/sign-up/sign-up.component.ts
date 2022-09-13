import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  signUp() {
    if (
      this.signUpForm.valid &&
      this.signUpForm.value.password == this.signUpForm.value.repeatPassword
    ) {
      this.auth.createUserWithEmailAndPassword(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.name
      );
    } else {
      this.toastService.showToast({
        type: 'warning',
        msg: 'Invalid sign up information. Please provide a minimum two letter name, a valid email, and a minimum eight letter password.',
      });
    }
  }
}
