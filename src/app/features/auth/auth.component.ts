import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.valid) {
      this.auth.signInWithEmailAndPassword(
        this.signInForm.value.email!,
        this.signInForm.value.password!
      );
    } else {
      this.toastService.showToast({
        type: 'warning',
        msg: 'Invalid sign in information. Please provide a valid email and a minimum eight letter password.',
      });
    }
  }
}
