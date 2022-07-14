import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/components/navbar/navbar.component';
import { UserAvatarComponent } from './navbar/components/user-avatar/user-avatar.component';
@NgModule({
  declarations: [
    UserAvatarComponent,
    NavBarComponent
  ],
  imports: [
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule {}
