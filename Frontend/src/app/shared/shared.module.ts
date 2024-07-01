import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCellRendererComponent } from './cell-renderer/button-cell-renderer/button-cell-renderer.component';
import { ProfilePicComponent } from './cell-renderer/profile-pic/profile-pic.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ButtonCellRendererComponent, ProfilePicComponent],
  imports: [CommonModule],
})
export class SharedModule {}
