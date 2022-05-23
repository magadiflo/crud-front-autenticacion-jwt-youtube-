import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { NuevoUsuario } from '../../models/nuevo-usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isLogged: boolean = false;

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;

  constructor(
    private tokenSservice: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.tokenSservice.token) { //Sí estamos logueados
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario)
      .subscribe(
        data => {
          // this.toastr.success('Cuenta Creada', 'OK');
          alert('Éxito: ¡Cuenta creada!');
          this.router.navigate(['/login']);
        },
        err => {
          this.errMsj = err.error.mensaje;
          // this.toastr.error(this.errMsj, '¡Error al registrar!');
          alert('Error: '+ this.errMsj);
          console.log(this.errMsj);
        });
  }

}
