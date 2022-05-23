import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../service/token.service';

/**
 * Un Interceptor no es nada más que un servicio
 * que se encarga de interceptar las peticiones HTTP.
 */

@Injectable({
    providedIn: 'root'
})
export class ProductoInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let intReq = req;
        const token = this.tokenService.token;
        if (token != null) {
            intReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        return next.handle(intReq);
    }

}