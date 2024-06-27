import { Component } from '@angular/core';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss'],
})
export class ButtonCellRendererComponent {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onDelete() {
    this.params.onDelete(this.params.data._id);
  }

  onUpdate() {
    this.params.onUpdate(this.params.data._id);
  }
}
