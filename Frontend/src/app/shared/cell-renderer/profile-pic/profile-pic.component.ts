import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements ICellRendererAngularComp {
  params: any;

  constructor(private sanitizer: DomSanitizer) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  getSafeUrl(path: string): SafeUrl {
    // Replace backslashes with forward slashes
    let formattedPath = path.replace(/\\/g, '/');

    // Remove the leading '..'
    formattedPath = formattedPath.replace(/^..\/Backend\//, '');

    // Construct the full URL
    const baseUrl = 'http://localhost:3000/';
    const fullUrl = baseUrl + formattedPath;

    // Sanitize the URL
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
