import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  exports: [MatButtonModule, FontAwesomeModule],
})
export class UiModule {}
