import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InternalServerComponent } from './internal-server/internal-server.component';


@NgModule({
  declarations: [
    UnauthorizedComponent,
    InternalServerComponent
  ],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule
  ]
})
export class ExtrapagesModule { }
