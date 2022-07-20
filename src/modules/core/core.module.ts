import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { NavBarComponent } from './navbar/components/navbar/navbar.component';
import { UserAvatarComponent } from './navbar/components/user-avatar/user-avatar.component';
@NgModule({
  declarations: [
    UserAvatarComponent,
    NavBarComponent
  ],
  imports: [
    RouterModule,
    UiModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule {}
