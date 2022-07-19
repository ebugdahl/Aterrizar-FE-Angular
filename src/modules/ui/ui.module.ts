import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, MatButtonModule, FontAwesomeModule, MatMenuModule],
  exports: [MatButtonModule, FontAwesomeModule, MatMenuModule],
})
export class UiModule {}
