import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private toastService: ToastService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}
  send() {
    if (this.forgotPasswordForm.valid) {
      this.auth.sendPasswordResetEmail(this.forgotPasswordForm.value.email);
    } else {
      this.toastService.showToast({
        type: 'warning',
        msg: 'Invalid email.',
      });
    }
  }
}
