import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmailPasswordService } from '../../service/email-password.service';
import { ChangePasswordDTO } from '../../models/change-password-dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  passwordConfirm: string;
  tokenPassword: string;

  dto: ChangePasswordDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onChangePassword(): void {
    if (this.password !== this.passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePasswordDTO(this.password, this.passwordConfirm, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto)
      .subscribe(
        data => {
          alert('Éxito: ' + data.mensaje);
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          alert('Error: ' + err.error.mensaje);
          this.router.navigate(['/']);
        });
  }

}
