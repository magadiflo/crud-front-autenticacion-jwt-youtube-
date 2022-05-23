import { Component, OnInit } from '@angular/core';

import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged: boolean = false;
  nombreUsuario: string = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.token) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.username;
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }

}
