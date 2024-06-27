import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/core/interface';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser!: IToken;
  role!: string;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getCurrentUser();
    this.role = this.currentUser.role;
  }
}
