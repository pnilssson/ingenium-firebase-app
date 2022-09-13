import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ToastComponent } from './layout/toast/toast.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent, ToastComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
  ],
  exports: [NavbarComponent, ToastComponent],
})
export class CoreModule {}
