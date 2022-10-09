import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Ingenium | Sign in',
    component: AuthComponent,
  },
  {
    path: 'sign-up',
    title: 'Ingenium | Sign up',
    component: SignUpComponent,
  },
  {
    path: 'forgot-password',
    title: 'Ingenium | Forgot password',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
