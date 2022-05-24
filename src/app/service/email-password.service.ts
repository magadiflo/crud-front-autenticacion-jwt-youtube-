import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { EmailValuesDTO } from '../models/email-values-dto';
import { ChangePasswordDTO } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private changePasswordURL: string = `${environment.changePasswordURL}/email-password`;

  constructor(private http: HttpClient) { }

  sendEmail(dto: EmailValuesDTO): Observable<any> {
    return this.http.post<any>(`${this.changePasswordURL}/send-email`, dto);
  }

  changePassword(dto: ChangePasswordDTO): Observable<any> {
    return this.http.post<any>(`${this.changePasswordURL}/change-password`, dto);
  }
}
