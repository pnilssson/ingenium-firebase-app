import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { MustMatch } from 'src/app/shared/validators/mustMatch';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  submitted = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.signUpForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit() {}

  signUp() {
    if (this.signUpForm.invalid) {
      this.submitted = true;
      return;
    }

    this.auth.createUserWithEmailAndPassword(
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.name
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
}
