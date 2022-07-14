import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginWrapperComponent } from './components/login/wrapper/login-wrapper.component';

const routes: Routes = [
    {
      path: '',
      component: LoginWrapperComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthenticationRoutingModule { }