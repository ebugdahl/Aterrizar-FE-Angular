import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/form/login-form.component';
import { LoginWrapperComponent } from './components/wrapper/login-wrapper.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginWrapperComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
